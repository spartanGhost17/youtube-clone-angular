package com.project.youtube.controller;


import com.project.youtube.form.LikeForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.LikeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import java.time.Instant;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticatedUser;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticationFromContext;

@RestController
@RequestMapping(API_VERSION + "like")
@RequiredArgsConstructor
public class LikeController {
    private final LikeServiceImpl likeService;

    /**
     * create a like entry
     * @param likeForm the like form
     * @return the response
     */
    @PostMapping()
    public ResponseEntity<HttpResponse> createLike(@RequestBody @Valid LikeForm likeForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        likeForm.setUserId(userId);
        likeService.create(likeForm);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        . message("Like created.")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build(), HttpStatus.CREATED);
    }

    @GetMapping("video")
    public ResponseEntity<HttpResponse> getLike(@RequestBody @Valid LikeForm likeForm) {
        return null;
    }

    /**
     * delete the like
     * @param likeForm the like form
     * @return the response
     */
    @DeleteMapping()
    public ResponseEntity<HttpResponse> deleteComment(@RequestBody @Valid LikeForm likeForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        likeForm.setUserId(userId);
        likeService.delete(likeForm);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Like removed.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
}
