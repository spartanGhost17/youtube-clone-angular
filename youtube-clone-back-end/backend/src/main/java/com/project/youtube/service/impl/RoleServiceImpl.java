package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.RoleDaoImpl;
import com.project.youtube.model.Role;
import com.project.youtube.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoleServiceImpl implements RoleService {
    @Autowired
    private final RoleDaoImpl roleDaoImpl;
    @Override
    public void adduserToRole(Long userId, String roleName) {
        roleDaoImpl.addRoleToUser(userId, roleName);
    }

    @Override
    public Set<Role> getRoleByUserId(Long userId) {
        return roleDaoImpl.getRoleByUserId(userId);
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

    /**
     * converts permissions to granted authorities
     * @param roles
     * @return List of GrantedAuthority
     */
    @Override
    public List<GrantedAuthority> roleToGrantedAuthority(Set<Role> roles) {
        log.info("Adding permissions set to user");
        List<GrantedAuthority> grantedAuthorities = roles.stream()
                .flatMap((role) -> Arrays.stream(role.getPermissions().split(","))
                        .map(permission -> new SimpleGrantedAuthority(permission.trim())))
                .collect(Collectors.toList());

        return grantedAuthorities;
    }
}
