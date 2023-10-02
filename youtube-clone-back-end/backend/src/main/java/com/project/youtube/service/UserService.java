package com.project.youtube.service;

import com.project.youtube.dto.UserDto;
import com.project.youtube.model.User;


public interface UserService {
    UserDto createUser(UserDto userDto);

    UserDto signIn(UserDto userDto);

    User getUserById(String userId);
}
