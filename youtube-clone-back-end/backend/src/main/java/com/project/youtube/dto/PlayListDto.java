package com.project.youtube.dto;

import com.project.youtube.model.Video;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlayListDto {
    private int ID;
    private List<Video> videos;
    private String description;
}
