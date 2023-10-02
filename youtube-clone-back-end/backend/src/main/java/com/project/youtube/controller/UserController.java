package com.project.youtube.controller;

import com.project.youtube.dto.UserDto;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/v1/user/")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserServiceImpl userServiceImpl;

    @PostMapping(value="signup")
    public UserDto createNewUser(@RequestBody UserDto userDto) {
        return userServiceImpl.createUser(userDto);
    }

    //@GetMapping(value="login")
    @PutMapping(value="playlist")
    public UserDto updatePlaylist() {
        return null;
    }

}
