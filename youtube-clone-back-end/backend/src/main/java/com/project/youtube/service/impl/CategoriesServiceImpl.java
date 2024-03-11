package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.CategoriesDaoImpl;
import com.project.youtube.model.Category;
import com.project.youtube.service.CategoriesService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoriesServiceImpl implements CategoriesService<Category> {
    private final CategoriesDaoImpl categoriesDao;

    /**
     * get all selectable categories
     * @return the list of categories
     */
    @Override
    public List<Category> getAll() {
        log.info("Getting all categories.");
        return categoriesDao.getAll();
    }

    /**
     * add category to video
     * @param videoId the video id
     * @param categoryId the category id
     */
    @Override
    public void addCategoryToVideo(Long videoId, Long categoryId) {
        log.info("Adding category id {} to video id {}", categoryId, videoId);
        categoriesDao.addCategoryToVideo(videoId, categoryId);
    }


}
