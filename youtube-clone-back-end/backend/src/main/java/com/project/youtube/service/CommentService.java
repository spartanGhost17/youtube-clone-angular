package com.project.youtube.service;

import com.project.youtube.dto.CommentDto;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;

import java.util.List;

public interface CommentService {
    CommentDto create(CreateCommentForm commentForm);
    CommentDto get(Long id);
    CommentDto delete(Long id);
    CommentDto updateComment(String commentText, Long id);
    Long getReplyCount(Long id);
    Long getVideoCommentsCount(Long videoId);
    List<CommentDto> getComments(Long videoId, Long pageSize, Long offset, Boolean isSubComment, Long parentId);
}
