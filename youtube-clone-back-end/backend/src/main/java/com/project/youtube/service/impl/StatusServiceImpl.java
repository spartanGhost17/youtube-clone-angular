package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.StatusDaoImpl;
import com.project.youtube.model.Status;
import com.project.youtube.service.StatusService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class StatusServiceImpl implements StatusService<Status> {
    private final StatusDaoImpl statusDao;

    /**
     * get the list of available status for selection
     * @return the list status
     */
    @Override
    public List<Status> getAllStatus() {
        log.info("getting all status");
        return statusDao.getAllStatus();
    }

    @Override
    public Status getByName(String name) {
        return statusDao.getByName(name);
    }

    /**
     * get the video status
     * @param videoId the video id
     * @return the status
     */
    @Override
    public Status getVideoStatus(Long videoId) {
        log.info("get status for video id: {}", videoId);
        return statusDao.getVideoStatus(videoId);
    }

    /**
     * get the playlist status
     * @param playlistId the playlist id
     * @return the status
     */
    @Override
    public Status getPlaylistStatus(Long playlistId) {
        log.info("get status for playlist {}", playlistId);
        return statusDao.getPlaylistStatus(playlistId);
    }

    /**
     * update the video status
     * @param videoId the video id
     * @param statusId the status id
     * @return the status
     */
    @Override
    public Status setVideoStatus(Long videoId, Long statusId) {
        log.info("update the video status for video id: {}, and status id {}",videoId, statusId);
        return statusDao.setVideoStatus(videoId, statusId);
    }

    /**
     * set/update the playlist status
     * @param playlistId the playlist id
     * @param statusId the status id
     * @return the status
     */
    @Override
    public Status setPlaylistStatus(Long playlistId, Long statusId) {
        log.info("update the video status for playlist id: {}, and status id {}",playlistId, statusId);
        return statusDao.setPlaylistStatus(playlistId, statusId);
    }

}
