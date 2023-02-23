package com.project.youtube.dto;


import com.project.youtube.model.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDto {
    private String id;
    private String title;
    private String description;
    private Set<String> tags;
    private VideoStatus videoStatus;
    private String thumbnailURL;
    private String videoUrl;
}
