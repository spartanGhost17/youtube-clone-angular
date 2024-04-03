package com.project.youtube.controller;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.form.*;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.User;
import com.project.youtube.model.UserPrincipal;
import com.project.youtube.provider.TokenProvider;
import com.project.youtube.service.impl.RoleServiceImpl;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.constants.ApplicationConstants.AUTH_TOKEN_PREFIX;
import static com.project.youtube.utils.ExceptionUtils.processError;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RestController
@RequestMapping(value = API_VERSION + "user/")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    @Autowired
    private final UserServiceImpl userServiceImpl;
    private final RoleServiceImpl roleService;
    private final TokenProvider tokenProvider;
    @Autowired
    private final AuthenticationManager authenticationManager;
    private final HttpServletRequest request;
    private final HttpServletResponse response;

    /**
     * register a new user
     *
     * @param createUserForm the create user form
     * @return the response
     */
    @PostMapping(value = "register")
    public ResponseEntity<HttpResponse> createUser(@RequestBody @Valid CreateUserForm createUserForm) {
        User user = User.builder()
                .firstName(createUserForm.getFirstname())
                .lastName(createUserForm.getLastname())
                .username(createUserForm.getUsername())
                .email(createUserForm.getEmail())
                .password(createUserForm.getPassword())
                .build();
        UserDTO userDTO = userServiceImpl.createUser(user);
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("user created")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build());
    }

    /**
     * Enabled the user account after creation
     *
     * @param type the type (account or password)
     * @param key  the UUID random key
     * @return the response
     */
    @PostMapping(value = "verify/account")
    public ResponseEntity<HttpResponse> verifyAccount(@RequestParam("type") String type, @RequestParam("key") String key) {
        UserDTO userDTO = userServiceImpl.verifyAccountKey(key);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message(userDTO.getEnabled() ? "This account is already verified." : "Account has been verified.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * login a user
     *
     * @param loginForm the login form
     * @return the response
     */
    @PostMapping(value = "login")
    public ResponseEntity<HttpResponse> login(@RequestBody @Valid LoginForm loginForm) {
        Authentication authentication = authenticate(loginForm.getUsername(), loginForm.getPassword());
        UserDTO userDTO = getAuthenticatedUser(authentication);
        return userDTO.getUsingMfa() ? sendVerificationCode(userDTO) : sendResponse(userDTO);
    }

    /**
     * Verify 2-factor authentication code
     *
     * @param codeForm the code
     * @return the response
     */
    @GetMapping("verify/code")
    public ResponseEntity<HttpResponse> verifyCode(@RequestBody @Valid VerificationCodeForm codeForm) {
        UserDTO userDTO = userServiceImpl.verifyCode(codeForm.getUsername(), codeForm.getCode());
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .tokens(Map.of(
                                "access_token", tokenProvider.createAccessToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "refresh_token", tokenProvider.createRefreshToken(userServiceImpl.getUserPrincipal(userDTO))
                        ))
                        .message("Code was verified")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * Get a user's profile
     *
     * @return the response
     */
    @GetMapping(value = "profile")
    public ResponseEntity<HttpResponse> getProfile() {
        Authentication authentication = getAuthenticationFromContext();//SecurityContextHolder.getContext().getAuthentication();
        UserDTO userDTO = getAuthenticatedUser(authentication);//userServiceImpl.getUser(authentication.getName());
        UserDTO user = userServiceImpl.getUser(userDTO.getId());
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", user))
                        .message("Profile retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * Update user metadata like, username, description etc.
     *
     * @param updateUserForm the user update form
     * @return the response
     */
    @PatchMapping(value = "profile")
    public ResponseEntity<HttpResponse> updateProfile(@RequestBody @Valid UpdateUserForm updateUserForm) {
        Authentication authentication = getAuthenticationFromContext();
        UserDTO contextUserDTO = getAuthenticatedUser(authentication);
        UserDTO userDTO = userServiceImpl.updateProfile(updateUserForm, contextUserDTO.getId());
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Profile updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * get profile by username
     * @param username the username
     * @return the response
     */
    @GetMapping(value = "profile/id")
    public ResponseEntity<HttpResponse> getUserByUsername(@RequestParam("username") String username) {
        UserDTO userDTO = userServiceImpl.getUser(username);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Profile updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    /**
     * get profile by id
     * @param id the username
     * @return the response
     */
    @GetMapping(value = "profile/userId")
    public ResponseEntity<HttpResponse> getUserById(@RequestParam("id") Long id) {
        UserDTO userDTO = userServiceImpl.getUser(id);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Profile updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping(value = "isSubscribed")
    public ResponseEntity<HttpResponse> isSubscribed(@RequestParam("to") Long to, @RequestParam("subscriber") Long subscriber) {
        List<UserDTO> user = userServiceImpl.getSubscribedTo(to, subscriber);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", user))
                        .message("Profile updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    @GetMapping(value = "subscribe")
    public ResponseEntity<HttpResponse> subscribe(@RequestParam("to") Long subscriptionId) {
        Long userId =  getAuthenticatedUser(getAuthenticationFromContext()).getId();
        UserDTO userDTO = userServiceImpl.subscribe(subscriptionId, userId);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Profile updated")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build()
        );
    }

    // START RESET PASSWORD FLOW

    /**
     * Request password reset for email
     *
     * @param email the email
     * @return the response
     */
    @GetMapping(value = "reset/password")
    public ResponseEntity<HttpResponse> resetPassword(@RequestParam("email") String email) {
        userServiceImpl.resetPassword(email);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Email sent. Please check your email to reset your password")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * verifies the password key for resetting principal's password
     *
     * @param key the key UUID of password
     * @return the response
     */
    @PostMapping(value = "verify/password")
    public ResponseEntity<HttpResponse> verifyPasswordKey(@RequestParam("type") String type, @RequestParam("key") String key) {
        userServiceImpl.verifyPasswordKey(key);
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Please enter a new password.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * end of reset password update flow. Updates the user password
     *
     * @param key                   the key
     * @param updatePasswordForm    the form with password and confirmed password
     * @return the response
     */
    @PostMapping(value = "reset/password")
    public ResponseEntity<HttpResponse> resetPassword(@RequestParam("key") String key, @RequestBody @Valid UpdatePasswordForm updatePasswordForm) {
        userServiceImpl.updatePassword(key, updatePasswordForm.getPassword(), updatePasswordForm.getConfirmedPassword());
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Password reset successfully.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    // END OF RESET PASSWORD FLOW


    @GetMapping(value = "refresh/token")
    public ResponseEntity<HttpResponse> getRefreshToken(HttpServletRequest request) {
        if (isHeaderTokenValid(request)) {
            log.info("Refreshing user tokens");
            String token = request.getHeader(AUTHORIZATION).substring(AUTH_TOKEN_PREFIX.length());
            UserDTO userDTO = userServiceImpl.getUser(tokenProvider.getSubject(token, request));
            return new ResponseEntity(
                    HttpResponse.builder()
                            .timeStamp(Instant.now().toString())
                            .message("Token refreshed successfully.")
                            .tokens(Map.of("access_token", tokenProvider.createAccessToken(userServiceImpl.getUserPrincipal(userDTO)),
                                    "refresh_token", tokenProvider.createRefreshToken(userServiceImpl.getUserPrincipal(userDTO))
                            ))
                            .status(HttpStatus.OK)
                            .statusCode(HttpStatus.OK.value())
                            .build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(
                    HttpResponse.builder()
                            .timeStamp(Instant.now().toString())
                            .reason("The refresh token is invalid.")
                            .message("Something went wrong, Please login again.")
                            .status(HttpStatus.BAD_REQUEST)
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .build(), HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Update the user role
     * @param userId the user id
     * @param roleName the role name
     * @return the response
     */
    @PatchMapping(value = "update/role")
    public ResponseEntity<HttpResponse> updateUserRole(@RequestParam("userId") Long userId, @RequestParam("roleName") String roleName) {
        roleService.updateUserRole(userId, roleName);
        UserDTO userDTO = userServiceImpl.getUser(userId);
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Role updated successfully.")
                        .data(Map.of("user", userDTO))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * update user profile image
     * @param image the image
     * @return the
     */
    @PatchMapping(value = "update/image")
    public ResponseEntity<HttpResponse> updateProfileImage(@RequestParam("image") MultipartFile image) {
        UserDTO userDTO = getAuthenticatedUser(getAuthenticationFromContext());
        userServiceImpl.updateProfileImage(userDTO, image);
        log.info("old user id {} name {}", userDTO.getId(), userDTO.getUsername());
        UserDTO updatedUser = userServiceImpl.getUser(userDTO.getId());
        log.info("new user id {} name {}", updatedUser.getId(), updatedUser.getUsername());
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Profile image updated.")
                        .data(Map.of("user", updatedUser))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    /**
     * get user profile image
     * @param fileName the filename
     * @return the image byte array
     */
    @GetMapping(value = "image/{fileName}", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] getProfileImage(@PathVariable("fileName") String fileName) {
        return userServiceImpl.getProfileImage(fileName);

    }

    private boolean isHeaderTokenValid(HttpServletRequest request) { //TODO: consider making the refresh token part of the authorization filter
        String token = request.getHeader(AUTHORIZATION).substring(AUTH_TOKEN_PREFIX.length());
        return request.getHeader(AUTHORIZATION) != null && request.getHeader(AUTHORIZATION).startsWith(AUTH_TOKEN_PREFIX)
                && tokenProvider.isTokenValid(String.valueOf(tokenProvider.getSubject(token, request)), token);
    }

    /**
     * Get current authentication context
     * @return the Authentication
     */
    private Authentication getAuthenticationFromContext() { //TODO: consider moving this to a util class
        return SecurityContextHolder.getContext().getAuthentication();
    }

    /**
     * get user DTO from context user principal
     *
     * @param authentication authentication
     * @return the UserDTO
     */
    private UserDTO getAuthenticatedUser(Authentication authentication) { //TODO: consider moving this to a util class
        //((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserDTO(); //can just come from securityContext
        return ((UserPrincipal) authentication.getPrincipal()).getUserDTO();
    }

    /**
     * authenticates the credentials
     *
     * @param username the username to authenticate
     * @param password the password
     * @return the authentication
     */
    private Authentication authenticate(String username, String password) {
        Authentication authentication = null;
        try {
            authentication = authenticationManager.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(username, password));
            return authentication;
        } catch (Exception exception) {
            processError(request, response, exception);
            throw new APIException(exception.getMessage());
        }
    }

    /**
     * send access and refresh token to user without credentials
     *
     * @param userDTO the authenticated user
     * @return the response
     */
    private ResponseEntity<HttpResponse> sendResponse(UserDTO userDTO) {
        //give user accessToken & refreshToken
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .tokens(
                                Map.of("access_token", tokenProvider.createAccessToken(userServiceImpl.getUserPrincipal(userDTO)),
                                        "refresh_token", tokenProvider.createRefreshToken(userServiceImpl.getUserPrincipal(userDTO))
                                ))
                        .message("Login success")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * Send a verification code to the user with MFA enable
     *
     * @param userDTO the authenticated user
     * @return the response
     */
    private ResponseEntity<HttpResponse> sendVerificationCode(UserDTO userDTO) {
        userServiceImpl.sendVerificationCode(userDTO);
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("user", userDTO))
                        .message("Verification code sent")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * get URI of context
     *
     * @return the URI
     */
    private URI getUri() {
        return URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/get/<userId>").toUriString());
    }
}
