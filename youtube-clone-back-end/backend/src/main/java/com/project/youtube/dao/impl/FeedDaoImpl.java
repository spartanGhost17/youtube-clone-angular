package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.FeedDao;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.project.youtube.query.VideoQuery.SELECT_VIDEO_FEED_QUERY;

@Repository
@RequiredArgsConstructor
@Slf4j
public class FeedDaoImpl implements FeedDao {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final VideoServiceImpl videoService;

    /**
     * get feed of videos
     * @param pageSize the pagesize
     * @param offset the offset
     * @return the list of videos with their user's information
     */
    @Override
    public List<VideoDto> getFeed(Long pageSize, Long offset) {
        List<VideoDto> videoDtoList = new ArrayList<>();
        try {
            List<VideoDto> videos = jdbcTemplate.query(SELECT_VIDEO_FEED_QUERY, Map.of("pageSize", pageSize, "offset", offset), new BeanPropertyRowMapper<>(VideoDto.class));
            for(VideoDto video: videos) {
                videoDtoList.add(videoService.getVideoMetadataById(video.getId()));
            }
            return videoDtoList;
        } catch (Exception exception) {
            throw new APIException("An error occurred while getting the video feed");
        }
    }
}
