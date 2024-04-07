package com.project.youtube.dao.impl;


import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.LikeDao;
import com.project.youtube.form.LikeForm;
import com.project.youtube.model.Like;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import static com.project.youtube.query.LikeQuery.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class LikeDaoImpl implements LikeDao<Like> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    /**
     * create like object
     * @param likeForm the like form
     */
    @Override
    public void create(LikeForm likeForm) {
        try {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("userId", likeForm.getUserId());

            if(likeForm.getCommentId() != null) {
                parameterSource.addValue("commentId", likeForm.getCommentId());
            } else {
                parameterSource.addValue("videoId", likeForm.getVideoId());
            }

            jdbcTemplate.update(likeForm.getVideoId() != null? INSERT_LIKE_BY_VIDEO_ID_QUERY : INSERT_LIKE_BY_COMMENT_ID_QUERY, parameterSource);
        } catch (ConstraintViolationException exception) {
            throw exception;
        } catch (Exception exception) {
            throw exception;
        }
    }

    /**
     * delete like entry
     * @param likeForm
     */
    @Override
    public void delete(LikeForm likeForm) {
        try {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("userId", likeForm.getUserId());

            if(likeForm.getCommentId() != null) {
                parameterSource.addValue("commentId", likeForm.getCommentId());
            } else {
                parameterSource.addValue("videoId", likeForm.getVideoId());
            }

            jdbcTemplate.update(likeForm.getVideoId() != null ? DELETE_VIDEO_LIKE_BY_USER_ID_QUERY : DELETE_COMMENT_LIKE_BY_USER_ID_QUERY, parameterSource);
        } catch (Exception exception) {
            throw exception;
        }
    }

    /**
     * get the like count
     * @param likeForm the like form
     * @return the like count
     */
    @Override
    public Long getLikeCount(LikeForm likeForm) {
        try {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            //parameterSource.addValue("userId", likeForm.getUserId());

            if(likeForm.getCommentId() != null) {
                parameterSource.addValue("commentId", likeForm.getCommentId());
            } else {
                parameterSource.addValue("videoId", likeForm.getVideoId());
            }
            return jdbcTemplate.queryForObject(likeForm.getVideoId() != null ? SELECT_VIDEO_LIKE_COUNT_QUERY : SELECT_COMMENT_LIKE_COUNT_QUERY, parameterSource, Long.class);

        } catch (EmptyResultDataAccessException exception) {
          throw new APIException("Could not retrieve the like count");
        } catch (Exception exception) {
            throw exception;
        }
    }
}
