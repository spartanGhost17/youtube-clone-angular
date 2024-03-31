package com.project.youtube.dao;

import com.project.youtube.dto.VideoDto;

import java.util.List;

public interface FeedDao {
    List<VideoDto> getFeed(Long pageSize, Long offset);
}
