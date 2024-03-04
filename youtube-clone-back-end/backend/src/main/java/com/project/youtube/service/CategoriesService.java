package com.project.youtube.service;

import java.util.List;

public interface CategoriesService<T> {
    List<T> getAll();
    void addCategoryToVideo(Long videoId, Long categoryId);
}
