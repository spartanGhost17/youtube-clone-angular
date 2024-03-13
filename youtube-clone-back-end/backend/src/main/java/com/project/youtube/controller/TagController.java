package com.project.youtube.controller;

import com.project.youtube.form.CreateTagsForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.Tag;
import com.project.youtube.service.impl.TagServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RestController
@RequestMapping(value = API_VERSION + "tag/")
@RequiredArgsConstructor
public class TagController {
    private final TagServiceImpl tagService;

    /**
     * create video tags
     * @param tagsForm the tags form object
     * @return the response
     */
    @PostMapping()
    public ResponseEntity<HttpResponse> createVideoTags(@RequestBody @Valid CreateTagsForm tagsForm) {
        List<Tag> tagList = tagService.createVideoTag(tagsForm.getVideoId(), tagsForm.getTags());
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("video tags created")
                        .data(Map.of("tags", tagList))
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build(), HttpStatus.CREATED);
    }

    /**
     * get video tags
     * @param videoId the video id
     * @return the response
     */
    @GetMapping("video")
    public ResponseEntity<HttpResponse> getVideoTags(@RequestParam("id") Long videoId) {
        List<Tag> tagList = tagService.getByVideoId(videoId);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Video tags retrieved successfully.")
                        .data(Map.of("tags", tagList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * get tag list by name
     * @param name the name
     * @return the response
     */
    @GetMapping("name")
    public ResponseEntity<HttpResponse> getTagByName(@RequestParam("name") String name) {
        List<Tag> tagList = tagService.getByName(name);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Tags retrieved by name "+name+".")
                        .data(Map.of("tags", tagList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * delete all video tags
     * @param videoId the video id
     * @return the response
     */
    @DeleteMapping("video")
    public ResponseEntity<HttpResponse> deleteVideoTags(@RequestParam("id") Long videoId) {
        tagService.deleteVideoTags(videoId);//TODO: This should be called in the video layer
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Tags deleted successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * delete video tag by tag id
     * @param videoId the video id
     * @param tagId the tag id
     * @return the response
     */
    @DeleteMapping("video/tagId")
    public ResponseEntity<HttpResponse> deleteSingleVideoTag(@RequestParam("id") Long videoId, @RequestParam("tagId") Long tagId) {
        tagService.deleteVideoTagByTagId(videoId, tagId);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Tag deleted successfully")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
}
