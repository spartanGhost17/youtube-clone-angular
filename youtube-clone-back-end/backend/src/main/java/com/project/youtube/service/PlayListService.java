package com.project.youtube.service;

import com.project.youtube.dto.PlaylistDto;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;

import java.util.List;

public interface PlayListService {

    void create(PlaylistForm playlistForm);
    PlaylistDto getByPlaylistId(Long playListId);
    List<PlaylistDto> getByUserId(Long userId);
    List<PlaylistDto> isPresent(Long videoId, Long userId);
    PlaylistDto updatePlaylist(PlaylistForm playlistForm);
    List<VideoDto> getVideos(Long playlistId);
    void updateVideosPosition(List<VideoItemForm> videosList);
    Integer getPlaylistSize(Long playlistId);
    void addVideo(VideoItemForm videoItemForm);
    void deleteVideo(Long userId, Long videoId, Long playlistId);
    void delete(Long playlistId, Long userId);
}
