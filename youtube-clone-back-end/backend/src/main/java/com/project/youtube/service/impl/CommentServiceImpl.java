package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.CommentDaoImpl;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;
import com.project.youtube.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
    @Autowired
    private final CommentDaoImpl commentDao;
    @Override
    public void create(CreateCommentForm commentForm) {
        commentDao.create(commentForm);
    }

    @Override
    public Comment get(Long id) {
        return null;
    }

    /**
     * get top level comments page
     * @param videoId the video id
     * @param pageSize the page size
     * @param offset the offset
     * @return the comments list
     */
    @Override //TODO: get primary comments with parent_comment_id null
    public List<Comment> getComments(Long videoId, int pageSize, Long offset, Boolean isSubComment) {
        return commentDao.getComments(videoId, pageSize, offset, isSubComment);
    }

    /**
     * delete a comment
     * @param id the comment id
     */
    @Override
    public void delete(Long id) {
        commentDao.delete(id);
    }

    /**
     * Update comment text
     * @param commentText the text
     * @return the updated Comment
     */
    @Override
    public Comment updateComment(String commentText, Long id) {
        return commentDao.updateComment(commentText, id);
    }
}
