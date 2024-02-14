package com.project.youtube.service.impl;

import com.project.youtube.dao.RoleDao;
import com.project.youtube.dao.impl.RoleDaoImpl;
import com.project.youtube.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Component //is it necessary?
public class RoleServiceImpl implements RoleService {
    @Autowired
    private final RoleDaoImpl roleDaoImpl;//should be impl

    @Override
    public void adduserToRole(Long userId, String roleName) {
        roleDaoImpl.addRoleToUser(userId, roleName);
    }
}
