package com.project.youtube.service;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.form.UpdateUserForm;
import com.project.youtube.model.User;
import com.project.youtube.model.UserPrincipal;

import java.util.List;


public interface UserService {
    UserDTO createUser(User user);
    UserDTO getUser(Long id);
    UserDTO getUser(String username);
    List<User> getByUsername(String username);
    List<User> getByEmail(String email);
    void sendVerificationCode(UserDTO userDTO);
    UserPrincipal getUserPrincipal(UserDTO userDTO);
    UserDTO verifyCode(String username, String code);
    void resetPassword(String email);
    UserDTO verifyPasswordKey(String key);
    void updatePassword(String key, String password, String confirmedPassword);
    UserDTO verifyAccountKey(String key);
    void updateProfile(UpdateUserForm updateUserForm, Long userId);
}
