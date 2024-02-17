package com.project.youtube.handler;

import com.project.youtube.Exception.APIException;
import com.project.youtube.model.HttpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.time.Instant;

@ControllerAdvice
public class APIExceptionHandler {
    @ExceptionHandler (APIException.class)
    public ResponseEntity<HttpResponse> handleAPIException(APIException exception) {
        return ResponseEntity
                .internalServerError()
                .body(HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .reason("Something went bad")
                        .message(exception.getMessage())
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .build());
    }
}
