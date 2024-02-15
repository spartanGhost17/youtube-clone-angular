package com.project.youtube.service;

import com.project.youtube.model.Role;

import java.util.List;
import java.util.Set;

public interface RoleService {
    void adduserToRole(Long userId, String roleName);
    Set<Role> getRoleByUserId(Long username);

    Set<Role> getRoleByUsername(String username);

    Set<Role> getRoleByUserEmail(String email);
    void updateUserRole(Long userId, String roleName);
}
