package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.LikeDaoImpl;
import com.project.youtube.form.LikeForm;
import com.project.youtube.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {
    private final LikeDaoImpl likeDao;

    /**
     * create like entry
     * @param likeForm the like form
     */
    @Override
    public void create(LikeForm likeForm) {
        likeDao.create(likeForm);
    }

    /**
     * delete the like
     * @param likeForm the like form
     */
    @Override
    public void delete(LikeForm likeForm) {
        likeDao.delete(likeForm);
    }

    /**
     * get like count for either comment or video
     * @param likeForm the like form
     * @return the count
     */
    @Override
    public Long getLikeCount(LikeForm likeForm) {
        return likeDao.getLikeCount(likeForm);
    }
}
