package com.project.youtube.query;

public class VideoQuery {
    //public static final String UPDATE_VIDEO_BY_ID_QUERY = "UPDATE Videos";
    public static final String INSERT_VIDEO_QUERY = "INSERT INTO Videos(user_id, title, duration, total_bytes, thumbnail_url, video_url) VALUES (:userId, :title, :duration, :totalBytes, :thumbnailUrl, :videoUrl)";
    public static final String SELECT_VIDEO_BY_ID_QUERY = "SELECT * FROM Videos WHERE id = :videoId";
}
