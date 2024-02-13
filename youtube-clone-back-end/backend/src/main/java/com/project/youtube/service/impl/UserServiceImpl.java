package com.project.youtube.service.impl;

import com.project.youtube.dto.UserDto;
import com.project.youtube.model.User;
import com.project.youtube.repository.UserRepository;
import com.project.youtube.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.NoSuchElementException;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Component
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    //@Autowired
    //private UserRepository userRepository;

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setUserName(userDto.getUserName());
        user.setEmailAddress(userDto.getEmailAddress());

        //var savedUser = userRepository.save(user);
        var savedUser = new User();
        return new UserDto(savedUser.getId(), user.getFirstName(), user.getLastName(), user.getUserName(),null, null, null, null, null, null, null, null);
    }

    @Override
    public UserDto signIn(UserDto userDto) {
        return null;
    }

    @Override
    public User getUserById(String UserId) {
        LOGGER.info("Entering getVideoById");
        LOGGER.info("Getting video for video id : "+UserId);
        return null;/*userRepository.findById(UserId)
                .orElseThrow(() -> {
                    LOGGER.error("Cannot retreive video by id:" + UserId);
                    return new NoSuchElementException("Cannot retreive video by id: " + UserId);
                });*/
    }

}
