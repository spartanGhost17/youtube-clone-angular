package com.project.youtube.handler;

import com.project.youtube.Exception.APIException;
import com.project.youtube.model.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.Instant;

@ControllerAdvice
public class APIExceptionHandler {
    @ExceptionHandler (APIException.class)
    public ResponseEntity<HttpResponse> handleAPIException(APIException exception) {
        HttpResponse httpResponse = HttpResponse.builder()
                .timeStamp(Instant.now().toString())
                .reason("Something went bad")
                .message(exception.getMessage())
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .build();
        return ResponseEntity
                .internalServerError()
                .body(httpResponse);
    }
}
