package com.project.youtube.service;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.model.Video;
import org.springframework.web.multipart.MultipartFile;

public interface VideoService {
     void uploadVideo(MultipartFile multipartFile);

    VideoDto updateVideoMetadata(VideoDto videoDto);

    String uploadVideoThumbnail(MultipartFile multipartFile, String videoId);

    Video getVideoById(String videoId);
}
