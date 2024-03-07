package com.project.youtube.service;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Category;
import com.project.youtube.model.Status;
import org.springframework.web.multipart.MultipartFile;

public interface VideoService {
    VideoDto uploadVideo(MultipartFile multipartFile, Long userId);
    VideoDto updateVideoMetadata(UpdateVideoMetadataForm updateVideoMetadataForm);
    String uploadVideoThumbnail(MultipartFile thumbnailImage, Long videoId);
    VideoDto getVideoMetadataById(Long id);
    Category getVideoCategory(Long videoId);
    Status updateVideoStatus(Long videoId, Long statusId);
    void delete(Long videoId, Long userId);
}
