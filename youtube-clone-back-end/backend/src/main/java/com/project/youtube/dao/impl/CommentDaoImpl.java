package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.CommentDao;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.Comment;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.project.youtube.query.CommentQuery.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class CommentDaoImpl implements CommentDao<Comment> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    /**
     * get comment by id
     * @param id the id
     * @return the comment
     */
    @Override
    public Comment get(Long id) {
        try {
            return jdbcTemplate.queryForObject(SELECT_COMMENT_BY_ID, Map.of("id", id), new BeanPropertyRowMapper<>(Comment.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not retrieve the desired comment");
        } catch (Exception exception) {
            throw new APIException("An error occurred. Could not find the comment");
        }
    }

    /**
     * Create a comment
     * @param commentForm the comment form
     * @return the created comment
     */
    @Override
    public void create(CreateCommentForm commentForm) {
        try {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("userId", commentForm.getUserId());
            parameterSource.addValue("videoId", commentForm.getVideoId());
            parameterSource.addValue("commentText", commentForm.getCommentText());

            if(commentForm.getParentCommentId() != null) {
                Long id = commentForm.getParentCommentId();
                parameterSource.addValue("parentCommentId", id);
            }

            jdbcTemplate.update(commentForm.getParentCommentId() == null? INSERT_COMMENT_QUERY : INSERT_SUB_COMMENT_QUERY, parameterSource);
        } catch (DataIntegrityViolationException exception) {
            log.error(exception.getMessage());
        } catch (Exception exception) {
            log.error(exception.getMessage());
            throw new APIException("An error occurred while posting comment, please try again. "+exception.getCause());
        }
    }

    /**
     * delete the comment
     * @param id the comment id
     */
    @Override
    public void delete(Long id) {
        try {
            jdbcTemplate.update(DELETE_COMMENT_QUERY, Map.of("id", id));
        } catch (Exception exception) {
            log.error(exception.getMessage());
            throw new APIException("An error occurred while deleting the comment. Please try again");
        }
    }

    /**
     * update the comment text
     * @param commentText the text
     * @param id the comment id
     * @return the update comment
     */
    @Override
    public Comment updateComment(String commentText, Long id) {
        try {
            jdbcTemplate.update(UPDATE_COMMENT_QUERY, Map.of("commentText", commentText, "id", id));
            return get(id);
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not update the comment text");
        }
    }

    /**
     * get comment page
     * @param videoId the video id
     * @param pageSize the page size
     * @param offset the offset
     * @param isSubComment if the request is for sub comments or top level comments
     * @return the comment list
     */
    @Override
    public List<Comment> getComments(Long videoId, int pageSize, Long offset, Boolean isSubComment) {
        try {
            return jdbcTemplate.query(isSubComment? SELECT_SUB_COMMENT_PAGE_QUERY : SELECT_COMMENT_PAGE_QUERY, Map.of("videoId", videoId, "pageSize", pageSize, "offset", offset), new BeanPropertyRowMapper<>(Comment.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred white loading comments. Please try again.");
        }
    }
}
