package com.project.youtube.query;

public class StatusQuery {
    public static final String SELECT_ALL_STATUS_QUERY = "SELECT * FROM Status";
    public static final String SELECT_STATUS_BY_NAME_QUERY = "SELECT * FROM Status WHERE status_name = :statusName";
    public static final String SELECT_STATUS_BY_STATUS_ID_QUERY = "SELECT * FROM Status WHERE id = :statusId";

    public static final String SELECT_VIDEO_STATUS_COUNT_QUERY = "SELECT COUNT(*) FROM VideoStatus WHERE video_id = :videoId";
    public static final String SELECT_VIDEO_STATUS_BY_VIDEO_ID_QUERY = "SELECT * FROM VideoStatus WHERE video_id = :videoId";
    public static final String INSERT_VIDEO_STATUS_BY_VIDEO_ID_QUERY = "INSERT INTO VideoStatus(video_id, status_id) VALUES (:videoId, :statusId)";
    public static final String UPDATE_VIDEO_STATUS_BY_VIDEO_ID_QUERY = "UPDATE VideoStatus SET status_id = :statusId WHERE video_id = :videoId";
    public static final String SELECT_PLAYLIST_STATUS_COUNT_QUERY = "SELECT COUNT(*) FROM PlaylistStatus WHERE playlist_id = :playlistId";
    public static final String SELECT_PLAYLIST_STATUS_BY_PLAYLIST_ID_QUERY = "SELECT * FROM PlaylistStatus WHERE playlist_id = :playlistId";
    public static final String INSERT_PLAYLIST_STATUS_BY_PLAYLIST_ID_QUERY = "INSERT INTO PlaylistStatus (status_id, playlist_id) VALUES (:statusId, :playlistId)";
    public static final String UPDATE_PLAYLIST_STATUS_BY_PLAYLIST_ID_QUERY = "UPDATE PlaylistStatus SET status_id = :statusId WHERE playlist_id = :playlistId";
}
