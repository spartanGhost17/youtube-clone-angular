package com.project.youtube.config;

import com.project.youtube.dao.impl.UserDaoImpl;
import com.project.youtube.model.Authority;
import com.project.youtube.model.Role;
import com.project.youtube.model.User;
import com.project.youtube.service.impl.RoleServiceImpl;
import com.project.youtube.service.impl.UserServiceImpl;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@Slf4j
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private static UserServiceImpl userService;
    @Autowired
    private static RoleServiceImpl roleServiceImpl;
    @Autowired
    PasswordEncoder passwordEncoder;

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
                return getAuthenticationToken(username, password, userByUsername.get(0), role);
            } else {
                throw new BadCredentialsException("please enter valid password");
            }
        } else if (!userByEmail.isEmpty()) {
            if (passwordEncoder.matches(password, userByEmail.get(0).getPassword())) {
                Set<Role> role = roleServiceImpl.getRoleByUserEmail(username);
                return getAuthenticationToken(username, password, userByEmail.get(0), role);
            } else {
                throw new BadCredentialsException("please enter valid password");
            }
        } else {
            throw new BadCredentialsException("please enter valid user");
        }
    }

    /**
     * Create UsernamePasswordAuthenticationToken with permissions
     *
     * @param username String
     * @param password
     * @param user
     * @param role
     * @return
     */
    public UsernamePasswordAuthenticationToken getAuthenticationToken(String username, String password, User user, Set<Role> role) {
        log.info("Getting Authentication Token for user {}: ", username);
        if (passwordEncoder.matches(password, user.getPassword())) {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password, getGrantedAuthorities(role));//make sure to add authorities list
            authenticationToken.eraseCredentials();
            return authenticationToken;
        } else {
            throw new BadCredentialsException("please enter valid password");
        }
    }

    /**
     * get a list of GrantedAuthority (permission) for Authentication object
     *
     * @param roles Set
     * @return list of GrantedAuthority
     */
    private List<GrantedAuthority> getGrantedAuthorities(Set<Role> roles) {
        log.info("Adding permissions set to user");
        List<GrantedAuthority> grantedAuthorities = roles.stream()
                        .flatMap((role) -> Arrays.stream(role.getPermissions().split(","))
                        .map(permission -> new SimpleGrantedAuthority(permission.trim())))
                        .collect(Collectors.toList());

        return grantedAuthorities;
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
