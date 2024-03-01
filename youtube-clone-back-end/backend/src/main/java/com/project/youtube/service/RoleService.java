package com.project.youtube.service;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.List;
import java.util.Set;

public interface RoleService {
    void adduserToRole(Long userId, String roleName);

    List<Role> getRoles();
    Set<Role> getRoleByUserId(Long username);

    Set<Role> getRoleByUsername(String username);

    Set<Role> getRoleByUserEmail(String email);
    void updateUserRole(Long userId, String roleName);
    List<GrantedAuthority> roleToGrantedAuthority(Set<Role> roles);
}
