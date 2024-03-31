package com.project.youtube.controller;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.service.impl.FeedServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RestController
@RequestMapping(value= API_VERSION + "feed/")
@RequiredArgsConstructor
@Slf4j
public class FeedController {

    private final FeedServiceImpl feedService;

    /**
     * get feed
     * @param pageSize the page size
     * @param offset the offset
     * @return the response
     */
    @GetMapping("default")
    public ResponseEntity<HttpResponse> getFeed(@RequestParam("pageSize") Long pageSize, @RequestParam("offset") Long offset) {
        List<UserDTO> videoByUserMetadata = feedService.getFeed(pageSize, offset);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Metadata successfully retrieved.")
                        .data(Map.of("feed", videoByUserMetadata))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }
}
