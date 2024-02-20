package com.project.youtube.controller;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.form.CreateUserForm;
import com.project.youtube.form.LoginForm;
import com.project.youtube.form.VerificationCodeForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.User;
import com.project.youtube.model.UserPrincipal;
import com.project.youtube.provider.TokenProvider;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.Map;

import static com.project.youtube.utils.ExceptionUtils.processError;

@RestController
@RequestMapping(value = "/api/v1/user/")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    @Autowired
    private final UserServiceImpl userServiceImpl;
    private final TokenProvider tokenProvider;
    @Autowired
    private final AuthenticationManager authenticationManager;
    private final HttpServletRequest request;
    private final HttpServletResponse response;

    @PostMapping(value = "register")
    public ResponseEntity<HttpResponse> createUser(@RequestBody @Valid CreateUserForm createUserForm) {
        User user = User.builder()
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
    @PostMapping(value = "login")
    public ResponseEntity<HttpResponse> login(@RequestBody @Valid LoginForm loginForm) {
        Authentication authentication = authenticate(loginForm.getUsername(), loginForm.getPassword());
        UserDTO userDTO = getAuthenticatedUser(authentication);
        return userDTO.getUsingMfa() ? sendVerificationCode(userDTO) : sendResponse(userDTO);
    }

    @GetMapping("verify/code")
    public ResponseEntity<HttpResponse> verifyCode(@RequestBody @Valid VerificationCodeForm codeForm) {
        UserDTO userDTO = userServiceImpl.verifyCode(codeForm.getUsername(), codeForm.getCode());
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("access_token", tokenProvider.createAccessToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "refresh_token", tokenProvider.createRefreshToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "user", userDTO
                        ))
                        .message("Code was verified")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }


    @GetMapping(value = "profile")
    public ResponseEntity<HttpResponse> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDTO userDTO = getAuthenticatedUser(authentication);//userServiceImpl.getUser(authentication.getName());
        return ResponseEntity.ok().body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("access_token", tokenProvider.createAccessToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "refresh_token", tokenProvider.createRefreshToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "user", userDTO
                        ))
                        .message("Profile retrieved")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    @GetMapping(value = "resetpassword/{email}")
    public ResponseEntity<HttpResponse> resetPassword(@PathVariable("email") String email) {
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userServiceImpl.resetPassword(email);//getAuthenticatedUser(authentication);// userServiceImpl.getUser(authentication.getName());
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
     * @param key the key UUID of password
     * @return the response
     */
    @GetMapping(value = "verify/password/{key}")
    public ResponseEntity<HttpResponse> verifyPasswordKey(@PathVariable("key") String key) {
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
     * get user DTO from context user principal
     * @param authentication authentication
     * @return the UserDTO
     */
    private UserDTO getAuthenticatedUser(Authentication authentication) {
        //((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserDTO(); //can just come from securityContext
        return ((UserPrincipal) authentication.getPrincipal()).getUserDTO();
    }

    /**
     * authenticates the credentials
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
     * @param userDTO the authenticated user
     * @return the response
     */
    private ResponseEntity<HttpResponse> sendResponse(UserDTO userDTO) {
        //give user accessToken & refreshToken
        return ResponseEntity.created(getUri()).body(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .data(Map.of("access_token", tokenProvider.createAccessToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "refresh_token", tokenProvider.createRefreshToken(userServiceImpl.getUserPrincipal(userDTO)),
                                "user", userDTO
                        ))
                        .message("Login success")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build());
    }

    /**
     * Send a verification code to the user with MFA enable
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
     * @return the URI
     */
    private URI getUri() {
        return URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/get/<userId>").toUriString());
    }
}
