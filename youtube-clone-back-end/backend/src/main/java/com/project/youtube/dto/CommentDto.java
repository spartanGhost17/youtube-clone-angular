package com.project.youtube.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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
    private Long replyCount;
    private String imageUrl;
    private String username;
    private List<CommentDto> subComments = new ArrayList<>();
    private String to;
}
