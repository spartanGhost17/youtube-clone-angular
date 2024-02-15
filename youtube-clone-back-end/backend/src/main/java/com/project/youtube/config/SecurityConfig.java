package com.project.youtube.config;

import com.project.youtube.constants.ApplicationConstants;
import com.project.youtube.handler.CustomAccessDeniedHandler;
import com.project.youtube.handler.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@Slf4j
public class SecurityConfig {
    private static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";
    @Autowired
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    @Autowired
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    @Autowired
    private final CustomAuthenticationProvider customAuthenticationProvider;
    //@Autowired
    private static final ApplicationConstants applicationConstants = new ApplicationConstants();
    private static final String API_VERSION = applicationConstants.getAPI_VERSION();
    private static final String[] PUBLIC_URLS = {API_VERSION+"user/login", API_VERSION+"user/register"};

    /**
     * registers authentication providers with the authentication manager
     *
     * @param http
     * @return AuthenticationManager
     * @throws Exception
     */
    @Bean(value = "authenticationManager")
    protected AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        log.info("setting up authenticationManager Bean");
        //Shared objects are reusable components that can be accessed across different parts of your security configuration.
        //These objects are typically configured once and then shared across various parts of your security setup.
        AuthenticationManagerBuilder managerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
        managerBuilder.authenticationProvider(customAuthenticationProvider);
        return managerBuilder.build();
    }

    @Bean(value = "csrfToken")
    public CsrfTokenRepository csrfTokenRepository() {
        CookieCsrfTokenRepository repository = new CookieCsrfTokenRepository();
        repository.setCookieName("_csrf");
        return repository;
    }

    /**
     * focuses on defining custom security configuration
     * with disabled csrf and no cors
     *
     * @param http
     * @return
     * @throws Exception
     */
    @Bean(value = "defaultSecurityFilterChain")
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {

        log.info("Inside defaultSecurityFilterChain");
        http.csrf().disable().cors().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeHttpRequests((request) -> {
            request
                    .antMatchers(PUBLIC_URLS).permitAll()
                    .antMatchers(HttpMethod.DELETE, API_VERSION+"user/delete/**").hasAnyAuthority("DELETE:USER")
                    .antMatchers(HttpMethod.DELETE, API_VERSION+"video/delete/**").hasAnyAuthority("DELETE:VIDEO")
                    .antMatchers(HttpMethod.DELETE, API_VERSION+"report/delete/**").hasAnyAuthority("DELETE:VIDEO", "DELETE:REPORT")
                    .anyRequest().authenticated();
        }).authenticationManager(authenticationManager);//specifies authenticationManager @Bean instance should be used during authentication

        http.exceptionHandling((exceptionConfig) -> {
            exceptionConfig
                    .accessDeniedHandler(customAccessDeniedHandler)
                    .authenticationEntryPoint(customAuthenticationEntryPoint);
        });
        return (SecurityFilterChain) http.build();
    }
}
