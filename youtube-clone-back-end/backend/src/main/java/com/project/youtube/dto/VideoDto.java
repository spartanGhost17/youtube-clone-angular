package com.project.youtube.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

//@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class VideoDto {
    private Long id;
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
    private String thumbnailUrl;
    private String videoUrl;
    private String location;
    private boolean reported;
}
