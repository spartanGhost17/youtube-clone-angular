package com.project.youtube.service;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.User;


public interface UserService {
    UserDTO createUser(User user);
}
