package com.project.youtube.dao;

import com.project.youtube.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface RoleDao<T extends Role> {
    /*Basic crud*/
    T create(T data);
    Collection<T> list(int page, int pagesize);
    T get(Long id);
    T update(T data);
    Boolean delete(Long id);

    /*extra ops*/
    void addRoleToUser(Long userId, String roleName);
    Role getRoleByUserId(Long userId);
    Role getRoleByUserEmail(String email);
    void updateUserRole(Long userId, String roleName);
}
