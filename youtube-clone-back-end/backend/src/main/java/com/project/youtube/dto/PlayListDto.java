package com.project.youtube.dto;

import com.project.youtube.model.Video;
import com.project.youtube.enumaration.VisibilityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayListDto {
    private String id;
    private String title;
    private List<Video> videos;
    private String description;
    private VisibilityStatus VisibilityStatus;
}
