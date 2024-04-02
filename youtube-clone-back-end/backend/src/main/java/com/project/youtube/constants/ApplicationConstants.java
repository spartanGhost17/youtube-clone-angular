package com.project.youtube.constants;


public class ApplicationConstants {
    //public static final int PLAYLIST_MAXSIZE = 400;
    public static final String API_VERSION = "/api/v1/";
    public static final String TOKEN_ISSUER = "YoutubeClone";
    public static final String USER_VIDEO_MANAGEMENT_SERVICE = "Video management service";
    public static final String JWT_AUTHORITIES_KEY = "authorities";
    public static final String JWT_ROLE_KEY = "role";
    public static final long ACCESS_TOKEN_EXPIRATION_TIME = 2L * 24 * 60 * 60 * 1000;//30L * 60 * 1000;//30 minutes TODO: SET EXPIRATION TO 5 DAYS FOR TESTING, REMOVE THIS LATER
    public static final long REFRESH_TOKEN_EXPIRATION_TIME =  5L * 24 * 60 * 60 * 1000;//5 days //TODO:SET TO 30 SECONDS FOR TESTING 30_000;
    public static final String PUBLIC_KEY_PATH = "src/main/resources/rsa/rsa.public";
    public static final String PRIVATE_KEY_PATH = "src/main/resources/rsa/rsa.private";
    public static final String AUTH_TOKEN_PREFIX = "Bearer ";
    public static final String DEFAULT_VIDEO_TITLE = "Video title";
    public static final int PLAYLIST_MAX_SIZE = 4000;
    public static final String DEFAULT_VIDEO_VISIBILITY = "DRAFT";
    public static final String DEFAULT_PLAYLIST_VISIBILITY = "PUBLIC";
    public static final String[] DEFAULT_PLAYLISTS = {"Likes", "Watch Later", "History"};
    public static final String VIDEOS_DEFAULT_FOLDER = "/Downloads/videos";
    public static final String GIFS_DEFAULT_FOLDER = "/Downloads/gifs";
    public static final String PROFILE_IMAGES_DEFAULT_FOLDER = "/Downloads/images";
    public static final String BANNER_IMAGES_DEFAULT_FOLDER = "/Downloads/banners";
    public static final String VIDEO_THUMBNAILS_DEFAULT_FOLDER = "/Downloads/thumbnail";
    public static final String MANIFEST_NAME_MPD = "adaptive.mpd";
    public static final String MANIFEST_NAME_HLS = "adaptive.m3u8";
}
