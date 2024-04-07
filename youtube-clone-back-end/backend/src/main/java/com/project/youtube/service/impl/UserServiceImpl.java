package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.UserDaoImpl;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.form.UpdateUserForm;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private final UserDaoImpl userDaoImpl;
    @Autowired
    private final RoleServiceImpl roleService;
    private final FileUploadTestService fileUploadTestService;

    /**
     * create a user
     * @param user the user
     * @return the user dto
     */
    @Override
    public UserDTO createUser(User user) {
        log.info("Creating user {} ", user.getUsername());
        User createdUser = userDaoImpl.create(user);
        return mapToUserDTO(createdUser);
    }

    /**
     * get user by id
     * @param id the user id
     * @return the user dto
     */
    @Override
    public UserDTO getUser(Long id) {
        return mapToUserDTO(userDaoImpl.get(id));
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
            userDTO.setVideoCount(userDaoImpl.videoCount(userDTO.getId()));
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

    /**
     * get all subscriptions for user
     * @param userId
     * @return
     */
    @Override
    public List<UserDTO> getAllSubscriptions(Long userId) {
        log.info("user id {}", userId);
        userDaoImpl.getAllSubscriptions(userId).forEach(u -> log.info(" subbed to user {} ", u.getUsername()));
        return userDaoImpl.getAllSubscriptions(userId).stream().map(this::mapToUserDTO).collect(Collectors.toList());
    }

    /**
     * get subscribers for user id
     * @param userId the user id
     * @return the list of users
     */
    @Override
    public List<UserDTO> getSubscribers(Long userId) {
        return userDaoImpl.getSubscribers(userId).stream().map(this::mapToUserDTO).collect(Collectors.toList());
    }

    /**
     * unsubscribe
     * @param subscriptionId the user id to unsubscribe
     * @param userId the logged-in user id
     * @return
     */
    @Override
    public UserDTO unsubscribe(Long subscriptionId, Long userId) {
        return mapToUserDTO(userDaoImpl.unsubscribe(subscriptionId, userId));
    }

    /**
     * subscribe to a channel
     * @param subscriptionId the id of channel to subscribe to
     * @param subscriberId the logged-in user
     * @return the user being subscribed to
     */
    @Override
    public UserDTO subscribe(Long subscriptionId, Long subscriberId) {
        return mapToUserDTO(userDaoImpl.subscribe(subscriptionId, subscriberId));
    }

    /**
     * get subscribe to
     * @param subscriptionId
     * @param subscriberId
     * @return
     */
    @Override
    public List<UserDTO> getSubscribedTo(Long subscriptionId, Long subscriberId) {
        List<User> user = userDaoImpl.getSubscribedTo(subscriptionId, subscriberId);
        List<UserDTO> userDTOList = new ArrayList<>();
        user.forEach(u -> {
            userDTOList.add(mapToUserDTO(u));
        });
        return userDTOList;
    }

    /**
     * check if user is subscribed to the channel
     * @param subscriptionId the id of channel subscribed to
     * @param subscriberId the logged-in user
     * @return the user being subscribed to
     */
    @Override
    public UserDTO subscribedTo(Long subscriptionId, Long subscriberId) {
        return mapToUserDTO(userDaoImpl.subscribe(subscriptionId, subscriberId));
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

    /**
     * Update the user profile
     * @param updateUserForm the user profile form for update
     */
    @Override
    public UserDTO updateProfile(UpdateUserForm updateUserForm, Long userId) {
        userDaoImpl.updateProfile(updateUserForm, userId);
        User user = userDaoImpl.get(userId);
        return mapToUserDTO(user);
    }

    /**
     * Update the user profile image
     * @param userDTO the user
     * @param image the image file
     */
    @Override
    public void updateProfileImage(UserDTO userDTO, MultipartFile image) {
        userDaoImpl.updateProfileImage(userDTO, image);
    }

    /**
     * get the user profile image
     * @param url the image url
     * @return the byte array for the image
     */
    @Override
    public byte[] getProfileImage(String url) {
        log.info("getting user for image url {}",url);
        return fileUploadTestService.getProfileImage(url);//TODO: replace this amazonS3 service
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
