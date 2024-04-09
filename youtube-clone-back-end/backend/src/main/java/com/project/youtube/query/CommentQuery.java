package com.project.youtube.query;

public class CommentQuery {
    public static final String SELECT_COMMENT_BY_ID = "SELECT * FROM Comments WHERE id = :id";
    public static final String INSERT_COMMENT_QUERY = "INSERT INTO Comments (user_id, video_id, comment_text) VALUES (:userId, :videoId, :commentText)";
    public static final String INSERT_SUB_COMMENT_QUERY = "INSERT INTO Comments (user_id, video_id, comment_text, parent_comment_id, to_user_id) VALUES (:userId, :videoId, :commentText, :parentCommentId, :toUserId)";
    public static final String DELETE_COMMENT_QUERY = "DELETE FROM Comments WHERE id = :id";
    public static final String UPDATE_COMMENT_QUERY = "UPDATE Comments SET comment_text = :commentText WHERE id = :id";
    public static final String SELECT_COMMENT_PAGE_QUERY = "SELECT * FROM Comments WHERE video_id = :videoId AND parent_comment_id IS NULL ORDER BY created_at DESC LIMIT :pageSize OFFSET :offset";
    public static final String SELECT_SUB_COMMENT_PAGE_QUERY = "SELECT * FROM Comments WHERE video_id = :videoId AND parent_comment_id = :parentId ORDER BY created_at DESC LIMIT :pageSize OFFSET :offset";
    public static final String SELECT_VIDEO_COMMENT_COUNT_QUERY = "SELECT COUNT(*) FROM Comments WHERE video_id = :videoId";
    public static final String SELECT_COMMENT_REPLY_COUNT_QUERY = "SELECT COUNT(*) FROM Comments WHERE parent_comment_id = :parentId";
}
