package com.project.youtube.service;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Category;
import com.project.youtube.model.Status;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoService {
    VideoDto uploadVideo(MultipartFile multipartFile, Long userId);
    VideoDto updateVideoMetadata(UpdateVideoMetadataForm updateVideoMetadataForm);
    String uploadVideoThumbnail(MultipartFile thumbnailImage, Long videoId);
    byte[] getThumbnail(String fileName);
    VideoDto getVideoMetadataById(Long id);
    List<VideoDto> getAllByUserId(Long userId, Integer pageSize, Integer offset);
    Category getVideoCategory(Long videoId);
    Status updateVideoStatus(Long videoId, Long statusId);
    void delete(Long videoId, Long userId);
}
