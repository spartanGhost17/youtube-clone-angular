package com.project.youtube.dao;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;
import com.project.youtube.model.Playlist;

import java.util.List;

public interface PlaylistDao<T> {
    void create(PlaylistForm playlistForm);
    Playlist getByPlaylistId(Long playlistId);
    List<Playlist> getByUserId(Long userId);
    void updateVideosPosition(List<VideoItemForm> videosList);
    Playlist updatePlaylist(PlaylistForm playlistForm);
    void addVideo(VideoItemForm videoItemForm);
    List<T> isPresent(Long videoId, Long userId);
    List<VideoDto> getVideos(Long playlistId);
    boolean isFull(Long playlistId);
    Integer getPlaylistSize(Long playlistId);
    void deleteVideo(Long userId, Long videoId, Long playlistId);
    void delete(Long playlistId, Long userId);
}
