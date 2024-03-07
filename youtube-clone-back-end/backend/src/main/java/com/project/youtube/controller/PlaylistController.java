package com.project.youtube.controller;

import com.project.youtube.dto.PlaylistDto;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.PlaylistForm;
import com.project.youtube.form.VideoItemForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.PlayListServiceImpl;
import lombok.RequiredArgsConstructor;
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
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Playlist successfully created.")
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
     * add video to playlist
     * @param videoItemForm the video form
     * @return the response
     */
    @PostMapping("add/video")
    public ResponseEntity<HttpResponse> addVideo(@RequestBody @Valid VideoItemForm videoItemForm) {
        playListService.addVideo(videoItemForm);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .message("Video added to playlist updated.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
    }
    //public PlayListDto createPlaylist(@RequestParam("title") String title, @RequestParam("description")String description, @RequestParam("visibilityStatus")String visibilityStatus){
    //    return playListServiceImpl.createPlaylist(title, description, visibilityStatus);
    //}

    /*@PutMapping(value="/addVideo")
    public ResponseEntity updatePlayListVideos(@RequestParam("playListId") String playListId, @RequestParam("videoId") String videoId) {
        return new ResponseEntity<>(playListServiceImpl.addVideo(playListId, videoId), HttpStatus.OK);
    }*/

    @GetMapping(value="test")
    public String test() {
        return "this is a test";
    }
}
