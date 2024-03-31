package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.VideoDaoImpl;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.dtomapper.VideoDTOMapper;
import com.project.youtube.form.LikeForm;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.*;
import com.project.youtube.service.VideoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.project.youtube.constants.ApplicationConstants.DEFAULT_VIDEO_VISIBILITY;
import static com.project.youtube.constants.ApplicationConstants.VIDEOS_DEFAULT_FOLDER;
import static com.project.youtube.dtomapper.VideoDTOMapper.toVideoDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class VideoServiceImpl implements VideoService {

    @Autowired
    private final S3Service s3Service;
    private static final Logger LOGGER = LoggerFactory.getLogger(VideoServiceImpl.class);
    private final VideoDaoImpl videoDao;
    private final LikeServiceImpl likeService;
    private final StatusServiceImpl statusService;
    private final FileUploadTestService fileUploadTestService;
    private final TagServiceImpl tagService;
    private final ResourceLoader resourceLoader;

    /**
     * upload video
     *
     * @param multipartFile the video file
     * @param userId        the user id
     * @return the video dto
     */
    @Override
    public VideoDto uploadVideo(MultipartFile multipartFile, Long userId) {
        VideoDto videoDto = VideoDTOMapper.toVideoDto(videoDao.create(multipartFile, userId));
        List<Tag> tags = new ArrayList<>();

        Status status = statusService.getByName(DEFAULT_VIDEO_VISIBILITY);
        List<VideoThumbnail> thumbnails = videoDao.getThumbnails(videoDto.getId());
        videoDto.setThumbnailId(thumbnails.get(0).getId());
        videoDto.setThumbnailUrl(thumbnails.get(0).getThumbnailUrl());
        videoDao.updateMainThumbnailId(videoDto.getId(), thumbnails.get(0).getId());

        videoDto.setStatus(updateVideoStatus(videoDto.getId(), status.getId()));
        videoDto.setVideoThumbnails(thumbnails);
        videoDto.setTags(tags);
        return videoDto;
    }

    /**
     * update video metadata
     *
     * @param updateVideoMetadataForm
     * @return video dto
     */
    @Override
    public VideoDto updateVideoMetadata(UpdateVideoMetadataForm updateVideoMetadataForm) {
        log.info("updating video metadata for video id: {}", updateVideoMetadataForm.getVideoId());
        VideoDto videoDto = mapToVideoDto(videoDao.updateMetadata(updateVideoMetadataForm));
        //Status status = statusService.getVideoStatus(videoDto.getId());
        List<VideoThumbnail> thumbnails = videoDao.getThumbnails(videoDto.getId());

        videoDto.setStatus(statusService.getVideoStatus(videoDto.getId()));
        videoDto.setVideoThumbnails(videoDao.getThumbnails(videoDto.getId()));

        videoDto.setTags(tagService.getByVideoId(videoDto.getId()));

        Optional<VideoThumbnail> thumbnailOptional = thumbnails.stream().filter(thumbnail -> Objects.equals(thumbnail.getId(), videoDto.getThumbnailId())).findFirst();
        thumbnailOptional.ifPresent(thumbnail -> videoDto.setThumbnailUrl(thumbnail.getThumbnailUrl()));
        return videoDto;
    }

    /**
     * upload video thumbnail
     *
     * @param thumbnailImage the video thumbnail
     * @param videoId        the video dto
     * @return the video url
     */
    @Override
    public String uploadVideoThumbnail(MultipartFile thumbnailImage, Long videoId) {
        return null;
    }

    /**
     * load entire file in resource (for short files)
     * @param fileName the file name
     * @return the resource
     */
    @Override
    public Mono<ResponseEntity<Resource>> streamVideo2(String fileName) {
        // Path to your local file
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + VIDEOS_DEFAULT_FOLDER).toAbsolutePath().normalize();
        File file = new File(fileStorageLocation.toString(), fileName);

        if (!file.exists()) {
            return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }

        return Mono.just(ResponseEntity
                .status(HttpStatus.OK)
                .body(this.resourceLoader.getResource(file.toURI().toString())));
    }

    /**
     * get byte range for streaming
     * @param fileName the file name
     * @param reqHeaders the request header
     * @param defaultFolder the default folder containing the videos
     * @return the resource region
     */
    @Override
    public Mono<ResponseEntity<ResourceRegion>> streamVideo3(String fileName, HttpHeaders reqHeaders, String defaultFolder) {
        // Path to your local file
        Path fileStorageLocation = Paths.get(System.getProperty("user.home") + defaultFolder + "/" + fileName).toAbsolutePath().normalize();
        File file = new File(fileStorageLocation.toString(), fileName+".mp4");

        if (!file.exists()) {
            return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }

        List<Long> ranges = rangeHeaderToNum(reqHeaders);
        Long start = ranges.get(0);
        Long end = ranges.get(1);

        long contentLength = file.length();
        if (end == null || end > contentLength) {
            end = contentLength - 1;
        }

        int minSizeBytes = 100 * 1024;  // 100 KB in bytes
        int maxSizeBytes = 1 * 1024 * 1024;  // 1 MB in bytes
        //long rangeLength = maxSizeBytes;//Math.min(maxSizeBytes, end - start + 1);
        long rangeLength = Math.min(contentLength, end - start + 1);
        log.info("Getting resource region for file: {}, start: {}, end: {}, contentLength: {}", file.getAbsolutePath(), start, end, contentLength);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentLength(rangeLength);
        headers.set("Content-Range", "bytes " + start + "-" + end + "/" + contentLength);

        Resource resource = new FileSystemResource(file);
        ResourceRegion resourceRegion = new ResourceRegion(resource, start, rangeLength);

        return Mono.just(ResponseEntity.status(HttpStatus.PARTIAL_CONTENT).headers(headers).body(resourceRegion));
    }

    /**
     * convert range header to array of start - end byte range
     * @param requestHeaders the request header
     * @return the list of ranges
     */
    public List<Long> rangeHeaderToNum(HttpHeaders requestHeaders) {
        List<Long> rangeList = new ArrayList<>();
        int minSizeBytes = 100 * 1024;

        String rangeHeader = requestHeaders.getFirst(HttpHeaders.RANGE);
        // If Range header is present, parse it
        if (rangeHeader != null && rangeHeader.startsWith("bytes=")) {
            String[] range = rangeHeader.substring(6).split("-");
            long start = Long.parseLong(range[0]);
            long end = range[1].isEmpty() ? minSizeBytes - 1 : Long.parseLong(range[1]);

            rangeList.add(start);
            rangeList.add(end);
        }
        return rangeList;
    }

    /**
     * get segments for adaptive bite rate streaming
     * @param videoFileName the video file name (also)
     * @param abrFile the abr file or manifest file
     * @return the resource to return
     */
    @Override
    public Mono<ResponseEntity<Resource>> streamVideoABR(String videoFileName, String abrFile) {
        Path dashFolder = Paths.get(System.getProperty("user.home"), VIDEOS_DEFAULT_FOLDER+"/"+ videoFileName +"/"+ abrFile);
        //log.info("dash folder {}", dashFolder.toFile().getAbsolutePath());
        Resource resource = new FileSystemResource(dashFolder.toFile());

        if(!resource.exists()) {
            return Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        }

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_XML);
        return Mono.just(ResponseEntity.ok().body(resource));//.headers(headers).body(resource));
    }

    /**
     * get video thumbnail
     *
     * @param fileName the file name
     * @return the byte array representing the image
     */
    @Override
    public byte[] getThumbnail(String fileName) {
        return fileUploadTestService.getThumbnailImage(fileName);
    }

    /**
     * get video metadata
     *
     * @param id the vide id
     * @return the video dto
     */
    @Override
    public VideoDto getVideoMetadataById(Long id) {
        VideoDto videoDto = mapToVideoDto(videoDao.getVideo(id));

        videoDto.setLikeCount(getLikeCount(videoDto));
        videoDto.setStatus(statusService.getVideoStatus(id));

        List<VideoThumbnail> thumbnails = videoDao.getThumbnails(videoDto.getId());
        videoDto.setVideoThumbnails(thumbnails);

        videoDto.setTags(tagService.getByVideoId(videoDto.getId()));

        Optional<VideoThumbnail> thumbnailOptional = thumbnails.stream().filter(thumbnail -> Objects.equals(thumbnail.getId(), videoDto.getThumbnailId())).findFirst();
        thumbnailOptional.ifPresent(thumbnail -> videoDto.setThumbnailUrl(thumbnail.getThumbnailUrl()));

        return videoDto;
    }

    /**
     * get all videos for user
     *
     * @param userId the user id
     * @return the response
     */
    @Override
    public List<VideoDto> getAllByUserId(Long userId, Integer pageSize, Integer offset) {
        return videoDao.getAllByUserId(userId, pageSize, offset).stream().map(video -> {
            VideoDto videoDto = mapToVideoDto(video);

            videoDto.setTags(tagService.getByVideoId(videoDto.getId()));

            videoDto.setLikeCount(getLikeCount(videoDto));
            videoDto.setStatus(statusService.getVideoStatus(video.getId()));

            List<VideoThumbnail> thumbnails = videoDao.getThumbnails(videoDto.getId());
            videoDto.setVideoThumbnails(thumbnails);
            Optional<VideoThumbnail> thumbnailOptional = thumbnails.stream().filter(thumbnail -> Objects.equals(thumbnail.getId(), videoDto.getThumbnailId())).findFirst();
            thumbnailOptional.ifPresent(thumbnail -> videoDto.setThumbnailUrl(thumbnail.getThumbnailUrl()));

            return videoDto;
        }).collect(Collectors.toList());
    }

    /**
     * get video category
     *
     * @param videoId the video id
     * @return the category
     */
    @Override
    public Category getVideoCategory(Long videoId) {
        return videoDao.getVideoCategory(videoId);
    }

    /**
     * get user video count
     * @param userId the user id
     * @return the total video count
     */
    @Override
    public Long videoCount(Long userId) {
        return videoDao.videoCount(userId);
    }

    /**
     * update the video status
     *
     * @param videoId  the video id
     * @param statusId the status id
     * @return the status
     */
    @Override
    public Status updateVideoStatus(Long videoId, Long statusId) {
        return statusService.setVideoStatus(videoId, statusId);
    }

    /**
     * delete a video
     *
     * @param videoId the video id
     */
    @Override
    public void delete(Long videoId, Long userId) {
        log.info("deleting video by id {} ", videoId);
        VideoDto videoDto = getVideoMetadataById(videoId);
        tagService.deleteVideoTags(videoId);
        videoDao.delete(videoDto, userId);
    }

    /**
     * get the videos like count
     *
     * @param videoDto the video dto
     * @return the like count
     */
    private Long getLikeCount(VideoDto videoDto) {
        LikeForm likeForm = new LikeForm();
        likeForm.setVideoId(videoDto.getId());
        return likeService.getLikeCount(likeForm);
    }

    /**
     * map video object to dto
     *
     * @param video
     * @return
     */
    private VideoDto mapToVideoDto(Video video) {
        return toVideoDto(video);
    }
    /*public VideoDto uploadVideo(MultipartFile multipartFile){
        LOGGER.info("Entering uploadVideo in com.project.youtube.service.impl.S3Service");
        // Upload file to AWS S3
        // Save Video Data to MongoDB DataBase
        String videoURL = s3Service.uploadFile(multipartFile);//get video URL from s3 call
        Video video = new Video();
        video.setVideoUrl(videoURL);
        LOGGER.info("Save video Url to mongoDB");
        //var savedVideo = videoRepository.save(video);//save to mongoDB
        var savedVideo = new Video();
        LOGGER.info("Leaving uploadVideo in com.project.youtube.service.impl.S3Service");
        return new VideoDto(savedVideo.getId(), null, null, null, null, null, null,null, savedVideo.getVideoUrl());
    }

    **
     * Update video metadata information in database
     * @param videoDto
     * @return
     *
    public VideoDto updateVideoMetadata(VideoDto videoDto) {
        LOGGER.info("Entering updateVideoMetadata");
        LOGGER.info("Update mongoDB video metadata for id : "+videoDto.getId());
        // find video by videoId
        Video videoToSave = getVideoById(videoDto.getId());

        LOGGER.info("retreived videoId: "+videoToSave.getId());
        LOGGER.info("retreived desc: "+videoToSave.getDescription());
        // map videoDto fields to Video POJO
        videoToSave.setTitle(videoDto.getTitle());
        videoToSave.setDescription(videoDto.getDescription());
        videoToSave.setThumbnailUrl(videoDto.getThumbnailURL());
        //videoToSave.setTags(videoDto.getTags());
        //videoToSave.setVisibilityStatus(videoDto.getVisibilityStatus());

        // save video to database
        //videoRepository.save(videoToSave);
        LOGGER.info("Leaving updateVideoMetadata");
        return videoDto;
    }

    @Override
    public String uploadVideoThumbnail(MultipartFile multipartFile, String videoId) {
        LOGGER.info("Entering uploadVideoThumbnail for video id: "+videoId);
        Video videoToSave = getVideoById(videoId);
        String thumbnailUrl = s3Service.uploadFile(multipartFile);
        videoToSave.setThumbnailUrl(thumbnailUrl);
        //videoRepository.save(videoToSave);
        LOGGER.info("Leaving uploadVideoThumbnail");
        return thumbnailUrl;
    }

    @Override
    public Video getVideoById(String videoId) {
        LOGGER.info("Entering getVideoById");
        LOGGER.info("Getting video for video id : "+videoId);
        return null;/*videoRepository.findById(videoId)
                .orElseThrow(() -> {
                    LOGGER.error("Cannot retreive video by id:" + videoId);
                    return new NoSuchElementException("Cannot retreive video by id: " + videoId);
                });
    }*/


}
