package com.project.youtube.controller;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.dto.VideoDto;
import com.project.youtube.form.UpdateVideoMetadataForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.VideoServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Mono;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.*;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticatedUser;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticationFromContext;

@RestController
@RequestMapping(value= API_VERSION + "video/")
@RequiredArgsConstructor
@Slf4j
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

    /*@GetMapping(value="watch", produces = "video/mp4") //load entire resource
    public Mono<ResponseEntity<Resource>> streamVideo(@RequestParam("v") String videoUrl, @RequestParam(value = "start", required = false) Long start, @RequestParam(value = "end", required = false) Long end, HttpServletRequest request) {
        return videoService.streamVideo2(videoUrl, start, end, request);
    }*/

    /**
     * stream with byte range
     * @param videoUrl the video url
     * @param headers the headers
     * @return the bytes to return
     */
    @GetMapping(value="watch/{videoUrl}", produces = "video/mp4")//, produces = "video/mp4")
    public Mono<ResponseEntity<ResourceRegion>> streamVideo(@PathVariable String videoUrl, @RequestHeader HttpHeaders headers) {
        String defaultFolder = VIDEOS_DEFAULT_FOLDER;
        return videoService.streamVideo3(videoUrl, headers, defaultFolder);
    }

    /**
     * stream using adaptive bitrate
     * @param videoUrl the video url
     * @param dashFileName the dash file name
     * @return either the .mpd manifest or the .ms4 chunk
     */
    @RequestMapping(value = "watch/{videoUrl}/{dashFileName}", method = {RequestMethod.GET, RequestMethod.HEAD}, produces = "application/dash+xml")//, produces = MediaType.APPLICATION_XML_VALUE) //"application/dash+xml"
    public Mono<ResponseEntity<Resource>> streamVideoABR(@PathVariable String videoUrl, @PathVariable String dashFileName) {
        return videoService.streamVideoABR(videoUrl, dashFileName);
    }

    /**
     * stream gif video
     * @param shortVideoUrl the short video url
     * @param headers the request headers
     * @return the response
     */
    @GetMapping("gif")
    public Mono<ResponseEntity<ResourceRegion>> getGif(@RequestParam("v") String shortVideoUrl, @RequestHeader HttpHeaders headers) {
        log.info("stream gif");
        String defaultFolder = GIFS_DEFAULT_FOLDER;
        String videoUrl = shortVideoUrl.split("\\.")[0];
        return videoService.streamVideo3(videoUrl, headers, defaultFolder);
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

    /**
     * get video page by user id
     * @param pageSize the page size
     * @param offset the offset
     * @param userId the user id
     * @return the response
     */
    @GetMapping("metadata/all")
    public ResponseEntity<HttpResponse> getAllUserVideoMetadata(@RequestParam("userId") Long userId, @RequestParam("pageSize") Integer pageSize, @RequestParam("offset") Integer offset) {
        //Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
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
