package com.project.youtube.dao;

import com.project.youtube.form.UpdateVideoMetadataForm;
import org.springframework.web.multipart.MultipartFile;

public interface VideoDao<T> {
    T create(MultipartFile video, Long userId);
    T getVideo(Long id);
    T updateMetadata(UpdateVideoMetadataForm videoMetadataForm);
}
