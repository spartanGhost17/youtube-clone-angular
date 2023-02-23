package com.project.youtube.controller;

import com.project.youtube.dto.VideoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.project.youtube.service.impl.VideoServiceImpl;

@RestController
@RequestMapping(value="/api/video/")
@RequiredArgsConstructor
public class VideoController {

    //auto-wire
    @Autowired
    private final VideoServiceImpl videoServiceImpl;
    /**
     * Rest endpoint uploads video to service provider
     * @param file
     */
    @PostMapping(value="upload")
    @ResponseStatus(HttpStatus.CREATED)//response
    public void uploadVideo(@RequestParam("file") MultipartFile file){
        videoServiceImpl.uploadVideo(file);
    }

    @PutMapping(value="updateMetadata")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto updateVideoMetadata(@RequestBody VideoDto videoDto){
        System.out.println("In controller updateVideoMetadata");
        return videoServiceImpl.updateVideoMetadata(videoDto);
    }

    @GetMapping(value="test")
    @ResponseStatus(HttpStatus.OK)
    public String test(){
       return "Hello world";
    }
}
