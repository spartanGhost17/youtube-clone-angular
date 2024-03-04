package com.project.youtube.service;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Video;
import org.springframework.web.multipart.MultipartFile;

public interface VideoService {
    VideoDto uploadVideo(MultipartFile multipartFile, Long userId);
    VideoDto updateVideoMetadata(UpdateVideoMetadataForm updateVideoMetadataForm);
    String uploadVideoThumbnail(MultipartFile thumbnailImage, Long videoId);
    VideoDto getVideoMetadataById(Long id);
    VideoDto updateVideoCategory(Long videoId, Long categoryId);
    VideoDto updateVideoStatus(Long videoId, Long statusId);

}
