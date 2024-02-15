package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.RoleDao;
import com.project.youtube.model.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.stream.Collectors;

import static com.project.youtube.enumaration.RoleType.ROLE_USER;
import static com.project.youtube.query.RoleQuery.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class RoleDaoImpl implements RoleDao<Role> {
    @Autowired
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public Role create(Role data) {
        return null;
    }

    @Override
    public Collection<Role> list(int page, int pagesize) {
        return null;
    }

    @Override
    public Role get(Long id) {
        return null;
    }

    @Override
    public Role update(Role data) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }
    @Override
    public Set<Role> getRoleByUserId(Long userId) {
        return null;
    }
    @Override
    public void addRoleToUser(Long userId, String roleName) {
        log.info("Adding role: {} to user id: {}", roleName, userId);
        try {
            Role role = jdbcTemplate.queryForObject(SELECT_ROLE_BY_NAME_QUERY, Map.of("name", roleName), BeanPropertyRowMapper.newInstance(Role.class));
            jdbcTemplate.update(INSERT_ROLE_TO_USER_QUERY, Map.of("userId", userId, "roleId", Objects.requireNonNull(role.getId())));
        }
        catch(EmptyResultDataAccessException exception) {
            log.error("Could not find role by name: {}", ROLE_USER.name());
            throw new APIException("No role found by name: "+ ROLE_USER.name());
        }
        catch(Exception exception) {
            throw new APIException("An error occurred. Please try again.");
        }
    }

    @Override
    public Set<Role> getRoleByUsername(String username) {
        try {
            return jdbcTemplate.query(SELECT_ROLE_BY_USERNAME_QUERY, Map.of("username", username), BeanPropertyRowMapper.newInstance(Role.class)).stream().collect(Collectors.toSet());
        } catch(Exception exception) {
            log.error("Could not find role by username: {}", username);
            throw new APIException("An error occurred. Please try again.");
        }
    }

    @Override
    public Set<Role> getRoleByUserEmail(String email) {
        try {
            return jdbcTemplate.query(SELECT_ROLE_BY_EMAIL_QUERY, Map.of("email", email), BeanPropertyRowMapper.newInstance(Role.class)).stream().collect(Collectors.toSet());
        } catch(Exception exception) {
            log.error("Could not find role by email: {}", email);
            throw new APIException("An error occurred. Please try again.");
        }
    }

    @Override
    public void updateUserRole(Long userId, String roleName) {

    }
}
