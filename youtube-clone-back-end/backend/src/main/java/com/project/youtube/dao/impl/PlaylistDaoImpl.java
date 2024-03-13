package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.PlaylistDao;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;
import com.project.youtube.model.Playlist;
import com.project.youtube.service.impl.StatusServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.project.youtube.constants.ApplicationConstants.PLAYLIST_MAX_SIZE;
import static com.project.youtube.query.PlaylistQuery.*;
import static java.util.Objects.requireNonNull;

@Repository
@RequiredArgsConstructor
@Slf4j
public class PlaylistDaoImpl implements PlaylistDao<Playlist> {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final StatusServiceImpl statusService;

    /**
     * create a playlist entry
     * @param playlistForm the playlist creation form
     */
    @Override
    public void create(PlaylistForm playlistForm) {
        try {

            KeyHolder keyHolder = new GeneratedKeyHolder();
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("userId", playlistForm.getUserId());
            parameterSource.addValue("name", playlistForm.getName());

            if(playlistForm.getDescription() != null) {
                parameterSource.addValue("description", playlistForm.getDescription());
            } else {
                parameterSource.addValue("description", "");
            }
            jdbcTemplate.update(INSERT_PLAYLIST_QUERY, parameterSource, keyHolder);
            Long playlistId = requireNonNull(keyHolder.getKey().longValue());
            statusService.setPlaylistStatus(playlistId, playlistForm.getStatusId());//TODO: should move this to service layer
            //TODO: User should be able to add an item to playlist on create
        } catch (DataIntegrityViolationException exception) {
            throw new APIException("You cannot create two playlists with the same name.");
        } catch (Exception exception) {
            throw new APIException("An error occurred while creating the playlist.");
        }
    }

    /**#
     * get playlist by id
     * @param playlistId the playlist id
     * @return the playlist
     */
    @Override
    public Playlist getByPlaylistId(Long playlistId) {
        try {
            return jdbcTemplate.queryForObject(SELECT_PLAYLIST_BY_PLAYLIST_ID_QUERY, Map.of("id", playlistId), new BeanPropertyRowMapper<>(Playlist.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not retrieve the requested playlist");
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving the playlist");
        }
    }

    /**
     * get playlist by user id (owned by user)
     * @param userId the user id
     * @return the playlist
     */
    @Override
    public List<Playlist> getByUserId(Long userId) {
        try {
            return jdbcTemplate.query(SELECT_PLAYLIST_BY_USER_ID_QUERY, Map.of("userId", userId), new BeanPropertyRowMapper<>(Playlist.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not retrieve the playlist");
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving the playlist");
        }
    }

    /**
     * update videos position in playlist
     * @param videosList the video item list (video reference)
     * @return the list of update
     */
    @Override
    @Transactional //error will cause entire operation to rollback
    public void updateVideosPosition(List<VideoItemForm> videosList) {
        try {
            SqlParameterSource[] args = videosList.stream()
                            .map(videoItem -> new MapSqlParameterSource()
                                    .addValue("position", videoItem.getVideoPosition())
                                    .addValue("videoId", videoItem.getVideoId())
                                    .addValue("playlistId", videoItem.getPlaylistId())
                            )
                    .collect(Collectors.toList()).toArray(SqlParameterSource[]::new);

            jdbcTemplate.batchUpdate(UPDATE_PLAYLIST_VIDEO_POSITION_QUERY, args);
        } catch (Exception exception) {
            throw new APIException("An error occurred while updating the playlist items positions.");
        }
    }

    /**
     * update the playlist
     * @param playlistForm the playlist form
     * @return the playlist
     */
    @Override
    public Playlist updatePlaylist(PlaylistForm playlistForm) {
        try {
            MapSqlParameterSource parameterSource = new MapSqlParameterSource();
            parameterSource.addValue("playlistId", playlistForm.getPlaylistId());
            //if(playlistForm.getName() != null) {
            parameterSource.addValue("name", playlistForm.getName());
            //}
            if(playlistForm.getDescription() != null) {
                parameterSource.addValue("description", playlistForm.getDescription());
            }
            jdbcTemplate.update(UPDATE_PLAYLIST_BY_PLAYLIST_ID_QUERY, parameterSource);
            return getByPlaylistId(playlistForm.getPlaylistId());
        } catch (DataIntegrityViolationException exception) {
            throw new APIException("This playlist name '" + playlistForm.getName() + "' already exists, please choose a different name.");
        } catch (Exception exception) {
            //throw exception;
            throw new APIException("Could not update playlist.");
        }
    }

    /**
     * add a video to playlist
     * @param videoItemForm
     */
    @Override
    public void addVideo(VideoItemForm videoItemForm) {
        try {
            int currentSize = getPlaylistSize(videoItemForm.getPlaylistId());
            if(!isFull(videoItemForm.getPlaylistId())) {
                int position = Math.max(currentSize, 0);
                jdbcTemplate.update(INSERT_PLAYLIST_VIDEO_QUERY, Map.of("playlistId", videoItemForm.getPlaylistId(), "videoId", videoItemForm.getVideoId(), "position", position));
            }
        } catch (DataIntegrityViolationException exception) {
            throw new APIException("This video already exists in this playlist.");
        } catch (Exception exception) {
            throw exception;
            //throw new APIException("An error occurred, could not add video to playlist");
        }
    }

    /**
     * get all user playlists where video is present
     * @param videoId the video id
     * @param userId the user id
     * @return the response
     */
    @Override
    public List<Playlist> isPresent(Long videoId, Long userId) {
        try {
            return jdbcTemplate.query(SELECT_PLAYLIST_BY_VIDEO_ID_QUERY, Map.of("videoId", videoId, "userId", userId), new BeanPropertyRowMapper<>(Playlist.class));
        } catch (Exception exception) {
            throw exception;
            //throw new APIException("An error occurred, could not retrieve");
        }
    }

    /**
     * get the videos associated with this playlist
     * @param playlistId the playlist id
     * @return the
     */
    @Override
    public List<VideoDto> getVideos(Long playlistId) {
        try {
            return jdbcTemplate.query(SELECT_PLAYLIST_VIDEOS_QUERY, Map.of("playlistId", playlistId), new BeanPropertyRowMapper<>(VideoDto.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred, could not retrieve playlist videos.");
        }
    }

    /**
     * check if playlist is full
     * @param playlistId the playlist id
     * @return the boolean
     */
    @Override
    public boolean isFull(Long playlistId) {
        return getPlaylistSize(playlistId) > PLAYLIST_MAX_SIZE;
    }

    /**
     * get playlist size
     * @param playlistId the playlist id
     * @return the playlist size
     */
    @Override
    public Integer getPlaylistSize(Long playlistId) {
        try {
            return jdbcTemplate.queryForObject(SELECT_PLAYLIST_VIDEO_COUNT_BY_PLAYLIST_ID_QUERY, Map.of("playlistId", playlistId), Integer.class);
        } catch (Exception exception) {
            throw new APIException("An error occurred while getting playlist size.");
        }
    }

    /**
     * delete a playlist owned by this user
     * @param playlistId the playlist id
     * @param userId the user id
     */
    @Override
    public void delete(Long playlistId, Long userId) {
        try {
            if(!Objects.equals(getByPlaylistId(playlistId).getUserId(), userId)) { throw new APIException("You do not own this playlist."); }
            jdbcTemplate.update(DELETE_PLAYLIST_QUERY, Map.of("playlistId", playlistId, "userId", userId));
        } catch (APIException exception) {
            throw exception;
        } catch (Exception exception) {
            throw new APIException("An error occurred while deleting the playlist");
        }
    }
}
