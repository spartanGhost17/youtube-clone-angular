package com.project.youtube.controller;

import com.project.youtube.dto.PlayListDto;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.service.PlayListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/v1/playList/")
public class PlaylistController {
    @Autowired
    private PlayListService playListService;

    @GetMapping(value="/playList")
    public PlayListDto getPlayList(@RequestParam("id") String playListId) {
        return this.playListService.getPlayList(playListId);
    }

    @PutMapping(value="/addVideo")
    public ResponseEntity updatePlayListVideos(@RequestParam("playListId") String playListId, @RequestParam("videoId") String videoId) {
        return new ResponseEntity<>(this.playListService.addVideo(playListId, videoId), HttpStatus.OK);
    }
}
