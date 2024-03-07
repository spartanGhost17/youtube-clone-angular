package com.project.youtube.dao;

import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.Category;
import org.springframework.web.multipart.MultipartFile;

public interface VideoDao<T> {
    T create(MultipartFile video, Long userId);
    T getVideo(Long id);
    T updateMetadata(UpdateVideoMetadataForm videoMetadataForm);
    Category getVideoCategory(Long videoId);
    void delete(Long videoId, Long userId);
}
