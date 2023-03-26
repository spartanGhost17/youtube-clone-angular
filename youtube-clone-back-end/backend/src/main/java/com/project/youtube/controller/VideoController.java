package com.project.youtube.controller;

import com.project.youtube.dto.VideoDto;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.project.youtube.service.impl.VideoServiceImpl;

@RestController
@RequestMapping(value="/api/v1/video/")
@RequiredArgsConstructor
public class VideoController {

    //auto-wire
    @Autowired
    private final VideoServiceImpl videoServiceImpl;

    private static final Logger LOGGER = LoggerFactory.getLogger(VideoController.class);
    /**
     * Rest endpoint uploads video to service provider
     *
     * @param file
     * @return
     */
    @PostMapping(value="upload")
    @ResponseStatus(HttpStatus.CREATED)//response
    public VideoDto uploadVideo(@RequestParam("file") MultipartFile file){
        LOGGER.info("Entering uploadVideo");
       return videoServiceImpl.uploadVideo(file);
    }

    @PutMapping(value="updateMetadata")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto updateVideoMetadata(@RequestBody VideoDto videoDto){
        LOGGER.info("Entering updateVideoMetadata");
        return videoServiceImpl.updateVideoMetadata(videoDto);
    }

    @PutMapping(value="Thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadVideoThumbnail(@RequestParam("file") MultipartFile multipartFile, @RequestParam("videoId") String videoId){
        LOGGER.info("Entering uploadVideoThumbnail");
        return videoServiceImpl.uploadVideoThumbnail(multipartFile, videoId);
    }
}
