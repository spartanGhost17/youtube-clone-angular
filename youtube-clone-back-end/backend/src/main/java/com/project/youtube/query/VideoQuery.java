package com.project.youtube.query;

public class VideoQuery {
    //public static final String UPDATE_VIDEO_BY_ID_QUERY = "UPDATE Videos";
    public static final String INSERT_VIDEO_QUERY = "INSERT INTO Videos(user_id, title, duration, total_bytes, thumbnail_id, video_url, gif_url) VALUES (:userId, :title, SEC_TO_TIME(:duration), :totalBytes, :thumbnailId, :videoUrl, :gifUrl)";
    public static final String INSERT_VIDEO_THUMBNAILS = "INSERT INTO VideoThumbnails (video_id, thumbnail_url) VALUES (:videoId, :thumbnailUrl)";
    public static final String SELECT_THUMBNAILS_QUERY = "SELECT * FROM VideoThumbnails WHERE video_id = :videoId";
    public static final String SELECT_VIDEO_BY_ID_QUERY = "SELECT * FROM Videos WHERE id = :videoId";
    public static final String DELETE_VIDEO_QUERY = "DELETE FROM Videos WHERE id = :videoId AND user_id = :userId";
    public static final String SELECT_VIDEO_CATEGORY_COUNT_QUERY = "SELECT COUNT(*) FROM VideoCategories WHERE video_id = :videoId";
    public static final String SELECT_VIDEO_CATEGORY_BY_VIDEO_ID_QUERY = "SELECT * FROM VideoCategories WHERE video_id = :videoId";
    public static final String SELECT_USER_VIDEOS_QUERY = "SELECT * FROM Videos WHERE user_id = :userId ORDER BY created_at DESC LIMIT :pageSize OFFSET :offset";
    public static final String UPDATE_VIDEO_MAIN_THUMBNAIL_QUERY = "UPDATE Videos SET thumbnail_id = :thumbnailId WHERE id = :videoId";
    public static final String SELECT_VIDEO_COUNT_BY_USER_ID_QUERY = "SELECT COUNT(*) FROM Videos as v WHERE v.user_id = :userId";
    public static final String SELECT_VIDEO_FEED_QUERY = "SELECT v.* FROM Videos as v INNER JOIN VideoStatus AS vs ON v.id = vs.video_id INNER JOIN Status AS s ON s.id = vs.status_id WHERE s.status_name = 'PUBLIC' ORDER BY v.created_at DESC LIMIT :pageSize OFFSET :offset";
}
