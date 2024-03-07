package com.project.youtube.dao;

import java.util.List;

public interface StatusDao<T> {
    List<T> getAllStatus();
    T getByName(String name);
    T getStatus(Long statusId);
    T setVideoStatus(Long videoId, Long statusId);
    T setPlaylistStatus(Long playlistId, Long statusId);
    T getVideoStatus(Long videoId);
    T getPlaylistStatus(Long playlistId);
}
