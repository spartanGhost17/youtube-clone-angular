package com.project.youtube.service;

import com.project.youtube.dto.VideoDto;
import org.springframework.web.multipart.MultipartFile;

public interface VideoService {
    public void uploadVideo(MultipartFile multipartFile);

    public VideoDto updateVideoMetadata(VideoDto videoDto);
}
