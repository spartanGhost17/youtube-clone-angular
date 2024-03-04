package com.project.youtube.service;

import com.project.youtube.dto.CommentDto;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;

import java.util.List;

public interface CommentService {
    void create(CreateCommentForm commentForm);
    CommentDto get(Long id);
    void delete(Long id);
    CommentDto updateComment(String commentText, Long id);
    List<CommentDto> getComments(Long videoId, int pageSize, Long offset, Boolean isSubComment);
}
