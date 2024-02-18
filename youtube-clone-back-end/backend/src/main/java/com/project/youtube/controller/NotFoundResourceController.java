package com.project.youtube.controller;

import com.project.youtube.model.HttpResponse;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

@Controller
//@Order(Ordered.HIGHEST_PRECEDENCE)
//TODO: Fix the AuthenticationEntryPoint preventing to get this endpoint when anyRequest().authenticated() is enabled
public class NotFoundResourceController implements ErrorController {
    @RequestMapping("/error")
    public ResponseEntity<HttpResponse> pageNotFound(HttpServletRequest request) {
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .path(request.getRequestURI())
                        .reason("page was not found")
                        .developerMessage("Page was not found with method "+request.getMethod())
                        .status(HttpStatus.NOT_FOUND)
                        .statusCode(HttpStatus.NOT_FOUND.value())
                        .build());
    }

}
