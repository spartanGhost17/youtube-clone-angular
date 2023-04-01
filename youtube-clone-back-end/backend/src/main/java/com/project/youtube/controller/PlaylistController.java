package com.project.youtube.controller;

import com.project.youtube.dto.PlayListDto;
import com.project.youtube.service.impl.PlayListServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/v1/playList/")
@RequiredArgsConstructor
public class PlaylistController {

    @Autowired
    private final PlayListServiceImpl playListServiceImpl;

    @GetMapping(value="/playList")
    public PlayListDto getPlayList(@RequestParam("id") String playListId) {
        return playListServiceImpl.getPlayList(playListId);
    }

    /*@PutMapping(value="/addVideo")
    public ResponseEntity updatePlayListVideos(@RequestParam("playListId") String playListId, @RequestParam("videoId") String videoId) {
        return new ResponseEntity<>(playListServiceImpl.addVideo(playListId, videoId), HttpStatus.OK);
    }*/
}
