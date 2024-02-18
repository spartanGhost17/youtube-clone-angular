package com.project.youtube.utils;


import com.auth0.jwt.exceptions.InvalidClaimException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.youtube.Exception.APIException;
import com.project.youtube.model.HttpResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.time.Instant;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Slf4j
public class ExceptionUtils {
    /**
     * process the error for UI response
     * @param request the servlet request
     * @param response the servlet response
     * @param exception the thrown exception
     */
    public static void processError(HttpServletRequest request, HttpServletResponse response, Exception exception) {
        //if exception is any of these
        HttpResponse httpResponse;
        request.getRequestURI();
        // || exception instanceof InvalidClaimException || exception instanceof TokenExpiredException (don't show this to users, exposing application's inner workings)
        if(exception instanceof APIException || exception instanceof BadCredentialsException || exception instanceof DisabledException || exception instanceof LockedException) {
            httpResponse = getHttpResponse(request, response, exception.getMessage(), HttpStatus.BAD_REQUEST);
            writeResponse(response, httpResponse);
        } else { //other errors just send internal server error
            httpResponse = getHttpResponse(request, response, exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
            writeResponse(response, httpResponse);
        }
        log.error(exception.getMessage());
    }

    /**
     * creates an HttpResponse object with all the relevant and prepare response status and content type
     * @param response the HttpServlet response
     * @param message the error message
     * @param status the
     * @return the http response
     */
    private static HttpResponse getHttpResponse(HttpServletRequest request, HttpServletResponse response, String message, HttpStatus status) {
        HttpResponse httpResponse = HttpResponse.builder()
                .timeStamp(Instant.now().toString())
                .path(request.getRequestURI())
                .reason(message)
                .status(status)
                .statusCode(status.value())
                .build();
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setStatus(status.value());
        return httpResponse;
    }

    /**
     * Write  HttpResponse object to response stream
     * @param response the servlet response
     * @param httpResponse the HttpResponse object
     */
    private static void writeResponse(HttpServletResponse response, HttpResponse httpResponse) {
        OutputStream outputStream = null;
        try {
            outputStream = response.getOutputStream();
            ObjectMapper mapper = new ObjectMapper();
            mapper.writeValue(outputStream, httpResponse);//converts(serializes) httpResponse to JSON and write it to the output stream response
            outputStream.flush();
            outputStream.close();//necessary?
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
