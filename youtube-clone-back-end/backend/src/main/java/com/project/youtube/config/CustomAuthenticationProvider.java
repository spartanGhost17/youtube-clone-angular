package com.project.youtube.config;

import com.project.youtube.model.Role;
import com.project.youtube.model.User;
import com.project.youtube.model.UserPrincipal;
import com.project.youtube.service.impl.RoleServiceImpl;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomAuthenticationProvider implements AuthenticationProvider {
    @Autowired
    private final RoleServiceImpl roleServiceImpl;
    @Autowired
    private final UserServiceImpl userService;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        log.info("Authenticating user {}: ", authentication.getName());
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();
        List<User> userByUsername = userService.getByUsername(username);
        List<User> userByEmail = userService.getByEmail(username);

        if (!userByUsername.isEmpty()) {
            if (passwordEncoder.matches(password, userByUsername.get(0).getPassword())) {
                Set<Role> role = roleServiceImpl.getRoleByUsername(username);
                return getAuthenticationToken(new UserPrincipal(userByUsername.get(0), role), password);
            } else {
                log.error("The password entered is invalid");
                throw new BadCredentialsException("please enter valid password");
            }
        } else if (!userByEmail.isEmpty()) {
            if (passwordEncoder.matches(password, userByEmail.get(0).getPassword())) {
                Set<Role> role = roleServiceImpl.getRoleByUserEmail(username);
                return getAuthenticationToken(new UserPrincipal(userByEmail.get(0), role), password);
            } else {
                log.error("The password entered is invalid");
                throw new BadCredentialsException("please enter valid password");
            }
        } else {
            log.error("User {} not found in database", username);
            throw new UsernameNotFoundException("please enter valid user");
        }
    }

    /**
     * Create UsernamePasswordAuthenticationToken with permissions
     * @param userPrincipal String
     * @param password
     * @return
     */
    public UsernamePasswordAuthenticationToken getAuthenticationToken(UserPrincipal userPrincipal, String password) {
        log.info("Getting Authentication Token for user : {}", userPrincipal.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userPrincipal.getUsername(), password, userPrincipal.getAuthorities());//make sure to add authorities list
        authenticationToken.eraseCredentials();
        return authenticationToken;
    }

    /**
     * true if authentication supports provided authentication object.
     * @param authentication
     * @return
     */
    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));//true if authentication supports provided authentication object. from abstract DAO authentication (AbstractUserDetailsAuthenticationProvider);
    }
}
