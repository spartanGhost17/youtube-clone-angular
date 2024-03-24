package com.project.youtube.config;

import com.project.youtube.controller.NotFoundResourceController;
import com.project.youtube.filter.AuthorizationFilter;
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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.NegatedRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

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
    private final AuthorizationFilter authorizationFilter;
    private final NotFoundResourceController notFoundResourceController;
    private static final String[] PUBLIC_URLS = { API_VERSION + "user/login/**", API_VERSION + "user/register/**", API_VERSION + "user/verify/code/**", "/error", API_VERSION+"user/reset/password/**",
            API_VERSION+"user/verify/password", API_VERSION+"user/verify/account", API_VERSION+"user/refresh/token", API_VERSION+"user/image/**", API_VERSION + "video/thumbnail/**" , API_VERSION + "video/watch"};

    /**
     * registers authentication providers with the authentication manager
     *
     * @param http
     * @return AuthenticationManager
     * @throws Exception
     */
    @Bean(value = "authenticationManager")
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
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
        http.csrf().disable()
                .cors((configure) -> configure.configurationSource(corsConfigurationSource()))//pass corsConfigurationSource @Bean
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling((exceptionConfig) -> {
                    exceptionConfig
                            .accessDeniedHandler(customAccessDeniedHandler)
                            //.defaultAuthenticationEntryPointFor(notFoundResourceController, new AntPathRequestMatcher("/error"))
                            .authenticationEntryPoint(customAuthenticationEntryPoint);
                })
                .authorizeHttpRequests((request) -> {
                    request
                            .antMatchers(PUBLIC_URLS).permitAll()
                            .antMatchers("/error").permitAll()
                            .antMatchers(HttpMethod.POST, API_VERSION + "report").hasAuthority("CREATE:REPORT")
                            .antMatchers(HttpMethod.GET, API_VERSION + "report/item").hasAuthority("READ:REPORT")
                            .antMatchers(HttpMethod.DELETE, API_VERSION + "report").hasAuthority("DELETE:REPORT")
                            .antMatchers(HttpMethod.DELETE, API_VERSION + "user/delete/**").hasAnyAuthority("DELETE:USER")
                            .antMatchers(HttpMethod.DELETE, API_VERSION + "video/delete/**").hasAnyAuthority("DELETE:VIDEO")
                            .antMatchers(HttpMethod.DELETE, API_VERSION + "report/delete/**").hasAnyAuthority("DELETE:VIDEO", "DELETE:REPORT")
                            .anyRequest().authenticated();
                })
                .addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class)
                //.addFilterBefore(new LoginAuthFilter(authenticationManager), UsernamePasswordAuthenticationFilter.class)
                .authenticationManager(authenticationManager);//specifies authenticationManager @Bean instance should be used during authentication
        return (SecurityFilterChain) http.build();
    }

    @Bean("corsConfigurationSource")
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "http://localhost:3000", "http://youtubeClone.org", "http://127.0.0.1:3306", "http://192.168.1.164", "http://192.168.1.216", "http://100.14.212.97:5000"));
        configuration.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin", "Content-Type",
                "Accept", "Jwt-Token", "Authorization", "Origin", "Accept", "X-Requested-With",
                "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        configuration.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Jwt-Token", "Authorization",
                "Access-Control-Allow-Origin", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials", "File-Name", "Content-Range"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
