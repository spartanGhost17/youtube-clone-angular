package com.project.youtube.service;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.form.UpdateUserForm;
import com.project.youtube.model.User;
import com.project.youtube.model.UserPrincipal;
import org.springframework.web.multipart.MultipartFile;

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
    UserDTO unsubscribe(Long subscriptionId, Long userId);
    UserDTO subscribe(Long subscriptionId, Long subscriberId);
    List<UserDTO> getSubscribedTo(Long subscriptionId, Long subscriberId);
    UserDTO subscribedTo(Long subscriptionId, Long subscriberId);
    void resetPassword(String email);
    UserDTO verifyPasswordKey(String key);
    void updatePassword(String key, String password, String confirmedPassword);
    UserDTO verifyAccountKey(String key);
    UserDTO updateProfile(UpdateUserForm updateUserForm, Long userId);
    void updateProfileImage(UserDTO userDTO, MultipartFile image);
    byte[] getProfileImage(String url);
}
