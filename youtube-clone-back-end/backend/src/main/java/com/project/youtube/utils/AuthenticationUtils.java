package com.project.youtube.utils;

import com.project.youtube.dto.UserDTO;
import com.project.youtube.model.UserPrincipal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class AuthenticationUtils {
    /**
     * Get current authentication context
     * @return the Authentication
     */
    public static Authentication getAuthenticationFromContext() { //TODO: consider moving this to a util class
        return SecurityContextHolder.getContext().getAuthentication();
    }

    /**
     * get user DTO from context user principal
     *
     * @param authentication authentication
     * @return the UserDTO
     */
    public static UserDTO getAuthenticatedUser(Authentication authentication) { //TODO: consider moving this to a util class
        //((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUserDTO(); //can just come from securityContext
        return ((UserPrincipal) authentication.getPrincipal()).getUserDTO();
    }

}
