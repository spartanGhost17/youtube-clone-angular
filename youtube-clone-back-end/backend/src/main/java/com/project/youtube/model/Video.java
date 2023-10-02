package com.project.youtube.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Document(value = "Video") //this is a mongodb document 'equivalent of SQL table'
@Data
@EntityScan
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    private String id;
    private String title;
    private String description;
    //private int duration;
    private Integer likes;
    private Integer dislikes;
    private Set<String> tags;
    private VisibilityStatus visibilityStatus;
    private VideoCategory videoCategory;
    private String genre;
    private Integer viewCount;
    private String thumbnailURL;
    private String videoUrl;
    private List<Comment> commentList;
}
