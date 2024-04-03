package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.PlaylistDaoImpl;
import com.project.youtube.dto.PlaylistDto;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;
import com.project.youtube.model.Playlist;
import com.project.youtube.model.User;
import com.project.youtube.model.VideoThumbnail;
import com.project.youtube.service.PlayListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.project.youtube.dtomapper.PlaylistDTOMapper.toPlaylistDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayListServiceImpl implements PlayListService {
    private final PlaylistDaoImpl playlistDao;
    private final StatusServiceImpl statusService;
    private final VideoServiceImpl videoService;
    private final TagServiceImpl tagService;
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
        playlistDto.setVideos(new ArrayList<>());
        if(playlistDao.getPlaylistSize(playlistDto.getId()) > 0) {
            playlistDto.setThumbnailUrl(playlistDao.getThumbnailUrl(playlistDto.getId()));
        }
        return playlistDto;
    }

    /**
     * get user's owned playlists
     * @param userId the user id
     * @return the list of playlists
     */
    @Override
    public List<PlaylistDto> getByUserId(Long userId) {
        log.info("getting user playlists {}",userId);
        List<PlaylistDto> playlistDto = playlistDao.getByUserId(userId).stream().map(playlist -> {
            PlaylistDto playlistdto = mapPlaylistToDto(playlist);
            playlistdto.setVisibilityStatus(statusService.getPlaylistStatus(playlistdto.getId()));
            playlistdto.setSize(getPlaylistSize(playlistdto.getId()));
            playlistdto.setVideos(new ArrayList<>());
            if(playlistDao.getPlaylistSize(playlistdto.getId()) > 0) {
                playlistdto.setThumbnailUrl(playlistDao.getThumbnailUrl(playlistdto.getId()));
            }
            return playlistdto;
        }).collect(Collectors.toList());
        return playlistDto;
    }

    /**
     * Get all user playlists where video id is present
     * @param videoId the video
     * @param userId the user id
     * @return the list of playlists
     */
    @Override
    public List<PlaylistDto> isPresent(Long videoId, Long userId) {
        return playlistDao.isPresent(videoId, userId).stream()
                .map(playlist -> {
                    PlaylistDto playlistDto = mapPlaylistToDto(playlist);
                    playlistDto.setSize(getPlaylistSize(playlistDto.getId()));
                    playlistDto.setVideos(new ArrayList<>());

                    if(playlistDao.getPlaylistSize(playlistDto.getId()) > 0) {
                        playlistDto.setThumbnailUrl(playlistDao.getThumbnailUrl(playlistDto.getId()));
                    }
                    return playlistDto;
                }).collect(Collectors.toList());
    }

    /**
     * update playlist
     * @param playlistForm the playlist update form
     * @return the updated playlist
     */
    @Override
    public PlaylistDto updatePlaylist(PlaylistForm playlistForm) {
        PlaylistDto playlistDto = mapPlaylistToDto(playlistDao.updatePlaylist(playlistForm));
        playlistDto.setVideos(new ArrayList<>());
        if(playlistDao.getPlaylistSize(playlistDto.getId()) > 0) {
            playlistDto.setThumbnailUrl(playlistDao.getThumbnailUrl(playlistDto.getId()));
        }
        return  playlistDto;
    }

    /**
     * get playlist by name
     * @param userId the userId
     * @param name
     * @return
     */
    @Override
    public PlaylistDto getByName(Long pageSize, Long offset, Long userId, String name) {
        PlaylistDto playlistDto = mapPlaylistToDto(playlistDao.getByName(userId, name));
        playlistDao.getVideos(playlistDto.getId(), pageSize, offset);
        playlistDto.setVisibilityStatus(statusService.getPlaylistStatus(playlistDto.getId()));
        playlistDto.setSize(getPlaylistSize(playlistDto.getId()));
        if(playlistDao.getPlaylistSize(playlistDto.getId()) > 0) {
            playlistDto.setThumbnailUrl(playlistDao.getThumbnailUrl(playlistDto.getId()));
        }
        return playlistDto;
    }

    /**
     * get videos for the playlist
     * @param playlistId the playlist id
     * @param pageSize the page size
     * @param offset the offset
     * @return the list of videos
     */
    @Override
    public List<VideoDto> getVideos(Long playlistId, Long pageSize, Long offset) {

        return playlistDao.getVideos(playlistId, pageSize, offset).stream().map(videoDto -> {
            videoDto.setStatus(statusService.getVideoStatus(videoDto.getId()));
            videoDto.setLikeCount(videoService.getLikeCount(videoDto));
            videoDto.setStatus(statusService.getVideoStatus(videoDto.getId()));

            List<VideoThumbnail> thumbnails = videoService.getThumbnails(videoDto.getId());
            videoDto.setVideoThumbnails(thumbnails);

            videoDto.setTags(tagService.getByVideoId(videoDto.getId()));

            Optional<VideoThumbnail> thumbnailOptional = thumbnails.stream().filter(thumbnail -> Objects.equals(thumbnail.getId(), videoDto.getThumbnailId())).findFirst();
            thumbnailOptional.ifPresent(thumbnail -> videoDto.setThumbnailUrl(thumbnail.getThumbnailUrl()));

            User user = videoService.getOwner(videoDto.getUserId());
            videoDto.setUsername(user.getUsername());
            videoDto.setChannelName(user.getChannelName());

            return videoDto;
        }).collect(Collectors.toList());
        //return playlistDao.getVideos(playlistId);
    }

    /**
     * get video by id in playlist
     * @param videoId the video id
     * @param playlistId the playlist id
     * @return the video
     */
    @Override
    public VideoDto getVideoById(Long videoId, Long playlistId) {
        return playlistDao.getVideoById(videoId, playlistId);
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

    /**
     * delete video from playlist
     * @param userId the user id
     * @param videoId the video id
     * @param playlistId the playlist id
     */
    @Override
    public void deleteVideo(Long userId, Long videoId, Long playlistId) {
        playlistDao.deleteVideo(userId, videoId, playlistId);
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
