package com.project.youtube.service.impl;

import com.project.youtube.dao.UserDao;
import com.project.youtube.dao.impl.UserDaoImpl;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.model.Role;
import com.project.youtube.model.User;
import com.project.youtube.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Arrays;
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

    /**
     *
     * @param user
     * @return
     */
    @Override
    public UserDTO createUser(User user) {
        User createdUser = userDaoImpl.create(user);
        return UserDTOMapper.toUserDTO(createdUser);
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
            Set<Role> roles = roleService.getRoleByUserId(user.getId());
            /**List<Role> Authorities = roles.stream().flatMap((role) -> Arrays.stream(role.getPermissions().split(","))
                            .map(permission -> new Role()))
                    .collect(Collectors.toList());
            //List<Role> grantedAuthorities = roleService.roleToGrantedAuthority(roles).stream().map((role) -> new Role).collect(Collectors.toList());
            user.setGrantedAuthorities(grantedAuthorities);*/
            userDTO = UserDTOMapper.toUserDTO(user);
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

    @Override
    public void sendVerificationCode(UserDTO userDTO) {
        userDaoImpl.sendVerificationCode(userDTO);
    }
}
