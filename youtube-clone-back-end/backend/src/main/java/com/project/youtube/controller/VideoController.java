package com.project.youtube.controller;

import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.FileUploadTestService;
import com.project.youtube.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticatedUser;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticationFromContext;

@RestController
@RequestMapping(value= API_VERSION + "video/")
@RequiredArgsConstructor
public class VideoController {

    @Autowired
    private final VideoServiceImpl videoService;

    private static final Logger LOGGER = LoggerFactory.getLogger(VideoController.class);

    /**
     * Upload video
     * @param video the video file
     * @return the response
     */
    @PostMapping("upload")
    public ResponseEntity<HttpResponse> uploadVideo(@RequestParam("video") MultipartFile video) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        VideoDto videoDto = videoService.uploadVideo(video, userId);
        return new ResponseEntity<>(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Video uploaded.")
                        .data(Map.of("video", videoDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.CREATED);
    }

    /**
     * Update thumbnail image
     * @param thumbnail the file thumbnail
     * @return the response
     */
    @PatchMapping("update/thumbnail")
    public ResponseEntity<HttpResponse> updateThumbnail(@RequestParam("thumbnail") MultipartFile thumbnail) {

        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Thumbnail successfully updated.")
                        .data(Map.of("video", null))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * update the video metadata
     * @param videoMetadataForm the metadata form
     * @return the response
     */
    @PatchMapping("update/metadata")
    public ResponseEntity<HttpResponse> updateMetadata(@RequestBody @Valid UpdateVideoMetadataForm videoMetadataForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        videoMetadataForm.setUserId(userId);

        VideoDto videoDto = videoService.updateVideoMetadata(videoMetadataForm);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Video metadata successfully updated.")
                        .data(Map.of("video", videoDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    @GetMapping(value = "thumbnail", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getThumbnail(@RequestParam("t") String fileName) {
        return videoService.getThumbnail(fileName);
    }

    @GetMapping("watch")
    public byte[] getVideo(@RequestParam("v") String videoUrl) {
        return new byte[0];
    }

    @GetMapping("gif")
    public byte[] getGif(@RequestParam("v") String shortVideoUrl) {
        return new byte[0];
    }

    /**
     * Get the video metadata
     * @param id the video id
     * @return the response
     */
    @GetMapping("metadata")
    public ResponseEntity<HttpResponse> getMetadata(@RequestParam("id") Long id) {
        VideoDto videoDto = videoService.getVideoMetadataById(id);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Metadata successfully retrieved.")
                        .data(Map.of("video", videoDto))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    @GetMapping("metadata/all")
    public ResponseEntity<HttpResponse> getAllUserVideoMetadata(@RequestParam("pageSize") Integer pageSize, @RequestParam("offset") Integer offset) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        List<VideoDto> videoList = videoService.getAllByUserId(userId, pageSize, offset);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Metadata successfully retrieved.")
                        .data(Map.of("video", videoList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * get video category for a video
     * @param videoId the video id
     * @return the response
     */
    @GetMapping("category")
    public ResponseEntity<HttpResponse> getCategory(@RequestParam("id") Long videoId) {
        videoService.getVideoCategory(videoId);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Category retrieved successfully.")
                        //.data(Map.of("video", videoDto))//TODO: Category should be returned
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * delete a video
     * @param videoId the video id
     * @return the response
     */
    @DeleteMapping()
    public ResponseEntity<HttpResponse> deleteVideo(@RequestParam("id") Long videoId) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        videoService.delete(videoId, userId);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Video deleted.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * Rest endpoint uploads video to service provider
     *
     * @param file
     * @return
     */
    /*@PostMapping(value="upload")
    @ResponseStatus(HttpStatus.CREATED)//response
    public VideoDto uploadVideo(@RequestParam("file") MultipartFile file){
        LOGGER.info("Entering uploadVideo");
       return videoServiceImpl.uploadVideo(file);
    }

    @PutMapping(value="updateMetadata")
    @ResponseStatus(HttpStatus.OK)
    public VideoDto updateVideoMetadata(@RequestBody VideoDto videoDto){
        LOGGER.info("Entering updateVideoMetadata");
        return null;//videoServiceImpl.updateVideoMetadata(videoDto);
    }

    @PutMapping(value="Thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadVideoThumbnail(@RequestParam("file") MultipartFile multipartFile, @RequestParam("videoId") String videoId){
        LOGGER.info("Entering uploadVideoThumbnail");
        return null;//videoServiceImpl.uploadVideoThumbnail(multipartFile, videoId);
    }*/
}
