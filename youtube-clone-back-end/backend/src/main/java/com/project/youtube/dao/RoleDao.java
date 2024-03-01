package com.project.youtube.dao;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.Role;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface RoleDao<T extends Role> {
    /*Basic crud*/
    T create(T data);
    List<T> getAll();
    T get(Long id);
    T update(T data);
    Boolean delete(Long id);

    Role getRoleByName(String name);
    /*extra ops*/
    void addRoleToUser(Long userId, String roleName);
    Set<Role> getRoleByUserId(Long userId);

    Set<Role> getRoleByUsername(String username);

    Set<Role> getRoleByUserEmail(String email);
    void updateUserRole(Long userId, String roleName);
}
