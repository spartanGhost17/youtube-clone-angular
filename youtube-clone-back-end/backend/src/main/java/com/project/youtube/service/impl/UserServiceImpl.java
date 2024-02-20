package com.project.youtube.service.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.impl.UserDaoImpl;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.model.Role;
import com.project.youtube.model.User;
import com.project.youtube.model.UserPrincipal;
import com.project.youtube.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private final UserDaoImpl userDaoImpl;
    @Autowired
    private final RoleServiceImpl roleService;

    /**
     *
     * @param user
     * @return
     */
    @Override
    public UserDTO createUser(User user) {
        User createdUser = userDaoImpl.create(user);
        return mapToUserDTO(createdUser);
    }

    /**
     * return a user object fetched by either email or username
     * @param username principal username
     * @return User
     */
    @Override
    public UserDTO getUser(String username) {
        log.info("Get User information for user: {}", username);
        User user = userDaoImpl.getUser(username);
        UserDTO userDTO = null;
        if (user != null) {
            userDTO = mapToUserDTO(user);
        }
        return userDTO;
    }

    /**
     * get user by username
     * @param username principal username
     * @return List of Users
     */
    @Override
    public List<User> getByUsername(String username) {
        return userDaoImpl.getByUsername(username);
    }

    /**
     * get user by email
     * @param email principal email
     * @return list of users
     */
    @Override
    public List<User> getByEmail(String email) {
        return userDaoImpl.getByEmail(email);
    }

    /**
     * Send verification code to user for MFA
     * @param userDTO
     */
    @Override
    public void sendVerificationCode(UserDTO userDTO) {
        userDaoImpl.sendVerificationCode(userDTO);
    }

    /**
     * get a user principal from dto
     *
     * @param userDTO userDto
     * @return
     */
    @Override
    public UserPrincipal getUserPrincipal(UserDTO userDTO) {
        User user = mapToUser(getUser(userDTO.getUsername()));//is it necessary to call DB again for getUser? userDTO already has all necessary objects
        Set<Role> roles = roleService.getRoleByUserId(userDTO.getId());
        return new UserPrincipal(user, roles);
    }

    /**
     * Verify user code by username
     * @param username
     * @param code
     * @return UserDTO
     */
    @Override
    public UserDTO verifyCode(String username, String code) {
        return mapToUserDTO(userDaoImpl.verifyCode(username, code));
    }


    @Override
    public void resetPassword(String email) {
        userDaoImpl.resetPassword(email);
    }

    @Override
    public UserDTO verifyPasswordKey(String key) {
        return mapToUserDTO(userDaoImpl.verifyPasswordKey(key));
    }

    @Override
    public void updatePassword(String key, String password, String confirmedPassword) {
        userDaoImpl.updatePassword(key, password, confirmedPassword);
    }

    @Override
    public UserDTO verifyAccountKey(String key) {
        return mapToUserDTO(userDaoImpl.verifyAccountKey(key));
    }

    private UserDTO mapToUserDTO(User user) {
        List<Role> roleList = new ArrayList<>(roleService.getRoleByUserId(user.getId()));
        Role role = !roleList.isEmpty() ? roleList.get(0) : null;
        return UserDTOMapper.toUserDTO(user, role);
    }

    private User mapToUser(UserDTO userDTO) {
        return UserDTOMapper.toUser(userDTO);
    }
}
