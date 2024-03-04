package com.project.youtube.service;

import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;

import java.util.List;

public interface CommentService {
    void create(CreateCommentForm commentForm);
    Comment get(Long id);
    void delete(Long id);
    Comment updateComment(String commentText, Long id);
    List<Comment> getComments(Long videoId, int pageSize, Long offset, Boolean isSubComment);
}
