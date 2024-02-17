package com.project.youtube.dtomapper;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.Role;
import com.project.youtube.model.User;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;

@Component
public class UserDTOMapper {
    public static UserDTO toUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        BeanUtils.copyProperties(user, userDTO);//copies fields
        return userDTO;
    }

    public static UserDTO toUserDTO(User user, Role role) {
        UserDTO userDTO = new UserDTO();
        userDTO.setAuthorities(new ArrayList<>(Arrays.asList(role)));
        BeanUtils.copyProperties(user, userDTO);//copies fields
        return userDTO;
    }

    public static User toUser(UserDTO userDTO) {
        User user = new User();
        BeanUtils.copyProperties(userDTO, user);
        return user;
    }

}

