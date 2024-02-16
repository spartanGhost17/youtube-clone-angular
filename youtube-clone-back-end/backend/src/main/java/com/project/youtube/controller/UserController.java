package com.project.youtube.controller;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.form.LoginForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.User;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping(value="/api/v1/user/")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private final UserServiceImpl userServiceImpl;

    @PostMapping(value="register")
    public ResponseEntity<HttpResponse> createNewUser(@RequestBody @Valid User user) {
        UserDTO userDTO = userServiceImpl.createUser(user);
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("user created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build());
    }

    private URI getUri() {
        return URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/get/<userId>").toUriString());
    }

    @PostMapping(value="login")
    public ResponseEntity<HttpResponse> login(@RequestBody @Valid LoginForm loginForm) {
        UserDTO userDTO = userServiceImpl.getUser(loginForm.getUsername());
        return userDTO.getUsingMfa() ? sendVerificationCode(userDTO) : sendResponse(userDTO);
    }

    @DeleteMapping(value = "/delete")
    public String deleteTest(@RequestParam String value) {
        return "TEST TO DELETE";
    }

    private ResponseEntity<HttpResponse> sendResponse(UserDTO userDTO) {
        //give user accessToken & refreshToken
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Login success")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    private ResponseEntity<HttpResponse> sendVerificationCode(UserDTO userDTO) {
        userServiceImpl.sendVerificationCode(userDTO);
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Verification code sent")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }
}
