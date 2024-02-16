package com.project.youtube.constants;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


public class ApplicationConstants {
    public static final int PLAYLIST_MAXSIZE = 400;
    public static final String API_VERSION = "/api/v1/";
    public static final String TOKEN_ISSUER = "";
    public static final String USER_VIDEO_MANAGEMENT_SERVICE = "";
    public static final String JWT_AUTHORITIES_KEY = "authorities";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = 5L * 24 * 60 * 60 * 1000;
    public static final long REFRESH_TOKEN_EXPIRATION_TIME = 30L * 60 * 1000;
}
