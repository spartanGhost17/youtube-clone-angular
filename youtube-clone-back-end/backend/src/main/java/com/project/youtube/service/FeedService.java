package com.project.youtube.service;

import com.project.youtube.dto.UserDTO;

import java.util.List;

public interface FeedService {
    List<UserDTO> getFeed(Long pageSize, Long offset);
}
