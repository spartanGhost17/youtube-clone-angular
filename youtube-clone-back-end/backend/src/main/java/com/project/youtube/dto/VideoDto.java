package com.project.youtube.dto;


import com.project.youtube.model.VideoCategory;
import com.project.youtube.model.VisibilityStatus;
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
    //private int duration;
    private Set<String> tags;
    private VisibilityStatus visibilityStatus;
    private VideoCategory videoCategory;
    private String genre;
    private String thumbnailURL;
    private String videoUrl;
}
