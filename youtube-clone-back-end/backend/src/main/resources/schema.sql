####################################################################
###                                                             ####
### Author: SpartanGhost17                                      ####
### License:  MIT                                               ####
### Date: February 13th, 2024                                   ####
### Version: 1.0                                                ####
###                                                             ####
####################################################################

/*
 * --- General Rules ---
 * Use underscore_names instead of camelCase
 * Table names should be plural
 * Spell out id fields (item_id instead of id)
 * Don't use ambiguous column names
 * Name foreign key columns the same as the columns they refer to
 * Use caps for all SQL queries
 */

CREATE SCHEMA IF NOT EXISTS youtube;
SET NAMES 'UTF8MB4';
SET TIME_ZONE = 'Europe/London';

USE youtube;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(255) NOT NULL,
    channel_name    VARCHAR(255) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    password        VARCHAR(255) DEFAULT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified        BOOLEAN DEFAULT FALSE,
    description     VARCHAR(255) DEFAULT NULL,
    enabled         BOOLEAN DEFAULT FALSE,
    non_locked      BOOLEAN DEFAULT TRUE,
    using_mfa       BOOLEAN DEFAULT FALSE,
    profile_picture VARCHAR(255) DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    CONSTRAINT UQ_Users_Username UNIQUE (username),
    CONSTRAINT UQ_Users_Channel_Name UNIQUE (channel_name),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
);

DROP TABLE IF EXISTS Roles;

CREATE TABLE Roles
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    permissions     VARCHAR(255) NOT NULL,
    CONSTRAINT UQ_Roles_Name UNIQUE (name)
);

DROP TABLE IF EXISTS UserRoles;

CREATE TABLE UserRoles
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    role_id         BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE, --on user_id updated or delete cascade action
    FOREIGN KEY (role_id) REFERENCES Roles (id) ON DELETE RESTRICT ON UPDATE CASCADE, --on DELETE prevent from delete active role
    CONSTRAINT UQ_UserRoles_User_Id UNIQUE (user_id)
);

DROP TABLE IF EXISTS Events;

CREATE TABLE Events
(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type        VARCHAR(255) NOT NULL CHECK(type IN ('LOGIN_ATTEMPT', 'LOGIN_ATTEMPT_FAILURE', 'LOGIN_ATTEMPT_SUCCESS', 'PROFILE_UPDATE', 'PROFILE_PICTURE_UPDATE', 'ROLE_UPDATE', 'ACCOUNT_SETTINGS_UPDATE', 'PASSWORD_UPDATE', 'MFA_UPDATE')),
    description VARCHAR(255) NOT NULL,
    CONSTRAINT UQ_Events_Type UNIQUE (type)
);

DROP TABLE IF EXISTS UserEvents;

CREATE TABLE UserEvents
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    event_id            BIGINT UNSIGNED NOT NULL,
    device              VARCHAR(100) DEFAULT NULL,
    ip_address          VARCHAR(100) DEFAULT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON DELETE RESTRICT ON UPDATE CASCADE--on DELETE prevent from delete event role
);

DROP TABLE IF EXISTS AccountVerifications;

CREATE TABLE AccountVerifications
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                     BIGINT UNSIGNED NOT NULL,
    url                         VARCHAR(255) NOT NULL,
    --expired_date    DATETIME DEFAULT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UQ_AccountVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_AccountVerifications_Url UNIQUE (url)
);

DROP TABLE IF EXISTS ResetPasswordVerifications;

CREATE TABLE ResetPasswordVerifications
(
    id                              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                         BIGINT UNSIGNED NOT NULL,
    url                             VARCHAR(255) NOT NULL,
    expiration_date                 DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UQ_ResetPasswordVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_ResetPasswordVerifications_Url UNIQUE (url)
);

DROP TABLE IF EXISTS TwoFactorVerifications;

CREATE TABLE TwoFactorVerifications
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    code            VARCHAR(10) NOT NULL,
    expiration_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UQ_TwoFactorVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_TwoFactorVerifications_Code UNIQUE (code)
);

DROP TABLE IF EXISTS videos;

CREATE TABLE Videos
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    title               VARCHAR(255) NOT NULL,
    description         VARCHAR(5000) DEFAULT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    duration            TIME NOT NULL,
    stop_at             TIME DEFAULT '00:00:00',
    total_bytes         BIGINT UNSIGNED NOT NULL,
    stop_at_bytes       BIGINT UNSIGNED DEFAULT 0,
    views               INTEGER DEFAULT 0,
    thumbnail_url       VARCHAR(255) NOT NULL,
    video_url           VARCHAR(255) NOT NULL,
    location            VARCHAR(255) DEFAULT NULL,
    reported            BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT UQ_Videos_Video_Url UNIQUE (video_url),
    CONSTRAINT UQ_Videos_Thumbnail_Url UNIQUE (thumbnail_url)
);

DROP TABLE IF EXISTS Playlists;

CREATE TABLE Playlists
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated        DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS PlaylistVideos;

CREATE TABLE PlaylistVideos
(
    video_position          INTEGER NOT NULL DEFAULT 0,
    playlist_id             BIGINT UNSIGNED NOT NULL,
    video_id                BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES Playlists (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT PK_PlaylistVideos PRIMARY KEY (playlist_id, video_id)
);

DROP TABLE IF EXISTS Comments;

CREATE TABLE Comments
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    video_id            BIGINT UNSIGNED NOT NULL,
    comment_text        VARCHAR(4000) NOT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated        DATETIME DEFAULT NULL,
    parent_comment_id   BIGINT UNSIGNED DEFAULT NULL,
    reported            BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES Comments (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Status;

CREATE TABLE Status
(
    id                  INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_name         VARCHAR(100) NOT NULL CHECK(status_name in ('PUBLIC', 'PRIVATE', 'UNLISTED', 'DRAFT')),
    CONSTRAINT UQ_Status_Status_Name UNIQUE (status_name)
);

DROP TABLE IF EXISTS VideoStatus;

CREATE TABLE VideoStatus
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_id            BIGINT UNSIGNED NOT NULL,
    status_id           INTEGER NOT NULL,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (status_id) REFERENCES Status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT UQ_VideoStatus_Video_Id UNIQUE (video_id)
);

DROP TABLE IF EXISTS Categories;

CREATE TABLE Categories
(
    id                  INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name       VARCHAR(100) NOT NULL CHECK(category_name in ('CARS_AND_VEHICLES', 'COMEDY', 'EDUCATION', 'ENTERTAINMENT', 'FILM_AND_ANIMATION', 'GAMING', 'HOW_TO_AND_STYLE', 'MUSIC', 'NEWS_AND_POLITICS', 'NON_PROFITS_AND_ACTIVISM', 'PEOPLE_AND_BLOGS', 'PETS_AND_ANIMALS', 'SCIENCE_AND_TECHNOLOGY', 'SPORT', 'TRAVEL_AND_EVENTS')),
    CONSTRAINT UQ_Categories_Category_Name UNIQUE (category_name)
);

DROP TABLE IF EXISTS VideoCategories;

CREATE TABLE VideoCategories
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_id                    BIGINT UNSIGNED NOT NULL,
    category_id                 INTEGER NOT NULL,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT UQ_VideoCategories_Video_Id UNIQUE (video_id)
);

DROP TABLE IF EXISTS PlaylistStatus;

CREATE TABLE PlaylistStatus
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    playlist_id                 BIGINT UNSIGNED NOT NULL,
    status_id                   INTEGER NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES Playlists (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (status_id) REFERENCES Status (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT UQ_PlaylistStatus_Playlist_Id UNIQUE (playlist_id)
);


DROP TABLE IF EXISTS Likes;

CREATE TABLE Likes
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    video_id            BIGINT UNSIGNED NOT NULL,
    comment_id          BIGINT UNSIGNED DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comments (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Subscriptions;

CREATE TABLE Subscriptions
(
    id                    BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id               BIGINT UNSIGNED NOT NULL,
    created_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS Tags;

CREATE TABLE Tags
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name        VARCHAR(255) NOT NULL
    --CONSTRAINT UQ_Tags_Tag_Name UNIQUE (tag_name)
);

DROP TABLE IF EXISTS VideoTags;

CREATE TABLE VideoTags
(
    id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_id           BIGINT UNSIGNED NOT NULL,
    tag_id             BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags (id) ON DELETE RESTRICT ON UPDATE CASCADE
);