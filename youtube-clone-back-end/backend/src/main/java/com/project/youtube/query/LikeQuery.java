package com.project.youtube.query;

public class LikeQuery {
    public static final String INSERT_LIKE_BY_VIDEO_ID_QUERY = "INSERT INTO Likes(user_id, video_id) VALUES (:userId, :videoId)";
    public static final String INSERT_LIKE_BY_COMMENT_ID_QUERY = "INSERT INTO Likes(user_id, comment_id) VALUES (:userId, :commentId)";
    public static final String DELETE_VIDEO_LIKE_BY_USER_ID_QUERY = "DELETE FROM Likes WHERE user_id = :userId AND video_id = :videoId";
    public static final String DELETE_COMMENT_LIKE_BY_USER_ID_QUERY = "DELETE FROM Likes WHERE user_id = :userId AND comment_id = :commentId";
    public static final String SELECT_VIDEO_LIKE_COUNT_QUERY = "SELECT COUNT(*) FROM Likes WHERE video_id = :videoId";
    public static final String SELECT_COMMENT_LIKE_COUNT_QUERY = "SELECT COUNT(*) FROM Likes WHERE comment_id = :commentId";
}

