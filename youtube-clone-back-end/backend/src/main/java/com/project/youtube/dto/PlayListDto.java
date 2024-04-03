package com.project.youtube.dto;

import com.project.youtube.model.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistDto {
    private Long id;
    private String thumbnailUrl;
    private String name;
    private String description;
    private List<VideoDto> videos;
    private Status visibilityStatus;
    private Integer size;
}
