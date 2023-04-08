package com.project.youtube.service.impl;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.repository.VideoRepository;
import com.project.youtube.service.VideoService;
import lombok.RequiredArgsConstructor;
import com.project.youtube.model.Video;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Component
public class VideoServiceImpl implements VideoService {

    //auto-wire
    @Autowired
    private final S3Service s3Service;
    @Autowired
    private final VideoRepository videoRepository;

    private static final Logger LOGGER = LoggerFactory.getLogger(VideoServiceImpl.class);
    public VideoDto uploadVideo(MultipartFile multipartFile){
        LOGGER.info("Entering uploadVideo in com.project.youtube.service.impl.S3Service");
        // Upload file to AWS S3
        // Save Video Data to MongoDB DataBase
        String videoURL = s3Service.uploadFile(multipartFile);//get video URL from s3 call
        Video video = new Video();
        video.setVideoUrl(videoURL);
        LOGGER.info("Save video Url to mongoDB");
        var savedVideo = videoRepository.save(video);//save to mongoDB
        LOGGER.info("Leaving uploadVideo in com.project.youtube.service.impl.S3Service");
        return new VideoDto(savedVideo.getId(), null, null, null, null, null, null,null, savedVideo.getVideoUrl());
    }

    /**
     * Update video metadata information in database
     * @param videoDto
     * @return
     */
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
        videoToSave.setThumbnailURL(videoDto.getThumbnailURL());
        videoToSave.setTags(videoDto.getTags());
        videoToSave.setVisibilityStatus(videoDto.getVisibilityStatus());

        // save video to database
        videoRepository.save(videoToSave);
        LOGGER.info("Leaving updateVideoMetadata");
        return videoDto;
    }

    @Override
    public String uploadVideoThumbnail(MultipartFile multipartFile, String videoId) {
        LOGGER.info("Entering uploadVideoThumbnail for video id: "+videoId);
        Video videoToSave = getVideoById(videoId);
        String thumbnailUrl = s3Service.uploadFile(multipartFile);
        videoToSave.setThumbnailURL(thumbnailUrl);
        videoRepository.save(videoToSave);
        LOGGER.info("Leaving uploadVideoThumbnail");
        return thumbnailUrl;
    }

    @Override
    public Video getVideoById(String videoId) {
        LOGGER.info("Entering getVideoById");
        LOGGER.info("Getting video for video id : "+videoId);
        return videoRepository.findById(videoId)
                .orElseThrow(() -> {
                    LOGGER.error("Cannot retreive video by id:" + videoId);
                    return new NoSuchElementException("Cannot retreive video by id: " + videoId);
                });
    }
}
