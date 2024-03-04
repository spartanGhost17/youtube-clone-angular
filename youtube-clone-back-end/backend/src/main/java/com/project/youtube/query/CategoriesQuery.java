package com.project.youtube.query;

public class CategoriesQuery {
    public static final String SELECT_ALL_CATEGORIES_QUERY = "SELECT * FROM Categories";
    public static final String INSERT_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY = "INSERT INTO VideoCategories (video_id, category_id) VALUES (:videoId, :categoryId)";
    public static final String UPDATE_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY = "UPDATE VideoCategories SET category_id = :categoryId WHERE video_id = :videoId";
    public static final String SELECT_VIDEO_CATEGORY_COUNT_BY_VIDEO_ID_QUERY = "SELECT COUNT(*) FROM VideoCategories WHERE video_id = :videoId";
}
