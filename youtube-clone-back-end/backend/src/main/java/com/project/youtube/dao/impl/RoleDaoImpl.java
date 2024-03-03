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

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
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
    public List<Role> getAll() {
        try {
            return jdbcTemplate.query(SELECT_ALL_ROLES, new BeanPropertyRowMapper<>(Role.class));
        } catch (Exception exception) {
            throw exception;
        }
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
        try {
            return jdbcTemplate.query(SELECT_ROLE_BY_USER_ID_QUERY, Map.of("userId", userId), BeanPropertyRowMapper.newInstance(Role.class)).stream().collect(Collectors.toSet());
        } catch(Exception exception) {
            log.error("Could not find role by Id: {}", userId);
            throw new APIException("An error occurred. Please try again.");
        }
    }
    @Override
    public void addRoleToUser(Long userId, String roleName) {
        log.info("Adding role: {} to user id: {}", roleName, userId);
        try {
            Role role = getRoleByName(roleName);
            jdbcTemplate.update(INSERT_ROLE_TO_USER_QUERY, Map.of("userId", userId, "roleId", Objects.requireNonNull(role.getId())));
        } catch(Exception exception) {
            throw new APIException("An error occurred. Please try again.");
        }
    }

    /**
     * Get role by role name
     * @param roleName the role name
     * @return the role
     */
    @Override
    public Role getRoleByName(String roleName) {
        log.info("Fetching role: {}", roleName);
        try {
            return jdbcTemplate.queryForObject(SELECT_ROLE_BY_NAME_QUERY, Map.of("name", roleName), BeanPropertyRowMapper.newInstance(Role.class));
        } catch(EmptyResultDataAccessException exception) {
            log.error("Could not find role by name: {}", ROLE_USER.name());
            throw new APIException("No role found by name: "+ ROLE_USER.name());
        } catch(Exception exception) {
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

    /**
     * Update user role
     * @param userId the user id
     * @param roleName the role name
     */
    @Override
    public void updateUserRole(Long userId, String roleName) {
        try {
            Role role = getRoleByName(roleName);
            log.info("role: {} name: {} for user id {}", role.getId(), role.getName(), userId);
            jdbcTemplate.update(UPDATE_ROLE_BY_USER_ID, Map.of("userId", userId, "roleId", role.getId()));
        } catch (Exception exception) {
            log.error("Could not update user role");
            throw new APIException("An error occurred. Please try again.");
        }
    }
}
