package com.project.youtube.service;

import java.util.List;

public interface StatusService<T> {
    List<T> getAllStatus();
    T getByName(String name);
    T getVideoStatus(Long videoId);
    T getPlaylistStatus(Long playlistId);
    T setVideoStatus(Long videoId, Long statusId);
    T setPlaylistStatus(Long playlistId, Long statusId);
}
