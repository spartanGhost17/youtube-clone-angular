package com.project.youtube.dao;

import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao<T> {
    Comment get(Long id);
    Comment create(CreateCommentForm commentForm);
    void delete(Long id);
    Long getCommentCount(Long id);
    Long getVideoCommentsCount(Long videoId);
    Long getReplyCount(Long commentId);
    Comment updateComment(String commentText, Long id);
    List<Comment> getComments(Long videoId, Long pageSize, Long offset, Boolean isSubComment, Long parentId);
}
