package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.RoleDaoImpl;
import com.project.youtube.model.Role;
import com.project.youtube.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    @Autowired
    private final RoleDaoImpl roleDaoImpl;//should be impl
    @Override
    public void adduserToRole(Long userId, String roleName) {
        roleDaoImpl.addRoleToUser(userId, roleName);
    }

    @Override
    public Set<Role> getRoleByUserId(Long username) {
        return null;
    }

    @Override
    public Set<Role> getRoleByUsername(String username) {
        return roleDaoImpl.getRoleByUsername(username);
    }
    @Override
    public Set<Role> getRoleByUserEmail(String email) {
        return roleDaoImpl.getRoleByUserEmail(email);
    }
    @Override
    public void updateUserRole(Long userId, String roleName) {

    }
}
