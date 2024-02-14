package com.project.youtube.controller;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.User;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    private UserServiceImpl userServiceImpl;

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
                        .build()
        );
    }

    private URI getUri() {
        return URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/get/<userId>").toUriString());
    }
    /*public UserDTO createNewUser(@RequestBody UserDTO userDTO) {
        return userServiceImpl.createUser(UserDTOMapper.toUser(userDTO));
    }*/

    //@GetMapping(value="login")
    /*@PutMapping(value="playlist")
    public UserDTO updatePlaylist() {
        return null;
    }*/

}
