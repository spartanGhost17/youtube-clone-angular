package com.project.youtube.filter;

import com.project.youtube.provider.TokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static com.project.youtube.constants.ApplicationConstants.API_VERSION;
import static com.project.youtube.utils.ExceptionUtils.processError;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthorizationFilter extends OncePerRequestFilter {
    public static final String HTTP_OPTIONS_METHOD = "OPTIONS";
    private final TokenProvider tokenProvider;
    protected static final String TOKEN_KEY = "token";
    protected static final String USER_ID_KEY = "username";
    private static final String TOKEN_PREFIX = "Bearer ";
    private static final String[] PUBLIC_ROUTES = {API_VERSION + "/user/login", API_VERSION + "user/register", API_VERSION + "/user/verify/code", "/error", API_VERSION + "user/resetpassword/**", API_VERSION + "user/verify/password"};

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("filtering endpoint... ");
        try {
            Map<String, String> values = getRequestValues(request);
            String token = getRequestToken(request);
            if (tokenProvider.isTokenValid(values.get(USER_ID_KEY), token)) {
                List<GrantedAuthority> authorities = tokenProvider.getAuthorities(values.get(TOKEN_KEY));//token);
                //String username = tokenProvider.getSubject(token, request);
                String roleName = tokenProvider.getRoleName(token);
                Authentication authentication = tokenProvider.getAuthentication(Long.parseLong(values.get(USER_ID_KEY)), authorities, roleName, request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else { //if token is not valid, clear context
                SecurityContextHolder.clearContext();
            }
            filterChain.doFilter(request, response);
        } catch (Exception exception) {
            log.error(exception.getMessage());
            processError(request, response, exception);//process exceptions thrown by this process
        }
    }

    /**
     * get username and token values from request
     *
     * @param request servlet request
     * @return Map of username and token, key value pairs
     */
    private Map<String, String> getRequestValues(HttpServletRequest request) {
        return Map.of(USER_ID_KEY, String.valueOf(tokenProvider.getSubject(getRequestToken(request), request)),
                TOKEN_KEY, getRequestToken(request));
    }

    /**
     * get JWT token from request Authorization header without Bearer prefix
     *
     * @param request servlet request
     * @return string JWT token
     */
    private String getRequestToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(AUTHORIZATION))
                .filter((header) -> header.startsWith(TOKEN_PREFIX))
                .map((token) -> token.replace(TOKEN_PREFIX, StringUtils.EMPTY))
                .get();
    }

    /**
     * should not filter if header does not contain Authorization with Bearer prefix or preflight request OPTIONS or Path is public URI
     *
     * @param request current HTTP request
     * @return
     * @throws ServletException
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getHeader(AUTHORIZATION) == null || !request.getHeader(AUTHORIZATION).startsWith(TOKEN_PREFIX) ||
                request.getMethod().equalsIgnoreCase(HTTP_OPTIONS_METHOD) || Arrays.asList(PUBLIC_ROUTES).contains(request.getRequestURI());

    }


}
