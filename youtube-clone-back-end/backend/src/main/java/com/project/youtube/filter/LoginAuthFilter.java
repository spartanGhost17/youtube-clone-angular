package com.project.youtube.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.youtube.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;


@Slf4j
//@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
@RequiredArgsConstructor
public class LoginAuthFilter {//extends OncePerRequestFilter{//, UsernamePasswordAuthenticationFilter {
    /*private AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    public LoginAuthFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("ATTEMPTING AUTHENTICATION IN FILTER ");

        if (shouldNotFilter(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        if (!(request instanceof ContentCachingRequestWrapper)) {
            request = new ContentCachingRequestWrapper((HttpServletRequest) request);
        }
        // Get the request body as a BufferedReader
        BufferedReader reader = request.getReader();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
        }
        String requestBody = stringBuilder.toString();
        try {
            User user = objectMapper.readValue(requestBody, User.class);
            System.out.println(user.getUsername());
            System.out.println(user.getPassword());
            // Create authentication token
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    user.getUsername(), user.getPassword());
            //authRequest.setDetails(new WebAuthenticationDetailsSource().buildDetails(requestWrapper));
            Authentication authentication = authenticationManager.authenticate(authToken);
            // Set the authentication in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (IOException e) {
            System.out.println("JACKSON ERROR");
            throw e;
        }
        //filterChain.doFilter(request, response);
    }
    @Override //only do at login
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return !request.getServletPath().equals(API_VERSION+"user/login");
    }*/
}