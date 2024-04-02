package com.project.youtube.controller;

import com.project.youtube.dto.PlaylistDto;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.PlayListServiceImpl;
import com.project.youtube.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.hibernate.sql.Delete;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticatedUser;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticationFromContext;

@RestController
@RequestMapping(value=API_VERSION + "playlist/")
@RequiredArgsConstructor
public class PlaylistController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlaylistController.class);

    @Autowired
    private final PlayListServiceImpl playListService;
    private final VideoServiceImpl videoService;

    /**
     * create playlist
     * @param playlistForm the playlist form
     * @return the response
     */
    @PostMapping()
    public ResponseEntity<HttpResponse> createPlaylist(@RequestBody @Valid PlaylistForm playlistForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        playlistForm.setUserId(userId);

        playListService.create(playlistForm);
        List<PlaylistDto> playlistDtoList = playListService.getByUserId(userId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Playlist successfully created.")
                        .data(Map.of("playlist", playlistDtoList))
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build(), HttpStatus.CREATED);
    }

    /**
     * get playlist by id
     * @param playlistId the playlist id
     * @return the response
     */
    @GetMapping("id")
    public ResponseEntity<HttpResponse> getPlaylistById(@RequestParam("id") Long playlistId) {
        PlaylistDto playlistDto = playListService.getByPlaylistId(playlistId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Playlist retrieved.")
                        .data(Map.of("playlist", playlistDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * get playlist by user id
     * @param userId the user id
     * @return the response
     */
    @GetMapping("user")
    public ResponseEntity<HttpResponse> getPlayListByUserId(@RequestParam("userId") Long userId) {
        List<PlaylistDto> playlistDto = playListService.getByUserId(userId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("User playlist retrieved.")
                        .data(Map.of("playlist", playlistDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    @GetMapping("name")
    public ResponseEntity<HttpResponse> getHistory(@RequestParam("pageSize") Long pageSize, @RequestParam("offset") Long offset, @RequestParam("userId") Long userId, @RequestParam("name") String name) {
        //Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        PlaylistDto playlist = playListService.getByName(pageSize, offset, userId, name);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("User playlist retrieved.")
                        .data(Map.of("playlist", playlist))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * update the playlist name or description
     * @param playlistForm
     * @return
     */
    @PatchMapping("update")
    public ResponseEntity<HttpResponse> updatePlaylist(@RequestBody @Valid PlaylistForm playlistForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        playlistForm.setUserId(userId);

        PlaylistDto playlistDto = playListService.updatePlaylist(playlistForm);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Playlist successfully updated.")
                        .data(Map.of("playlist", playlistDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * return user playlists where video is present
     * @param videoId the video id
     * @return the  response
     */
    @GetMapping("isIn")
    public ResponseEntity<HttpResponse> videoInPlaylist(@RequestParam("videoId") Long videoId) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();

        List<PlaylistDto> playlistDtoList = playListService.isPresent(videoId, userId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Playlists retrieved.")
                        .data(Map.of("playlist", playlistDtoList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * add video to playlist
     * @param videoItemForm the video form
     * @return the response
     */
    @PostMapping("add/video")
    public ResponseEntity<HttpResponse> addVideo(@RequestBody @Valid VideoItemForm videoItemForm) {
        playListService.addVideo(videoItemForm);
        VideoDto videoDto = playListService.getVideoById(videoItemForm.getVideoId(), videoItemForm.getPlaylistId());

        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Video added to playlist updated.")
                        .data(Map.of("video", videoDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * get the playlist videos
     * @param playlistId the playlist id
     * @return the response
     */
    @GetMapping("videos")
    public ResponseEntity<HttpResponse> getVideos(@RequestParam("id") Long playlistId, @RequestParam("pageSize") Long pageSize, @RequestParam("offset") Long offset) {
        PlaylistDto playlistDto = playListService.getByPlaylistId(playlistId);
        List<VideoDto> videoDtoList = playListService.getVideos(playlistId, pageSize, offset);
        playlistDto.setVideos(videoDtoList);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Video added to playlist updated.")
                        .data(Map.of("playlist", playlistDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * update video position in playlist
     * @param videoItemForm the video items list in the playlist
     * @return the response
     */
    @PatchMapping("update/videos/position")
    public ResponseEntity<HttpResponse> updateVideosPosition(@RequestBody @Valid List<VideoItemForm> videoItemForm) {
        playListService.updateVideosPosition(videoItemForm);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Videos positions updated successfully.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * delete video from playlist
     * @param videoItemForm the video item
     * @return the response
     */
    @DeleteMapping("video")
    public ResponseEntity<HttpResponse> deleteVideo(@RequestBody @Valid VideoItemForm videoItemForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        playListService.deleteVideo(userId, videoItemForm.getVideoId(), videoItemForm.getPlaylistId());
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Videos deleted from playlist.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * delete a playlist
     * @param playlistId the playlist id
     * @return the response
     */
    @DeleteMapping()
    public ResponseEntity<HttpResponse> deletePlaylist(@RequestParam("id") Long playlistId) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        playListService.delete(playlistId, userId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Playlist was deleted successfully.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
}
