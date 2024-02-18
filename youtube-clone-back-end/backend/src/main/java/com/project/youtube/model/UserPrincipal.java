package com.project.youtube.model;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.UserDTOMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
public class UserPrincipal implements UserDetails {
    private final User user;
    private final Set<Role> roles;

    /**
     * get a list of GrantedAuthority (permission) for Authentication object
     * @return list of GrantedAuthority
     * */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        log.info("Adding permissions set to user");
        List<GrantedAuthority> grantedAuthorities = roles.stream()
                .flatMap((role) -> Arrays.stream(role.getPermissions().split(","))
                        .map(permission -> new SimpleGrantedAuthority(permission.trim())))
                .collect(Collectors.toList());

        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public String getUsername() {
        return this.user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.user.getNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.user.getEnabled();
    }

    public UserDTO getUserDTO() {
        Role role = !this.roles.isEmpty() ? new ArrayList<>(this.roles).get(0) : null;
        return UserDTOMapper.toUserDTO(this.user, role);
    }
}
