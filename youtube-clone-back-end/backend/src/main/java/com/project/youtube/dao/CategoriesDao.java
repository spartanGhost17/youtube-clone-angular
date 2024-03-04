package com.project.youtube.dao;

import java.util.List;

public interface CategoriesDao<T> {
    List<T> getAll();
    void addCategoryToVideo(Long videoId, Long categoryId);
}
