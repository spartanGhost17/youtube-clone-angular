package controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import repository.VideoRepository;
import service.VideoService;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    //auto-wire
    private final VideoService videoService;
    /**
     * Rest endpoint uploads video to service provider
     * @param file
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)//response
    public void uploadVideo(@RequestParam("file") MultipartFile file){
        videoService.uploadVideo(file);
    }
}
