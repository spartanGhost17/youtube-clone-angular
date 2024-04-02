package com.project.youtube.dao;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.form.UpdateUserForm;
import com.project.youtube.model.User;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserDao<T extends User> {
    /*Basic crud*/
    T create(T data);
    Collection<T> list(int page, int pagesize);
    T get(Long id);
    T update(T data);
    Boolean delete(Long id);

    /*extra ops*/
    User getUser(String username);
    List<User> getByUsername(String username);
    List<User> getByEmail(String email);
    void sendVerificationCode(UserDTO userDTO);
    void deleteVerificationCode(UserDTO userDTO);
    void deleteVerificationCodeByCode(String code);
    void createVerificationCode(UserDTO userDTO, String verificationCode, String expirationDate);
    //void sendSMS(String phone, String s);
    User verifyCode(String username, String code); //TODO: Make return user DTO Instead of user
    Boolean isVerificationCodeExpired(String code, Long userId);
    void resetPassword(String email);
    User verifyPasswordKey(String key);
    void updatePassword(String key, String password, String confirmedPassword);
    User verifyAccountKey(String key);
    void updateProfile(UpdateUserForm updateUserForm, Long userId);
    void updateProfileImage(UserDTO userDTO, MultipartFile image);
}
