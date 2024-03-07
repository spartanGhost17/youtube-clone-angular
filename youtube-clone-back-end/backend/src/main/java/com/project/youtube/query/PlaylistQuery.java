package com.project.youtube.query;

public class PlaylistQuery {
    public static final String INSERT_PLAYLIST_QUERY = "INSERT INTO Playlists (user_id, name, description) VALUES (:userId, :name, :description)";
    public static final String SELECT_PLAYLIST_BY_USER_ID_QUERY = "SELECT * FROM Playlists WHERE user_id = :userId";
    public static final String SELECT_PLAYLIST_BY_PLAYLIST_ID_QUERY = "SELECT * FROM Playlists WHERE id = :id";
    public static final String UPDATE_PLAYLIST_BY_PLAYLIST_ID_QUERY = "UPDATE Playlists SET name = :name, description = :description WHERE id = :playlistId";
    public static final String SELECT_PLAYLIST_VIDEO_COUNT_BY_PLAYLIST_ID_QUERY = "SELECT COUNT(*) FROM PlaylistVideos WHERE playlist_id = :playlistId";
    public static final String SELECT_PLAYLIST_VIDEOS_QUERY = "SELECT plv.position, v.* FROM PlaylistVideos AS plv INNER JOIN Videos AS v ON plv.video_id = v.id WHERE playlist_id = :playlistId ORDER BY plv.position ASC";
    public static final String INSERT_PLAYLIST_VIDEO_QUERY = "INSERT INTO PlaylistVideos (playlist_id, video_id, video_position) VALUES (:playlistId, :videoId, :videoPosition)";
    public static final String UPDATE_PLAYLIST_VIDEO_POSITION_QUERY = "UPDATE PlaylistVideos SET video_position = :videoPosition WHERE video_id = :videoId AND playlist_id = :playlistId";
    public static final String DELETE_PLAYLIST_QUERY = "DELETE FROM Playlists WHERE id = :playlistId AND user_id = :userId";
}
