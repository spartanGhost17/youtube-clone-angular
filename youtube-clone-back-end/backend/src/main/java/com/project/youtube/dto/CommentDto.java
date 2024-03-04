package com.project.youtube.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CommentDto {
    private Long id;
    private Long userId;
    private Long videoId;
    private String commentText;
    private Timestamp createdAt;
    private Timestamp lastUpdated;
    private Long parentCommentId;
    private boolean reported;
    //extra fields
    private Long likeCount;
}
