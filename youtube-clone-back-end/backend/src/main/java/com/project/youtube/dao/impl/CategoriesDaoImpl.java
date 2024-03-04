package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.CategoriesDao;
import com.project.youtube.model.Category;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.project.youtube.query.CategoriesQuery.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CategoriesDaoImpl implements CategoriesDao<Category> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    /**
     * get all selectable categories
     * @return the list of categories
     */
    @Override
    public List<Category> getAll() {
        try {
          return jdbcTemplate.query(SELECT_ALL_CATEGORIES_QUERY, new BeanPropertyRowMapper<>(Category.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not find the list of categories.");
        }
    }

    /**
     * add video category for a specific video
     * @param videoId the video id
     * @param categoryId the category id
     */
    @Override
    public void addCategoryToVideo(Long videoId, Long categoryId) {
        try {
            boolean hasCategory = isAssignedACategory(videoId);
            jdbcTemplate.update(hasCategory ? UPDATE_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY : INSERT_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY, Map.of("videoId", videoId, "categoryId", categoryId));
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not assign category to video");
        }
    }

    /**
     * check if video is assigned a status
     * @param videoId the video id
     * @return true if video is assigned a category, else false
     */
    private boolean isAssignedACategory(Long videoId) {
        int count = jdbcTemplate.queryForObject(SELECT_VIDEO_CATEGORY_COUNT_BY_VIDEO_ID_QUERY, Map.of("videoId", videoId), Integer.class);
        return count > 0;
    }
}
