package com.project.youtube.controller;

import com.project.youtube.dto.CommentDto;
import com.project.youtube.form.CommentPageRequestForm;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.CommentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticatedUser;
import static com.project.youtube.utils.AuthenticationUtils.getAuthenticationFromContext;

@RestController
@RequestMapping(API_VERSION + "comment")
@RequiredArgsConstructor
public class CommentController {
    private final CommentServiceImpl commentService;

    /**
     * Post comment
     * @param createCommentForm the create comment form
     * @return the response
     */
    @PostMapping()
    public ResponseEntity<HttpResponse> postComment(@RequestBody @Valid CreateCommentForm createCommentForm) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        createCommentForm.setUserId(userId);
        commentService.create(createCommentForm);
        return new ResponseEntity(
                HttpResponse.builder()
                    .timeStamp(Instant.now().toString())
                    .message("Comment created")
                    .status(HttpStatus.CREATED)
                    .statusCode(HttpStatus.CREATED.value())
                    .build(), HttpStatus.CREATED);
    }

    /**
     * delete a comment
     * @param id the id
     * @return the response
     */
    @DeleteMapping()
    public ResponseEntity<HttpResponse> deleteComment(@RequestParam("id") Long id) {
        commentService.delete(id);
        return new ResponseEntity(
            HttpResponse.builder()
                .timeStamp(Instant.now().toString())
                .message("Comment deleted.")
                .status(HttpStatus.OK)
                .statusCode(HttpStatus.OK.value())
                .build(), HttpStatus.OK);
    }

    /**
     * update the comment
     * @param commentText the comment text
     * @param id the comment id
     * @return the response
     */
    @PatchMapping()
    public ResponseEntity<HttpResponse> updateComment(@RequestParam("text") String commentText, @RequestParam("id") Long id) {
        CommentDto comment = commentService.updateComment(commentText, id);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Comment updated successfully.")
                        .data(Map.of("comment", comment))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * get a page of comment
     * @param pageRequestForm the page request form
     * @return the response
     */
    @GetMapping()
    public ResponseEntity<HttpResponse> getComments(@RequestBody CommentPageRequestForm pageRequestForm) {
        List<CommentDto> commentList = commentService.getComments(pageRequestForm.getVideoId(), pageRequestForm.getPageSize(), pageRequestForm.getOffset(), pageRequestForm.getIsSubComment());
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Comments retrieved successfully.")
                        .data(Map.of("comments", commentList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

}
