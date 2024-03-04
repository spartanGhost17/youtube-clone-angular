package com.project.youtube.dao;

import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao<T> {
    Comment get(Long id);
    void create(CreateCommentForm commentForm);
    void delete(Long id);
    Comment updateComment(String commentText, Long id);
    List<Comment> getComments(Long videoId, int pageSize, Long offset, Boolean isSubComment);
}
