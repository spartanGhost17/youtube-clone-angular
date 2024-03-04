package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.CategoriesDaoImpl;
import com.project.youtube.model.Category;
import com.project.youtube.service.CategoriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriesServiceImpl implements CategoriesService<Category> {
    private final CategoriesDaoImpl categoriesDao;

    @Override
    public List<Category> getAll() {
        return categoriesDao.getAll();
    }

    @Override
    public void addCategoryToVideo(Long videoId, Long categoryId) {
        categoriesDao.addCategoryToVideo(videoId, categoryId);
    }


}
