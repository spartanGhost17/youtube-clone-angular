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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.project.youtube.constants.ApplicationConstants.DEFAULT_VIDEO_VISIBILITY;
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

    /**
     * upload video
     * @param multipartFile the video file
     * @param userId the user id
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
     * @param updateVideoMetadataForm
     * @return video dto
     */
    @Override
    public VideoDto updateVideoMetadata(UpdateVideoMetadataForm updateVideoMetadataForm) {
        log.info("updating video metadata for video id: {}",updateVideoMetadataForm.getVideoId());
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
     * @param thumbnailImage the video thumbnail
     * @param videoId the video dto
     * @return the video url
     */
    @Override
    public String uploadVideoThumbnail(MultipartFile thumbnailImage, Long videoId) {
        return null;
    }

    /**
     * get video thumbnail
     * @param fileName the file name
     * @return the byte array representing the image
     */
    @Override
    public byte[] getThumbnail(String fileName) {
        return fileUploadTestService.getThumbnailImage(fileName);
    }

    /**
     * get video metadata
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
     * @param videoId the video id
     * @return the category
     */
    @Override
    public Category getVideoCategory(Long videoId) {
        return videoDao.getVideoCategory(videoId);
    }

    /**
     * update the video status
     * @param videoId the video id
     * @param statusId the status id
     * @return the status
     */
    @Override
    public Status updateVideoStatus(Long videoId, Long statusId) {
        return statusService.setVideoStatus(videoId, statusId);
    }

    /**
     * delete a video
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
