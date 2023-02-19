package com.project.youtube.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.project.youtube.service.VideoService;

@RestController
@RequestMapping(value="/api/video/")
@RequiredArgsConstructor
public class VideoController {

    //auto-wire
    @Autowired
    private final VideoService videoService;
    /**
     * Rest endpoint uploads video to service provider
     * @param file
     */
    @PostMapping(value="upload")
    @ResponseStatus(HttpStatus.CREATED)//response
    public void uploadVideo(@RequestParam("file") MultipartFile file){
        videoService.uploadVideo(file);
    }

    @GetMapping(value="test")
    public String testing(){
        return "hello world";
    }
}
