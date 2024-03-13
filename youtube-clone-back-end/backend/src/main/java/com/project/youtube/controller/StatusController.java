package com.project.youtube.controller;

import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.Status;
import com.project.youtube.service.impl.StatusServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RestController
@RequestMapping(API_VERSION + "status")
@RequiredArgsConstructor
public class StatusController {
    private final StatusServiceImpl statusService;

    /**
     * get selectable status
     * @return
     */
    @GetMapping()
    public ResponseEntity<HttpResponse> getAllStatus() {
        List<Status> statusList = statusService.getAllStatus();
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("status retrieved")
                        .data(Map.of("status", statusList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * set or update the video status
     * @param videoId the video id
     * @param statusId the status id
     * @return the response
     */
    @PostMapping("update/video")
    public ResponseEntity<HttpResponse> updateVideoStatus(@RequestParam("videoId") Long videoId, @RequestParam("statusId") Long statusId) {
        Status status = statusService.setVideoStatus(videoId, statusId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Video status retrieved.")
                        .data(Map.of("status", status))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * set or update the playlist status
     * @param playlistId the video id
     * @param statusId the status id
     * @return the response
     */
    @PostMapping("update/playlist")
    public ResponseEntity<HttpResponse> updatePlaylistStatus(@RequestParam("playlistId") Long playlistId, @RequestParam("statusId") Long statusId) {
        Status status = statusService.setPlaylistStatus(playlistId, statusId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Playlist status retrieved.")
                        .data(Map.of("status", status))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
}
