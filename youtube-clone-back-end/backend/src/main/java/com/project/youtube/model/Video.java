package com.project.youtube.model;

import com.project.youtube.enumaration.VideoCategory;
import com.project.youtube.enumaration.VisibilityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;

//@Document(value = "Video") //this is a mongodb document 'equivalent of SQL table'
@Data
@EntityScan
@NoArgsConstructor
@AllArgsConstructor
public class Video {

    @Id
    private String id;
    private String title;
    private String description;
    private Long duration;
    private Integer likes;
    private Integer dislikes;
    //private Set<String> tags; //should be a foreign key ref to tags table
    private VisibilityStatus visibilityStatus;
    private VideoCategory videoCategory;
    private String genre;
    private Integer viewCount;
    private String thumbnailURL;
    private String videoUrl;
    //private List<Comment> commentList;
}
