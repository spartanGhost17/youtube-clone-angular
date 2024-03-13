package com.project.youtube.dto;


import com.project.youtube.model.Status;
import com.project.youtube.model.Tag;
import com.project.youtube.model.VideoThumbnail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
//@JsonInclude(NON_NULL)
public class VideoDto {
    private Long id;
    private Long position;
    private Long userId;
    private String title;
    private String description;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private Time duration;
    private Time stopAt;
    private Long totalBytes;
    private Long stopAtBytes;
    private Long views;
    private Boolean commentEnabled;
    private Long thumbnailId;
    private String thumbnailUrl;
    private List<VideoThumbnail> videoThumbnails;
    private String videoUrl;
    private String gifUrl;
    private String location;
    private boolean reported;
    //extra fields
    private Long likeCount;
    private Status status;
    private List<Tag> tags;
}
