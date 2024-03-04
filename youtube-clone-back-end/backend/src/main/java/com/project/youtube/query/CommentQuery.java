package com.project.youtube.query;

public class CommentQuery {
    public static final String SELECT_COMMENT_BY_ID = "SELECT * FROM Comments WHERE id = :id";
    public static final String INSERT_COMMENT_QUERY = "INSERT INTO Comments (user_id, video_id, comment_text) VALUES (:userId, :videoId, :commentText)";
    public static final String INSERT_SUB_COMMENT_QUERY = "INSERT INTO Comments (user_id, video_id, comment_text, parent_comment_id) VALUES (:userId, :videoId, :commentText, :parentCommentId)";
    public static final String DELETE_COMMENT_QUERY = "DELETE FROM Comments WHERE id = :id";
    public static final String UPDATE_COMMENT_QUERY = "UPDATE Comments SET comment_text = :commentText WHERE id = :id";
    public static final String SELECT_COMMENT_PAGE_QUERY = "SELECT * FROM Comments WHERE video_id = :videoId AND parent_comment_id IS NULL LIMIT :pageSize OFFSET :offset";
    public static final String SELECT_SUB_COMMENT_PAGE_QUERY = "SELECT * FROM Comments WHERE video_id = :videoId AND parent_comment_id IS NOT NULL LIMIT :pageSize OFFSET :offset";
}
