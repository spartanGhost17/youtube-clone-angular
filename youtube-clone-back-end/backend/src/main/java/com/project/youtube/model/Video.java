package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Column;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Video {
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    private String title;
    private String description;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "updated_at")
    private Timestamp updatedAt;
    private Time duration;
    @Column(name = "stop_at")
    private Time stopAt;
    @Column(name = "total_bytes")
    private Long totalBytes;
    @Column(name = "stop_at_bytes")
    private Long stopAtBytes;
    private Long views;
    @Column(name = "comment_enabled")
    private Boolean commentEnabled;
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;
    @Column(name = "video_url")
    private String videoUrl;
    private String location;
    private Boolean reported;
}
