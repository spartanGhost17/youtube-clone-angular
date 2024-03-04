package com.project.youtube.constants;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


public class ApplicationConstants {
    public static final int PLAYLIST_MAXSIZE = 400;
    public static final String API_VERSION = "/api/v1/";
    public static final String TOKEN_ISSUER = "YoutubeClone";
    public static final String USER_VIDEO_MANAGEMENT_SERVICE = "Video management service";
    public static final String JWT_AUTHORITIES_KEY = "authorities";
    public static final String JWT_ROLE_KEY = "role";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = 5L * 24 * 60 * 60 * 1000;//30L * 60 * 1000;//30 minutes TODO: SET EXPIRATION TO 5 DAYS FOR TESTING, REMOVE THIS LATER
    public static final long REFRESH_TOKEN_EXPIRATION_TIME =  5L * 24 * 60 * 60 * 1000;//5 days //TODO:SET TO 30 SECONDS FOR TESTING 30_000;
    public static final String PUBLIC_KEY_PATH = "src/main/resources/rsa/rsa.public";
    public static final String PRIVATE_KEY_PATH = "src/main/resources/rsa/rsa.private";
    public static final String AUTH_TOKEN_PREFIX = "Bearer ";
    public static final String DEFAULT_VIDEO_TITLE = "Video title";
}
