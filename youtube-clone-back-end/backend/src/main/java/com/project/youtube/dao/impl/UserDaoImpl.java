package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.RoleDao;
import com.project.youtube.dao.UserDao;
import com.project.youtube.model.Role;
import com.project.youtube.model.User;
import com.project.youtube.service.impl.RoleServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Collection;
import java.util.Map;
import java.util.UUID;

import static com.project.youtube.enumaration.RoleType.ROLE_USER;
import static com.project.youtube.enumaration.VerificationType.ACCOUNT;
import static com.project.youtube.query.UserQuery.*;
import static java.util.Objects.requireNonNull;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UserDaoImpl implements UserDao<User> {
    private final NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final RoleServiceImpl roleService;
    //@Autowired
    //private EmailService emailService;

    @Override
    public User create(User user) {
        log.info("Creating user: {}", user.getUsername());
        //check email is unique
        if(getEmailCount(user.getEmail().trim().toLowerCase()) > 0) throw new APIException("This email already exists. Please use a different email");
        //save new user
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();//get id of object that was saved in db
            SqlParameterSource parameters = getSqlParameterSource(user);
            jdbcTemplate.update(INSERT_USER_QUERY, parameters, keyHolder);
            user.setId(requireNonNull(keyHolder.getKey().longValue()));
            //add role to user
                //roleDao.addRoleToUser(user.getId(), ROLE_USER.name());
            roleService.adduserToRole(user.getId(), ROLE_USER.name());
            //send verification url
            String verificationUrl = getVerificationUrl(UUID.randomUUID().toString(), ACCOUNT.getType());
            //save url in verification table
            jdbcTemplate.update(INSERT_ACCOUNT_VERIFICATION_URL_QUERY, Map.of("userId", user.getId(), "url", verificationUrl));//should be in a service layer
            //send email to user with verification url
            //emailService.sendEmail(user.getUsername(), user.getEmail(), verificationUrl, ACCOUNT.getType());
            user.setEnabled(false);
            user.setIsNotLocked(true);
            //log.info("leaving user");

            //return the newly created user
            return user;
            //if error throw exception with appropriate message
        }
        catch(Exception exception) {
            throw new APIException("An error occurred. Please try again.");
        }
    }

    @Override
    public Collection list(int page, int pagesize) {
        return null;
    }

    @Override
    public User get(Long id) {
        return null;
    }

    @Override
    public User update(User data) {
        return null;
    }

    @Override
    public Boolean delete(Long id) {
        return null;
    }

    /**
     * Check email is user
     * @param email String email
     * @return Integer email count
     */
    private Integer getEmailCount(String email) {
        return jdbcTemplate.queryForObject(COUNT_USER_EMAIL_QUERY, Map.of("email", email), Integer.class);
    }

    /**
     * get user sql parameters map
     * @param user user
     * @return SqlParameterSource
     */
    private SqlParameterSource getSqlParameterSource(User user) {
        return new MapSqlParameterSource()
                .addValue("username", user.getUsername())
                .addValue("channelName", user.getUsername())
                .addValue("email", user.getEmail())
                .addValue("password", passwordEncoder.encode(user.getPassword()));
    }

    /**
     * constructs a URI string for a specific endpoint (/user/verify/) within the current servlet context path
     * @param key UUID
     * @param type ACCOUNT.type
     * @return String Uri
     */
    private String getVerificationUrl(String key, String type) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/verifiy/"+ type +"/"+ key).toUriString();
    }

}