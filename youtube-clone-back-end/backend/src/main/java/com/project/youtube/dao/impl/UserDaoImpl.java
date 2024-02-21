package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.UserDao;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import com.project.youtube.enumaration.VerificationType;
import com.project.youtube.form.UpdateUserForm;
import com.project.youtube.model.User;
import com.project.youtube.service.impl.RoleServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.*;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.enumaration.RoleType.ROLE_USER;
import static com.project.youtube.enumaration.VerificationType.ACCOUNT;
import static com.project.youtube.enumaration.VerificationType.PASSWORD;
import static com.project.youtube.query.UserQuery.*;
import static java.util.Objects.requireNonNull;
import static org.apache.commons.lang3.time.DateUtils.addDays;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UserDaoImpl implements UserDao<User> {
    private static final String DATE_FORMAT = "yyyy-MM-dd hh:mm:ss";//sql date format
    private final NamedParameterJdbcTemplate jdbcTemplate;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final RoleServiceImpl roleService;
    //@Autowired
    //private EmailService emailService;

    /**
     * Create user in database and send verification email
     * @param user
     * @return
     */
    @Override
    public User create(User user) { //consider putting all this logic outside this function
        log.info("Creating user: {}", user.getUsername());
        //check email is unique
        if(getEmailCount(user.getEmail().trim().toLowerCase()) > 0) throw new APIException("This email already exists. Please use a different email");
        //TODO: can add check for username here
        //save new user
        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();//get id of object that was saved in db
            SqlParameterSource parameters = getSqlParameterSource(user);
            jdbcTemplate.update(INSERT_USER_QUERY, parameters, keyHolder);
            user.setId(requireNonNull(keyHolder.getKey().longValue()));
            //add role to user
            roleService.adduserToRole(user.getId(), ROLE_USER.name());
            //send verification url
            String verificationUrl = getVerificationUrl(UUID.randomUUID().toString(), ACCOUNT.getType());
            //TODO:// save url in verification table
            jdbcTemplate.update(INSERT_ACCOUNT_VERIFICATION_URL_QUERY, Map.of("userId", user.getId(), "url", verificationUrl));//should be in a service layer
            //TODO: send email to user with verification url
            //emailService.sendEmail(user.getUsername(), user.getEmail(), verificationUrl, ACCOUNT.getType());
            user.setEnabled(false);
            user.setNonLocked(true);

            //return the newly created user
            return user;
            //if error throw exception with appropriate message
        }
        catch (DataAccessException exception) {
            throw new APIException("This username already exists.");
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
        try {
            return jdbcTemplate.queryForObject(SELECT_USER_BY_ID, Map.of("id", id), new BeanPropertyRowMapper<>(User.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not find user");
        } catch (Exception exception) {
            throw new APIException("An error occurred");
        }
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
     * get user by either email or username
     * @param username
     * @return
     */
    @Override
    public User getUser(String username) {
        try {
            List<User> userByUsername = getByUsername(username);
            List<User> userByEmail = getByEmail(username);
            if(!userByUsername.isEmpty()) {
                return userByUsername.get(0);
            }
            else if (!userByEmail.isEmpty()) {
                log.info("Could not find user by username. Checking by email: {}", username);
                return userByEmail.get(0);
            }
        } catch (Exception e) {
            log.error("Could not find user info for user: {}", username);
            throw new APIException("No user could be found for: "+username);
        }
        return null;
    }

    /**
     * get user by username
     * @param username String
     * @return List of users
     */
    @Override
    public List<User> getByUsername(String username) {
        log.info("Getting user for username: {}", username);
        return jdbcTemplate.query(SELECT_USER_BY_USERNAME_QUERY, Map.of("username", username), new BeanPropertyRowMapper<>(User.class));
    }

    /**
     * get user by email
     * @param email
     * @return
     */
    @Override
    public List<User> getByEmail(String email) {
        log.info("Getting user for email: {}", email);
        try {
            return jdbcTemplate.query(SELECT_USER_BY_EMAIL_QUERY, Map.of("email", email), new BeanPropertyRowMapper(User.class));
        } catch (Exception exception) {
            throw new APIException("An error occurred while retrieving your profile, please try again.");
        }
    }

    /**
     * save new verification code
     * @param userDTO
     */
    @Override
    public void sendVerificationCode(UserDTO userDTO) {
        String expirationDate = DateFormatUtils.format(addDays(new Date(), 1), DATE_FORMAT);
        String verificationCode = RandomStringUtils.randomNumeric(8).toUpperCase();

        deleteVerificationCode(userDTO);
        createVerificationCode(userDTO, verificationCode, expirationDate);
        log.info("generated user code verification code {}", verificationCode);
        //sendSms(userDTO.getPhone(), "From: YoutubeClone from Adam!! :) \nVerification code\n"+verificationCode); //TODO: uncomment to send through Twilio

    }

    @Override
    public void deleteVerificationCode(UserDTO userDTO) {
        try {
            jdbcTemplate.update(DELETE_VERIFICATION_CODE_BY_USER_ID_QUERY, Map.of("userId", userDTO.getId()));
        } catch (Exception e) {
            log.error("Could not delete verification Code for user: {}", userDTO.getUsername());
            throw new APIException("Could not delete verification verification code");
        }
    }

    /**
     * delete code by code
     * @param code
     */
    @Override
    public void deleteVerificationCodeByCode(String code) {
        try {
            jdbcTemplate.update(DELETE_VERIFICATION_CODE_BY_USER_ID_QUERY, Map.of("code", code));
        } catch (Exception e) {
            log.error("Could not delete verification Code for user: {}", code);
            throw new APIException("Could not delete verification verification code");
        }
    }

    /**
     * Creates a new verification code for user
     * @param userDTO userDTO object
     * @param verificationCode String randomAlphanumeric
     * @param expirationDate String expirationDate
     */
    @Override
    public void createVerificationCode(UserDTO userDTO, String verificationCode, String expirationDate) {
        try {
            jdbcTemplate.update(INSERT_VERIFICATION_CODE_QUERY, Map.of("userId", userDTO.getId(), "code", verificationCode, "expirationDate", expirationDate));
        } catch (Exception e) {
            log.error("Could not delete verification Code for user: {}", userDTO.getUsername());
            throw new APIException("Could not update verification Code for user");
        }
    }

    /**
     * Verify code provided for MFA
     * @param username
     * @param code
     * @return User
     */
    @Override
    public User verifyCode(String username, String code) {
        User userByUsername = getUser(username);
        Long userId = userByUsername.getId();
        if(isVerificationCodeExpired(code, userId)) {
            throw new APIException("This code has expired. Please login again.");
        }
        try {
            User userByCode = jdbcTemplate.queryForObject(SELECT_USER_BY_USER_CODE_QUERY, Map.of("userId", userId, "code", code), new BeanPropertyRowMapper<>(User.class));
            if(userByUsername.getUsername().trim().equalsIgnoreCase(userByCode.getUsername().trim())) {
                deleteVerificationCode(UserDTOMapper.toUserDTO(userByCode));
                return userByCode;
            } else {
                throw new APIException("The provided code is invalid, please try again.");
            }
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("No user can be found.");
        } catch (Exception exception) {
            throw new APIException("An error occurred. Please try again.");
        }
    }

    /**
     * returns true if user verification code has not expired
     * @param code provided code
     * @param userId user id
     * @return true if code expired
     */
    public Boolean isVerificationCodeExpired(String code, Long userId) {
        try {
            return jdbcTemplate.queryForObject(SELECT_EXPIRED_CODE_QUERY, Map.of("code", code, "userId", userId), Boolean.class);
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("could not find verification code record.");
        } catch (Exception exception) {
            throw new APIException("An error occurred with the provide code. Please try again.");
        }
    }

    @Override
    public void resetPassword(String email) {
        List<User> user = getByEmail(email.trim().toLowerCase());
        if(user.isEmpty()) { throw new APIException("This email does not exist"); }
        try {

            String expirationDate = DateFormatUtils.format(addDays(new Date(), 1), DATE_FORMAT);
            String verificationUrl = getVerificationUrl(UUID.randomUUID().toString(), PASSWORD.getType());//collision risk 1 in 2.7 quintillion
            deleteUserVerification(user.get(0));
            jdbcTemplate.update(INSERT_PASSWORD_VERIFICATION_BY_USER_ID_QUERY, Map.of("userId", user.get(0).getId(), "url", verificationUrl, "expirationDate", expirationDate));
            //TODO: send email to user
            log.info("Verification URL: {} ", verificationUrl);

        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }

    /**
     * Verify password key part of password reset provided by user
     * @param key password key
     * @return user
     */
    @Override
    public User verifyPasswordKey(String key) {
        if(isVerificationLinkExpired(key, PASSWORD)) { throw new APIException("This link has expired. Please try resetting your password again."); }
        try {
            User user = jdbcTemplate.queryForObject(SELECT_USER_BY_VERIFICATION_URL, Map.of("url", getVerificationUrl(key, PASSWORD.getType())), new BeanPropertyRowMapper<>(User.class));
            //deleteUserVerification(user);//depends
            return user;
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("This link is not valid. Please try resetting your password again");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try reset again.");
        }
    }

    /**
     * update user password and delete password reset link
     * @param key random uuid
     * @param password the password
     * @param confirmedPassword and the password confirmation
     */
    @Override
    public void updatePassword(String key, String password, String confirmedPassword) {
        if(!password.equals(confirmedPassword)) { throw new APIException("The passwords do not match. Please make sure the passwords are the same"); }
        try {
            String url = getVerificationUrl(key, PASSWORD.getType());
            jdbcTemplate.update(UPDATE_USER_PASSWORD_BY_URL_QUERY, Map.of("password", passwordEncoder.encode(password), "url", url));
            deleteUserVerificationByUrl(url);
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try reset again.");
        }
    }

    /**
     * Update account enabled status
     * @param key the UUID key
     * @return tne userDTO
     */
    @Override
    public User verifyAccountKey(String key) {
        try {
            User user = getUserByAccountVerificationUrl(key);
            jdbcTemplate.update(UPDATE_USER_ENABLED_BY_ID_QUERY, Map.of("enabled", true,"userId", user.getId()));
            return user;
        } catch (Exception exception) {
            throw new APIException("An Error occurred, please try again.");
        }
    }

    /**
     * Update the user profile
     * @param updateUserForm the user profile form for update
     */
    @Override
    public User updateProfile(UpdateUserForm updateUserForm, Long userId) {
        try {
            Map<String, ?> map = Map.of("username", updateUserForm.getUsername(), "channelName", updateUserForm.getChannelName(), "phone", updateUserForm.getPhone(), "description", updateUserForm.getDescription(), "usingMfa", updateUserForm.getUsingMfa(), "profilePicture", updateUserForm.getProfilePicture(), "userId", userId);
            jdbcTemplate.update(UPDATE_USER_METADATA_QUERY, map);
            return get(userId);
        } catch (ConstraintViolationException exception) {
            throw new APIException("The username, channel name must be unique");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }

    /**
     * Get user by its account verification url
     * @param key the random UUID string
     * @return the user
     */
    private User getUserByAccountVerificationUrl(String key) {
        String url = getVerificationUrl(key, ACCOUNT.getType());
        try {
            return jdbcTemplate.queryForObject(SELECT_USER_BY_ACCOUNT_VERIFICATION_URL_QUERY, Map.of("url", url), new BeanPropertyRowMapper<>(User.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("This account verification url is invalid.");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }

    /**
     * Delete the password reset link
     * @param url reset password url
     */
    private void deleteUserVerificationByUrl(String url) {
        try {
            jdbcTemplate.update(DELETE_PASSWORD_VERIFICATION_BY_URL_QUERY, Map.of("url", url));
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }

    /**
     * check if verification link expired
     * @param key the UUID random key
     * @param type the verification type
     * @return true if reset password link has expired
     */
    private Boolean isVerificationLinkExpired(String key, VerificationType type) {
        try {
            String url = getVerificationUrl(key, type.getType());
            log.info("Verification URL: {} [after]",url);
            return jdbcTemplate.queryForObject(SELECT_EXPIRED_PASSWORD_VERIFICATION_URL_QUERY, Map.of("url", url), Boolean.class);
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("This url is not valid. Please reset your password again.");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }

    private void deleteUserVerification(User user) {
        try {
            jdbcTemplate.update(DELETE_PASSWORD_VERIFICATION_BY_USER_ID_QUERY, Map.of("userId", user.getId()));
        } catch (DataAccessException exception) {
            throw new APIException("Could not delete user verification.");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
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
                .addValue("email", user.getEmail().trim().toLowerCase())
                .addValue("password", passwordEncoder.encode(user.getPassword()));
    }

    /**
     * constructs a URI string for a specific endpoint (/user/verify/) within the current servlet context path
     * @param key UUID
     * @param type ACCOUNT.type
     * @return String Uri
     */
    private String getVerificationUrl(String key, String type) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(API_VERSION + "user/verify/"+type)
                .queryParam("type", type)
                .queryParam("key", key)
                .toUriString();
    }

}
