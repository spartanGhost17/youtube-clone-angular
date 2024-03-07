package com.project.youtube.query;

public class VideoQuery {
    //public static final String UPDATE_VIDEO_BY_ID_QUERY = "UPDATE Videos";
    public static final String INSERT_VIDEO_QUERY = "INSERT INTO Videos(user_id, title, duration, total_bytes, thumbnail_url, video_url) VALUES (:userId, :title, :duration, :totalBytes, :thumbnailUrl, :videoUrl)";
    public static final String SELECT_VIDEO_BY_ID_QUERY = "SELECT * FROM Videos WHERE id = :videoId";
    public static final String DELETE_VIDEO_QUERY = "DELETE FROM Videos WHERE id = :videoId AND user_id = :userId";
    public static final String SELECT_VIDEO_CATEGORY_COUNT_QUERY = "SELECT COUNT(*) FROM VideoCategories WHERE video_id = :videoId";
    public static final String SELECT_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY = "SELECT * FROM VideoCategories WHERE video_id = :videoId";
}
