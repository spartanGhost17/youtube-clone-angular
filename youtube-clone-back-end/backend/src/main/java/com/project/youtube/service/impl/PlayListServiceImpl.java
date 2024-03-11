package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.PlaylistDaoImpl;
import com.project.youtube.dto.PlaylistDto;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;
import com.project.youtube.model.Playlist;
import com.project.youtube.model.Status;
import com.project.youtube.service.PlayListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import static com.project.youtube.dtomapper.PlaylistDTOMapper.toPlaylistDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayListServiceImpl implements PlayListService {
    private final PlaylistDaoImpl playlistDao;
    private final StatusServiceImpl statusService;
    private static final Logger LOGGER = LoggerFactory.getLogger(PlayListServiceImpl.class);

    /**
     * create a new playlist
     * @param playlistForm the playlist creation form
     * @return the playlist dto (rich object)
     */
    @Override
    public void create(PlaylistForm playlistForm) {
        playlistDao.create(playlistForm);
    }

    /**
     * get playlist by id
     * @param playListId the playlist id
     * @return the playlist dto
     */
    @Override
    public PlaylistDto getByPlaylistId(Long playListId) {
        PlaylistDto playlistDto = mapPlaylistToDto(playlistDao.getByPlaylistId(playListId));
        playlistDto.setVisibilityStatus(statusService.getPlaylistStatus(playListId));
        playlistDto.setSize(getPlaylistSize(playlistDto.getId()));
        return playlistDto;
    }

    /**
     * get user's owned playlists
     * @param userId the user id
     * @return the list of playlists
     */
    @Override
    public List<PlaylistDto> getByUserId(Long userId) {
        log.info("getting user playlists ");
        List<PlaylistDto> playlistDto = playlistDao.getByUserId(userId).stream().map(playlist -> {
            PlaylistDto playlistdto = mapPlaylistToDto(playlist);
            playlistdto.setVisibilityStatus(statusService.getPlaylistStatus(playlistdto.getId()));
            playlistdto.setSize(getPlaylistSize(playlistdto.getId()));
            return playlistdto;
        }).collect(Collectors.toList());
        return playlistDto;
    }

    /**
     * update playlist
     * @param playlistForm the playlist update form
     * @return the updated playlist
     */
    @Override
    public PlaylistDto updatePlaylist(PlaylistForm playlistForm) {
        return  mapPlaylistToDto(playlistDao.updatePlaylist(playlistForm));
    }

    /**
     * get videos for the playlist
     * @param playlistId the playlist id
     * @return the list of videos
     */
    @Override
    public List<VideoDto> getVideos(Long playlistId) {
        return playlistDao.getVideos(playlistId).stream().map(videoDto -> {
            videoDto.setStatus(statusService.getVideoStatus(videoDto.getId()));
            return videoDto;
        }).collect(Collectors.toList());
        //return playlistDao.getVideos(playlistId);
    }

    /**
     * update positions of playlist items
     * @param videosList the video list
     * @return the list of updated videos
     */
    @Override
    public void updateVideosPosition(List<VideoItemForm> videosList) {
        playlistDao.updateVideosPosition(videosList);
    }

    /**
     * get playlist size
     * @param playlistId the playlist id
     * @return the size of the playlist
     */
    @Override
    public Integer getPlaylistSize(Long playlistId) {
        return playlistDao.getPlaylistSize(playlistId);
    }

    /**
     * add video to playlist
     * @param videoItemForm the video form
     */
    @Override
    public void addVideo(VideoItemForm videoItemForm) {
        playlistDao.addVideo(videoItemForm);
    }

    @Override
    public void delete(Long playlistId, Long userId) {
        playlistDao.delete(playlistId, userId);
    }

    /**
     * map playlist to dto
     * @param playlist the playlist
     * @return the
     */
    private PlaylistDto mapPlaylistToDto(Playlist playlist) {
        return toPlaylistDto(playlist);
    }

}
