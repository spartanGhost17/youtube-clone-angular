package com.project.youtube.service.impl;

import com.project.youtube.dao.UserDao;
import com.project.youtube.dao.impl.UserDaoImpl;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.model.User;
import com.project.youtube.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private UserDaoImpl userDaoImpl;
    //@Autowired
    //private UserRepository userRepository;

    @Override
    public UserDTO createUser(User user) {
        User createdUser = userDaoImpl.create(user);
        return UserDTOMapper.toUserDTO(createdUser);
    }
}
