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

create SCHEMA IF NOT EXISTS youtube;
SET NAMES 'UTF8MB4';
SET TIME_ZONE = 'Europe/London';

use youtube;

-- Temporarily disable foreign key checks
/*SET FOREIGN_KEY_CHECKS = 0;
---------------------------------------- DROP ALL FOREIGN Key  -------------------------------------------
ALTER TABLE UserRoles DROP FOREIGN KEY user_id;
ALTER TABLE UserRoles DROP FOREIGN KEY role_id;
ALTER TABLE UserEvents DROP FOREIGN KEY user_id;
ALTER TABLE UserEvents DROP FOREIGN KEY event_id;
ALTER TABLE AccountVerifications DROP FOREIGN KEY user_id;
ALTER TABLE ResetPasswordVerifications DROP FOREIGN KEY user_id;
ALTER TABLE TwoFactorVerifications DROP FOREIGN KEY user_id;
ALTER TABLE Videos DROP FOREIGN KEY user_id;
ALTER TABLE Playlists DROP FOREIGN KEY user_id;
ALTER TABLE PlaylistVideos DROP FOREIGN KEY playlist_id;
ALTER TABLE PlaylistVideos DROP FOREIGN KEY video_id;
ALTER TABLE Comments DROP FOREIGN KEY user_id;
ALTER TABLE Comments DROP FOREIGN KEY video_id;
ALTER TABLE Comments DROP FOREIGN KEY parent_comment_id;
ALTER TABLE UserReports DROP FOREIGN KEY user_id;
ALTER TABLE UserReports DROP FOREIGN KEY video_id;
ALTER TABLE UserReports DROP FOREIGN KEY comment_id;
ALTER TABLE UserReports DROP FOREIGN KEY report_type_id;
ALTER TABLE VideoStatus DROP FOREIGN KEY video_id;
ALTER TABLE VideoStatus DROP FOREIGN KEY status_id;
ALTER TABLE VideoCategories DROP FOREIGN KEY video_id;
ALTER TABLE VideoCategories DROP FOREIGN KEY category_id;
ALTER TABLE PlaylistStatus DROP FOREIGN KEY playlist_id;
ALTER TABLE PlaylistStatus DROP FOREIGN KEY status_id;
ALTER TABLE Likes DROP FOREIGN KEY user_id;
ALTER TABLE Likes DROP FOREIGN KEY video_id;
ALTER TABLE Likes DROP FOREIGN KEY comment_id;
ALTER TABLE Subscriptions DROP FOREIGN KEY user_id;
ALTER TABLE Subscriptions DROP FOREIGN KEY subscriber_id;
ALTER TABLE VideoTags DROP FOREIGN KEY video_id;
ALTER TABLE VideoTags DROP FOREIGN KEY tag_id;

------------------------------------------ DROP ALL TABLES ---------------------------------------------------
DROP TABLE IF EXISTS Roles;
DROP TABLE IF EXISTS UserRoles;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS UserEvents;
DROP TABLE IF EXISTS AccountVerifications;
DROP TABLE IF EXISTS ResetPasswordVerifications;
DROP TABLE IF EXISTS TwoFactorVerifications;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS Playlists;
DROP TABLE IF EXISTS PlaylistVideos;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Reports;
DROP TABLE IF EXISTS UserReports;
DROP TABLE IF EXISTS Status;
DROP TABLE IF EXISTS VideoStatus;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS VideoCategories;
DROP TABLE IF EXISTS PlaylistStatus;
DROP TABLE IF EXISTS Likes;
DROP TABLE IF EXISTS Subscriptions;
DROP TABLE IF EXISTS Tags;
DROP TABLE IF EXISTS VideoTags;
DROP TABLE IF EXISTS Users;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;*/

DROP TABLE IF EXISTS Users;

create TABLE Users
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(150) NOT NULL, --add to insert service
    last_name       VARCHAR(250) NOT NULL, --add to insert service
    username        VARCHAR(25) NOT NULL,
    channel_name    VARCHAR(100) NOT NULL,
    email           VARCHAR(255) NOT NULL,
    password        VARCHAR(255) DEFAULT NULL,
    phone           VARCHAR(30) DEFAULT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified        BOOLEAN DEFAULT FALSE,
    description     VARCHAR(5000) DEFAULT NULL,
    enabled         BOOLEAN DEFAULT FALSE,
    banned          BOOLEAN DEFAULT FALSE,
    non_locked      BOOLEAN DEFAULT TRUE,
    using_mfa       BOOLEAN DEFAULT FALSE,
    profile_picture VARCHAR(255) DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    banner_picture  VARCHAR(255) DEFAULT 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    CONSTRAINT UQ_Users_Username UNIQUE (username),
    CONSTRAINT UQ_Users_Channel_Name UNIQUE (channel_name),
    CONSTRAINT UQ_Users_Email UNIQUE (email)
);

DROP TABLE IF EXISTS Roles;

create TABLE Roles
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(50) NOT NULL,
    permissions     VARCHAR(400) NOT NULL, --consider making it its own table
    CONSTRAINT UQ_Roles_Name UNIQUE (name)
);

DROP TABLE IF EXISTS UserRoles;

create TABLE UserRoles
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    role_id         BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE, --on user_id updated or delete cascade action
    FOREIGN KEY (role_id) REFERENCES Roles (id) ON delete RESTRICT ON update CASCADE, --on DELETE prevent from delete active role
    CONSTRAINT UQ_UserRoles_User_Id UNIQUE (user_id)
);

DROP TABLE IF EXISTS Events;

create TABLE Events
(
    id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type        VARCHAR(255) NOT NULL CHECK(type IN ('LOGIN_ATTEMPT', 'LOGIN_ATTEMPT_FAILURE', 'LOGIN_ATTEMPT_SUCCESS', 'PROFILE_UPDATE', 'PROFILE_PICTURE_UPDATE', 'ROLE_UPDATE', 'ACCOUNT_SETTINGS_UPDATE', 'PASSWORD_UPDATE', 'MFA_UPDATE')),
    description VARCHAR(255) NOT NULL,
    CONSTRAINT UQ_Events_Type UNIQUE (type)
);

DROP TABLE IF EXISTS UserEvents;

create TABLE UserEvents
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    event_id            BIGINT UNSIGNED NOT NULL,
    device              VARCHAR(100) DEFAULT NULL,
    ip_address          VARCHAR(100) DEFAULT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (event_id) REFERENCES Events (id) ON delete RESTRICT ON update CASCADE--on DELETE prevent from delete event role
);

DROP TABLE IF EXISTS AccountVerifications;

create TABLE AccountVerifications
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                     BIGINT UNSIGNED NOT NULL,
    url                         VARCHAR(255) NOT NULL,
    --expired_date    DATETIME DEFAULT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    CONSTRAINT UQ_AccountVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_AccountVerifications_Url UNIQUE (url)
);

DROP TABLE IF EXISTS ResetPasswordVerifications;

create TABLE ResetPasswordVerifications
(
    id                              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                         BIGINT UNSIGNED NOT NULL,
    url                             VARCHAR(255) NOT NULL,
    expiration_date                 DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    CONSTRAINT UQ_ResetPasswordVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_ResetPasswordVerifications_Url UNIQUE (url)
);

DROP TABLE IF EXISTS TwoFactorVerifications;

create TABLE TwoFactorVerifications
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT UNSIGNED NOT NULL,
    code            VARCHAR(10) NOT NULL,
    expiration_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    CONSTRAINT UQ_TwoFactorVerifications_User_Id UNIQUE (user_id),
    CONSTRAINT UQ_TwoFactorVerifications_Code UNIQUE (code)
);

DROP TABLE IF EXISTS Videos;

create TABLE Videos
(
    id                      BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                 BIGINT UNSIGNED NOT NULL,
    title                   VARCHAR(255) NOT NULL,
    description             VARCHAR(5000) DEFAULT NULL,
    created_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    duration                TIME NOT NULL,
    stop_at                 TIME DEFAULT '00:00:00',
    total_bytes             BIGINT UNSIGNED NOT NULL,
    stop_at_bytes           BIGINT UNSIGNED DEFAULT 0,
    views                   INTEGER UNSIGNED DEFAULT 0,
    comment_enabled         BOOLEAN DEFAULT TRUE,
    thumbnail_url           VARCHAR(255) NOT NULL,
    video_url               VARCHAR(255) NOT NULL,
    location                VARCHAR(255) DEFAULT NULL,
    reported                BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    CONSTRAINT UQ_Videos_Video_Url UNIQUE (video_url),
    CONSTRAINT UQ_Videos_Thumbnail_Url UNIQUE (thumbnail_url)--drop this
);

DROP TABLE IF EXISTS Playlists;

create TABLE Playlists
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated        DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE
);

DROP TABLE IF EXISTS PlaylistVideos;

create TABLE PlaylistVideos
(
    video_position          INTEGER UNSIGNED NOT NULL DEFAULT 0,
    playlist_id             BIGINT UNSIGNED NOT NULL,
    video_id                BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES Playlists (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    CONSTRAINT PK_PlaylistVideos PRIMARY KEY (playlist_id, video_id)
);

DROP TABLE IF EXISTS Comments;

create TABLE Comments
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    video_id            BIGINT UNSIGNED NOT NULL,
    comment_text        VARCHAR(4000) NOT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated        DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    parent_comment_id   BIGINT UNSIGNED DEFAULT NULL,
    reported            BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (parent_comment_id) REFERENCES Comments (id) ON delete CASCADE ON update CASCADE
);

DROP TABLE IF EXISTS Reports;

create TABLE Reports
(
    id              INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    type            VARCHAR(100) NOT NULL CHECK(type in ('SEXUAL_CONTENT', 'VIOLENT_OR_REPULSIVE', 'HATEFUL_OR_ABUSIVE_CONTENT', 'HARASSMENT_OR_BULLYING', 'HARMFUL_OR_DANGEROUS_ACTS', 'MISINFORMATION', 'CHILD_ABUSE', 'PROMOTES_TERRORISM', 'SPAM_OR_MISLEADING', 'LEGAL_ISSUE', 'CAPTION_ISSUE', 'NONE_OF_THESE_ARE_MY_ISSUE')),
    description     VARCHAR(255) NOT NULL,
    CONSTRAINT UQ_Reports_Type UNIQUE (type)
);
DROP TABLE IF EXISTS UserReports;

create TABLE UserReports
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    video_id            BIGINT UNSIGNED DEFAULT NULL,
    comment_id          BIGINT UNSIGNED DEFAULT NULL,
    report_type_id      INTEGER UNSIGNED NOT NULL,
    type                VARCHAR(50) NOT NULL CHECK(type in ('VIDEO', 'COMMENT')),
    description         VARCHAR(500) DEFAULT NULL,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comments (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (report_type_id) REFERENCES Reports (id) ON delete CASCADE ON update CASCADE  --MAYBE SHOULD BE RESTRICTED ON DELETE
);


DROP TABLE IF EXISTS Status;

create TABLE Status
(
    id                  INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    status_name         VARCHAR(100) NOT NULL CHECK(status_name in ('PUBLIC', 'PRIVATE', 'UNLISTED', 'DRAFT')),
    CONSTRAINT UQ_Status_Status_Name UNIQUE (status_name)
);

DROP TABLE IF EXISTS VideoStatus;

create TABLE VideoStatus
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_id            BIGINT UNSIGNED NOT NULL,
    status_id           INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (status_id) REFERENCES Status (id) ON delete RESTRICT ON update CASCADE,
    CONSTRAINT UQ_VideoStatus_Video_Id UNIQUE (video_id)
);

DROP TABLE IF EXISTS Categories;

create TABLE Categories
(
    id                  INTEGER UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_name       VARCHAR(100) NOT NULL CHECK(category_name in ('CARS_AND_VEHICLES', 'COMEDY', 'EDUCATION', 'ENTERTAINMENT', 'FILM_AND_ANIMATION', 'GAMING', 'HOW_TO_AND_STYLE', 'MUSIC', 'NEWS_AND_POLITICS', 'NON_PROFITS_AND_ACTIVISM', 'PEOPLE_AND_BLOGS', 'PETS_AND_ANIMALS', 'SCIENCE_AND_TECHNOLOGY', 'SPORT', 'TRAVEL_AND_EVENTS')),
    CONSTRAINT UQ_Categories_Category_Name UNIQUE (category_name)
);

DROP TABLE IF EXISTS VideoCategories;

create TABLE VideoCategories
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_id                    BIGINT UNSIGNED NOT NULL,
    category_id                 INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (category_id) REFERENCES Categories (id) ON delete RESTRICT ON update CASCADE,
    CONSTRAINT UQ_VideoCategories_Video_Id UNIQUE (video_id)
);

DROP TABLE IF EXISTS PlaylistStatus;

create TABLE PlaylistStatus
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    playlist_id                 BIGINT UNSIGNED NOT NULL,
    status_id                   INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (playlist_id) REFERENCES Playlists (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (status_id) REFERENCES Status (id) ON delete RESTRICT ON update CASCADE,
    CONSTRAINT UQ_PlaylistStatus_Playlist_Id UNIQUE (playlist_id)
);


DROP TABLE IF EXISTS Likes;

create TABLE Likes
(
    id                  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT UNSIGNED NOT NULL,
    video_id            BIGINT UNSIGNED DEFAULT NULL,
    comment_id          BIGINT UNSIGNED DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (comment_id) REFERENCES Comments (id) ON delete CASCADE ON update CASCADE,
    CONSTRAINT UQ_Likes_Video_Id UNIQUE (user_id, video_id),
    CONSTRAINT UQ_Likes_Comment_Id UNIQUE (user_id, comment_id)
);

DROP TABLE IF EXISTS Subscriptions;

create TABLE Subscriptions
(
    id                          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id                     BIGINT UNSIGNED NOT NULL,
    subscriber_id               BIGINT UNSIGNED NOT NULL,
    created_at                  DATETIME DEFAULT CURRENT_TIMESTAMP,
    notification_type           VARCHAR(100) NOT NULL CHECK(notification_type in ('ALL', 'NONE', 'PERSONALISED')),
    FOREIGN KEY (user_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (subscriber_id) REFERENCES Users (id) ON delete CASCADE ON update CASCADE
);

DROP TABLE IF EXISTS Tags;

create TABLE Tags
(
    id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tag_name        VARCHAR(255) NOT NULL
    --CONSTRAINT UQ_Tags_Tag_Name UNIQUE (tag_name)
);

DROP TABLE IF EXISTS VideoTags;

create TABLE VideoTags
(
    id                 BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    video_id           BIGINT UNSIGNED NOT NULL,
    tag_id             BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (video_id) REFERENCES Videos (id) ON delete CASCADE ON update CASCADE,
    FOREIGN KEY (tag_id) REFERENCES Tags (id) ON delete RESTRICT ON update CASCADE
);

select * from Categories;

insert into Categories (category_name)
values  ('CARS_AND_VEHICLES'),
        ('COMEDY'),
        ('EDUCATION'),
        ('ENTERTAINMENT'),
        ('FILM_AND_ANIMATION'),
        ('GAMING'),
        ('HOW_TO_AND_STYLE'),
        ('MUSIC'),
        ('NEWS_AND_POLITICS'),
        ('NON_PROFITS_AND_ACTIVISM'),
        ('PEOPLE_AND_BLOGS'),
        ('PETS_AND_ANIMALS'),
        ('SCIENCE_AND_TECHNOLOGY'),
        ('SPORT'),
        ('TRAVEL_AND_EVENTS');

select * from Status;

insert into Status (status_name)
values ('PUBLIC'),
       ('PRIVATE'),
       ('DRAFT'),
       ('UNLISTED');

select * from Reports;

insert into Reports(type, description)
values ('SEXUAL_CONTENT', 'Content that includes graphic sexual activity, nudity or other type of sexual content'),
('VIOLENT_OR_REPULSIVE', 'Content that is violent, graphic or posted to shock viewers'),
('HATEFUL_OR_ABUSIVE_CONTENT', 'Content that promotes hatred against protected groups, abuses vulnerable individuals or engages in cyberbullying'),
('HARASSMENT_OR_BULLYING', 'Content that threatens individuals or targets them with prolonged or malicious intent'),
('HARMFUL_OR_DANGEROUS_ACTS', 'Content that includes acts that may result in physical harm'),
('MISINFORMATION', 'Content that is misleading or deceptive with serious risk of egregious harm'),
('CHILD_ABUSE', 'Content that includes sexual, predatory, abusive communication towards minors'),
('PROMOTES_TERRORISM', 'Content that is intended to recruit for terrorist organisations, incite violence, glorify terrorist attacks or otherwise promote acts of terrorism'),
('SPAM_OR_MISLEADING', 'Content that is massively posted or otherwise harmful in nature'),
('LEGAL_ISSUE', 'Copyright, privacy or other legal complaint'),
('CAPTION_ISSUE', 'Missing, inaccurate or abusive captions'),
('NONE_OF_THESE_ARE_MY_ISSUE', 'Describe the issue in detail on the next screen');

select * from Events;

insert into Events (type, description)
values ('LOGIN_ATTEMPT', 'user login attempt'),
       ('LOGIN_ATTEMPT_FAILURE', 'login attempt was not successful'),
       ('LOGIN_ATTEMPT_SUCCESS', 'login attempt was successful'),
       ('PROFILE_UPDATE', 'user profile was updated'),
       ('PROFILE_PICTURE_UPDATE', 'profile picture updated'),
       ('ROLE_UPDATE', 'user role updated'),
       ('ACCOUNT_SETTINGS_UPDATE', 'user account settings updated'),
       ('PASSWORD_UPDATE', 'password updated'),
       ('MFA_UPDATE', 'multi factor authentication updated');


select * from Roles;

insert into Roles (name, permissions)
values ('ROLE_USER', 'CREATE:VIDEO,CREATE:REPORT,READ:USER,UPDATE:CHANNEL_NAME,UPDATE:USERNAME,UPDATE:EMAIL,UPDATE:PASSWORD,UPDATE:DESCRIPTION,UPDATE:PROFILE_PICTURE,DELETE:USER,DELETE:VIDEO,DELETE:COMMENT'),
       ('ROLE_ADMIN', 'CREATE:USER,READ:USER,READ:REPORT,UPDATE:USER_BAN,UPDATE:USER_VERIFIED,DELETE:ANY_COMMENT,DELETE:ANY_USER,DELETE:REPORT'),
       ('ROLE_SYSADMIN', 'CREATE:PERMISSION,CREATE:USER,READ:USER,READ:REPORT,UPDATE:USER_BAN,UPDATE:USER_VERIFIED,UPDATE:USER_ENABLED,UPDATE:USER_MFA,UPDATE:USER_LOCK,DELETE:ANY_USER,DELETE:ANY_VIDEO,DELETE:ANY_COMMENT,DELETE:REPORT');
