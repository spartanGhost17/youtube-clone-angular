package com.project.youtube.dtomapper;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.model.Video;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class VideoDTOMapper {
    public static VideoDto toVideoDto(Video video) {
        VideoDto videoDto = new VideoDto();
        BeanUtils.copyProperties(video, videoDto);
        return videoDto;
    }
}
