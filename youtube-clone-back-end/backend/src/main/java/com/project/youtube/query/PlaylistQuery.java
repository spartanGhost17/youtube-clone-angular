package com.project.youtube.query;

public class PlaylistQuery {
    public static final String INSERT_PLAYLIST_QUERY = "INSERT INTO Playlists (user_id, name, description) VALUES (:userId, :name, :description)";
    public static final String SELECT_PLAYLIST_BY_USER_ID_QUERY = "SELECT * FROM Playlists WHERE user_id = :userId AND name NOT IN ('Likes', 'Watch Later', 'History')";
    public static final String SELECT_PLAYLIST_BY_PLAYLIST_ID_QUERY = "SELECT * FROM Playlists WHERE id = :id";
    public static final String  SELECT_PLAYLIST_BY_NAME_QUERY = "SELECT * FROM Playlists WHERE LOWER(TRIM(name)) = LOWER(TRIM(:name)) AND user_id = :userId";
    public static final String UPDATE_PLAYLIST_BY_PLAYLIST_ID_QUERY = "UPDATE Playlists SET name = :name, description = :description WHERE id = :playlistId";
    public static final String SELECT_PLAYLIST_VIDEO_COUNT_BY_PLAYLIST_ID_QUERY = "SELECT COUNT(*) FROM PlaylistVideos WHERE playlist_id = :playlistId";
    public static final String  SELECT_ALL_PLAYLIST_VIDEOS_QUERY = "SELECT plv.position, v.* FROM PlaylistVideos AS plv INNER JOIN Videos AS v ON plv.video_id = v.id WHERE playlist_id = :playlistId ORDER BY plv.position ASC";
    public static final String SELECT_PLAYLIST_VIDEO_BY_ID_QUERY = "SELECT plv.position, v.* FROM PlaylistVideos AS plv INNER JOIN Videos AS v ON plv.video_id = v.id WHERE playlist_id = :playlistId AND v.id = :videoId";
    public static final String SELECT_PLAYLIST_THUMBNAIL_URL_QUERY = "SELECT vt.thumbnail_url FROM VideoThumbnails AS vt INNER JOIN PlaylistVideos AS pv ON pv.video_id = vt.video_id INNER JOIN Videos AS v ON v.id = pv.video_id WHERE v.thumbnail_id = vt.id AND pv.position = 0 AND pv.playlist_id = :playlistId";
    public static final String SELECT_PLAYLIST_VIDEOS_QUERY = "SELECT plv.position, v.* FROM PlaylistVideos AS plv INNER JOIN Videos AS v ON plv.video_id = v.id WHERE playlist_id = :playlistId ORDER BY plv.position ASC LIMIT :pageSize OFFSET :offset";
    public static final String INSERT_PLAYLIST_VIDEO_QUERY = "INSERT INTO PlaylistVideos (playlist_id, video_id, position) VALUES (:playlistId, :videoId, :position)";
    public static final String UPDATE_PLAYLIST_VIDEO_POSITION_QUERY = "UPDATE PlaylistVideos SET position = :position WHERE video_id = :videoId AND playlist_id = :playlistId";
    public static final String DELETE_PLAYLIST_QUERY = "DELETE FROM Playlists WHERE id = :playlistId AND user_id = :userId";
    public static final String SELECT_PLAYLIST_BY_VIDEO_ID_QUERY = "SELECT p.* FROM PlaylistVideos AS pv INNER JOIN Playlists AS p ON p.id = pv.playlist_id WHERE pv.video_id = :videoId AND p.user_id = :userId AND LOWER(p.name) NOT IN ('watch later', 'likes')";
    public static final String DELETE_PLAYLIST_VIDEO_BY_VIDEO_ID = "DELETE FROM PlaylistVideos WHERE video_id = :videoId AND playlist_id = :playlistId";
}
