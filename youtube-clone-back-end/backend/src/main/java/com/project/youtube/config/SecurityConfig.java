package com.project.youtube.config;

import com.project.youtube.handler.CustomAccessDeniedHandler;
import com.project.youtube.handler.CustomAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc //why here?
@RequiredArgsConstructor
public class SecurityConfig  {
    private static final String DEFAULT_CSRF_PARAMETER_NAME = "_csrf";
    private static final int STRENGTH = 12; //can pass this to BCRYPT

    @Autowired
    private final CustomAccessDeniedHandler customAccessDeniedHandler;
    @Autowired
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private static final String[] PUBLIC_URLS = {"/user/register/**"};//(String[]) Collections.singletonList("").stream().toArray();//just use {}

    @Bean(value = "passwordEncoder")
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
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
    public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests((request) -> {
            request
                    .antMatchers(PUBLIC_URLS).permitAll()
                    .antMatchers(HttpMethod.DELETE, "/user/delete/**").hasAnyAuthority("DELETE:USER")
                    .antMatchers(HttpMethod.DELETE, "/video/delete/**").hasAnyAuthority("DELETE:VIDEO")
                    .antMatchers(HttpMethod.DELETE, "/report/delete/**").hasAnyAuthority("DELETE:VIDEO","DELETE:REPORT")
                    .anyRequest().authenticated();
        });
        http.exceptionHandling((exceptionConfig) -> {
            exceptionConfig
                    .accessDeniedHandler(customAccessDeniedHandler)
                    .authenticationEntryPoint(customAuthenticationEntryPoint);
        });
        //http.authorizeRequests().anyRequest().authenticated();
        return (SecurityFilterChain) http.build();
    }

}
