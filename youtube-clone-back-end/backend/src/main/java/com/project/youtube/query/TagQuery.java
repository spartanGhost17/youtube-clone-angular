package com.project.youtube.query;

public class TagQuery {
    public static final String SELECT_TAG_BY_ID_QUERY = "SELECT * FROM Tags id = :id";
    public static final String SELECT_TAG_BY_NAME_QUERY = "SELECT * FROM Tags WHERE tag_name = :tagName";
    public static final String INSERT_TAG_QUERY = "INSERT INTO Tags (tag_name) VALUES (:tagName)";
    public static final String INSERT_VIDEO_TAG_QUERY = "INSERT INTO VideoTags (video_id, tag_id) VALUES (:videoId, :tagId)";
    public static final String SELECT_VIDEO_TAGS_QUERY = "SELECT t.* FROM VideoTags AS vt INNER JOIN Tags AS t ON t.id = vt.tag_id WHERE vt.video_id = :videoId";
    public static final String DELETE_TAG_QUERY = "DELETE FROM Tags WHERE id = :id";
    public static final String DELETE_VIDEO_TAGS_QUERY = "DELETE FROM VideoTags WHERE video_id = :videoId";
    public static final String DELETE_SINGLE_VIDEO_TAG_QUERY = "DELETE FROM VideoTags WHERE video_id = :videoId AND tag_id = :tagId";
}
