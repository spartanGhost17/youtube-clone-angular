package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.FeedDaoImpl;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FeedServiceImpl implements FeedService {
    private final UserServiceImpl userService;
    private final FeedDaoImpl feedDao;
    /**
     * get a feed for use
     * @param pageSize the pagesize
     * @param offset the offset
     * @return the list of info
     */
    @Override
    public List<UserDTO> getFeed(Long pageSize, Long offset) {
        List<UserDTO> users = new ArrayList<>();
        List<VideoDto> videos = feedDao.getFeed(pageSize, offset);
        for(VideoDto videoMetadata : videos) {
            UserDTO userDTO = userService.getUser(videoMetadata.getUserId());
            userDTO.setVideos(List.of(videoMetadata));
            users.add(userDTO);
        }
        return users;
    }
}
