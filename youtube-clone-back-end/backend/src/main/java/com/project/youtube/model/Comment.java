package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Column;
import java.sql.Timestamp;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Comment {
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "video_id")
    private Long videoId;
    @Column(name = "comment_text")
    private String commentText;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "last_updated")
    private Timestamp lastUpdated;
    @Column(name = "parent_comment_id")
    private Long parentCommentId;
    private boolean reported;
}
