package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.StatusDao;
import com.project.youtube.model.PlaylistStatus;
import com.project.youtube.model.Status;
import com.project.youtube.model.VideoStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

import static com.project.youtube.query.StatusQuery.*;

@Repository
@RequiredArgsConstructor
public class StatusDaoImpl implements StatusDao<Status> {
    private final NamedParameterJdbcTemplate jdbcTemplate;

    /**
     * get all status
     * @return the list of available status for selection
     */
    @Override
    public List<Status> getAllStatus() {
        try {
            return jdbcTemplate.query(SELECT_ALL_STATUS_QUERY, new BeanPropertyRowMapper<>(Status.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving the list of visibility status");
        }
    }

    /**
     * get status by name
     * @param name the status name
     * @return the status
     */
    @Override
    public Status getByName(String name) {
        try {
            return jdbcTemplate.queryForObject(SELECT_STATUS_BY_NAME_QUERY, Map.of("statusName", name), new BeanPropertyRowMapper<>(Status.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find the status '"+name+"'");
        } catch (Exception exception) {
            throw new APIException("An error occurred while getting the video status");
        }
    }

    /**
     * get status by status id
     * @param statusId the status id
     * @return the status
     */
    @Override
    public Status getStatus(Long statusId) {
        try {
            return jdbcTemplate.queryForObject(SELECT_STATUS_BY_STATUS_ID_QUERY, Map.of("statusId", statusId), new BeanPropertyRowMapper<>(Status.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find the specified status.");
        } catch (Exception exception) {
            throw new APIException("An error occurred while fetching status, please try again.");
        }

    }

    /**
     * set status if not available
     * @param videoId the video id
     * @param statusId the status id
     */
    @Override
    public Status setVideoStatus(Long videoId, Long statusId) {
        try {
            boolean hasStatus = isStatusAssigned(videoId);
            jdbcTemplate.update(hasStatus ? UPDATE_VIDEO_STATUS_BY_VIDEO_ID_QUERY : INSERT_VIDEO_STATUS_BY_VIDEO_ID_QUERY, Map.of("videoId", videoId, "statusId", statusId));
            //getVideoStatus(videoId)
            return getStatus(statusId);
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not update video status");
        }
    }

    /**
     * set or update status
     * @param playlistId the playlist id
     * @param statusId the status id
     * @return the status
     */
    @Override
    public Status setPlaylistStatus(Long playlistId, Long statusId) { //TODO: test this method
        try {
            boolean hasStatus = isPlaylistStatusAssigned(playlistId);
            jdbcTemplate.update(hasStatus ? UPDATE_PLAYLIST_STATUS_BY_PLAYLIST_ID_QUERY : INSERT_PLAYLIST_STATUS_BY_PLAYLIST_ID_QUERY, Map.of("statusId", statusId, "playlistId", playlistId));
            return getStatus(statusId);
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not update video status");
        }
    }

    /**
     * get status assigned to video
     * @param videoId the video id
     * @return the status
     */
    @Override
    public Status getVideoStatus(Long videoId) {
        try {
            VideoStatus videoStatus = jdbcTemplate.queryForObject(SELECT_VIDEO_STATUS_BY_VIDEO_ID_QUERY, Map.of("videoId", videoId), new BeanPropertyRowMapper<>(VideoStatus.class));
            videoStatus.getStatusId();
            Status status = getStatus(videoStatus.getStatusId());
            return status;
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find an assigned status for this video");
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving video status, please try again");
        }
    }

    /**
     * get status assigned to playlist
     * @param playlistId the playlist id
     * @return the status
     */
    @Override
    public Status getPlaylistStatus(Long playlistId) {
        try {
            PlaylistStatus playlistStatus = jdbcTemplate.queryForObject(SELECT_PLAYLIST_STATUS_BY_PLAYLIST_ID_QUERY, Map.of("playlistId", playlistId), new BeanPropertyRowMapper<>(PlaylistStatus.class));
            Status status = getStatus(playlistStatus.getStatusId());
            return status;
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find an assigned status for this playlist");
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving playlist status, please try again");
        }
    }

    /**
     * check if video has an assigned status
     * @param playlistId the video id
     * @return true if video has an assigned status, else false
     */
    private boolean isPlaylistStatusAssigned(Long playlistId) {
        int count = jdbcTemplate.queryForObject(SELECT_PLAYLIST_STATUS_COUNT_QUERY, Map.of("playlistId", playlistId), Integer.class);
        return count > 0;
    }

    /**
     * check if video has an assigned status
     * @param videoId the video id
     * @return true if video has an assigned status, else false
     */
    private boolean isStatusAssigned(Long videoId) {
        int count = jdbcTemplate.queryForObject(SELECT_VIDEO_STATUS_COUNT_QUERY, Map.of("videoId", videoId), Integer.class);
        return count > 0;
    }
}
