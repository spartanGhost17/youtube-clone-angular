package com.project.youtube.controller;

import com.project.youtube.dto.PlayListDto;
import com.project.youtube.service.impl.PlayListServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/v1/playlist/")
@RequiredArgsConstructor
public class PlaylistController {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlaylistController.class);

    @Autowired
    private final PlayListServiceImpl playListServiceImpl;
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

    @GetMapping(value="playList")
    public PlayListDto getPlayList(@RequestParam("id") String playListId) {
        return playListServiceImpl.getPlayList(playListId);
    }

    @PutMapping(value="newPlaylist")
    public PlayListDto createPlaylist(@RequestBody PlayListDto playListDto) {
        LOGGER.info("Entered createPlaylist endpoint");
        return playListServiceImpl.createPlaylist(playListDto);
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
