package com.project.youtube.service;

import com.project.youtube.form.LikeForm;

public interface LikeService {
    void create(LikeForm likeForm);
    void delete(LikeForm likeForm);
    Long getLikeCount(LikeForm likeForm);
}
