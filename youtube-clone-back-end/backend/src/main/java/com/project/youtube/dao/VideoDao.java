package com.project.youtube.dao;

import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Category;
import com.project.youtube.model.VideoThumbnail;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface VideoDao<T> {
    T create(MultipartFile video, Long userId);
    void createThumbnails(Long videoId, List<String> thumbnailUrls);
    List<VideoThumbnail> getThumbnails(Long videoId);
    T getVideo(Long id);
    T updateMetadata(UpdateVideoMetadataForm videoMetadataForm);
    List<T> getAllByUserId(Long userId, Integer pageSize, Integer offset);
    Category getVideoCategory(Long videoId);
    void delete(Long videoId, Long userId);
}
