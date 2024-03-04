package com.project.youtube.controller;

import com.project.youtube.model.Category;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.CategoriesServiceImpl;
import lombok.RequiredArgsConstructor;
import org.joda.time.Instant;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RestController
@RequestMapping(API_VERSION + "category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoriesServiceImpl categoriesService;

    /**
     * get all categories
     * @return the response
     */
    @GetMapping()
    public ResponseEntity<HttpResponse> getAllCategories() {
        List<Category> categories = categoriesService.getAll();
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(new Instant().toString())
                        .message("Categories retrieved.")
                        .data(Map.of("category", categories))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * Assign a video category to a specific video
     * @param videoId the video id
     * @param categoryId the category id
     * @return the response
     */
    @PostMapping()
    public ResponseEntity<HttpResponse> assignCategoryToVideo(@RequestParam("videoId") Long videoId, @RequestParam("categoryId") Long categoryId) {
        categoriesService.addCategoryToVideo(videoId, categoryId);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(new Instant().toString())
                        .message("Category successfully added to video.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
}
