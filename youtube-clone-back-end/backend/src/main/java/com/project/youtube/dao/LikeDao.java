package com.project.youtube.dao;

import com.project.youtube.form.LikeForm;

public interface LikeDao<T> {
    void create(LikeForm likeForm);
    void delete(LikeForm likeForm);
    Long getLikeCount(LikeForm likeForm);
}
