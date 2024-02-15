package com.project.youtube.service;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.User;

import java.util.List;


public interface UserService {
    UserDTO createUser(User user);
    UserDTO getUser(String username);
    List<User> getByUsername(String username);
    List<User> getByEmail(String email);
}
