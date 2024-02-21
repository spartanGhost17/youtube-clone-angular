package com.project.youtube.query;

public class UserQuery {
    public static final String COUNT_USER_EMAIL_QUERY = "SELECT COUNT(*) FROM Users WHERE email = :email";
    public static final String INSERT_USER_QUERY = "INSERT INTO Users(username, channel_name, email, password) VALUES(:username, :channelName, :email, :password)";
    public static final String INSERT_ACCOUNT_VERIFICATION_URL_QUERY = "INSERT INTO AccountVerifications(user_id, url) VALUES(:userId, :url)";
    public static final String SELECT_USER_BY_ID = "SELECT * FROM Users WHERE id = :id";
    public static final String SELECT_USER_BY_EMAIL_QUERY = "SELECT * FROM Users WHERE email = :email";
    public static final String SELECT_USER_BY_USERNAME_QUERY = "SELECT * FROM Users WHERE username = :username";
    public static final String INSERT_VERIFICATION_CODE_QUERY = "INSERT INTO TwoFactorVerifications (user_id, code, expiration_date) VALUES (:userId, :code, :expirationDate)";
    public static final String DELETE_VERIFICATION_CODE_BY_USER_ID_QUERY = "DELETE FROM TwoFactorVerifications WHERE user_id = :userId";
    public static final String DELETE_VERIFICATION_CODE_BY_CODE_QUERY = "DELETE FROM TwoFactorVerifications WHERE code = :code";
    public static final String SELECT_USER_BY_USER_CODE_QUERY = "SELECT * FROM Users WHERE id = (SELECT user_id FROM TwoFactorVerifications WHERE code = :code AND user_id = :userId)";
    //public static final String SELECT_USER_BY_USER_CODE_QUERY  = "SELECT u.* FROM Users u INNER JOIN TwoFactorVerifications tfa ON u.id = tfa.user_id WHERE tfa.code = :code AND tfa.user_id = :userId";
    public static final String SELECT_EXPIRED_CODE_QUERY = "SELECT expiration_date < NOW() AS is_expired FROM TwoFactorVerifications WHERE code = :code AND user_id = :userId";
    public static final String DELETE_PASSWORD_VERIFICATION_BY_USER_ID_QUERY = "DELETE FROM ResetPasswordVerifications WHERE user_id = :userId";
    public static final String INSERT_PASSWORD_VERIFICATION_BY_USER_ID_QUERY = "INSERT INTO ResetPasswordVerifications (user_id, url, expiration_date) VALUES (:userId, :url, :expirationDate)";
    public static final String SELECT_EXPIRED_PASSWORD_VERIFICATION_URL_QUERY = "SELECT expiration_date < NOW() AS is_expired FROM ResetPasswordVerifications WHERE url = :url";
    public static final String SELECT_USER_BY_VERIFICATION_URL = "SELECT u.* FROM Users AS u INNER JOIN ResetPasswordVerifications AS rpv ON u.id = rpv.user_id WHERE rpv.url = :url";
    public static final String UPDATE_USER_PASSWORD_BY_URL_QUERY = "UPDATE Users SET password = :password WHERE id IN (SELECT user_id FROM ResetPasswordVerifications WHERE url = :url)";//mysql does not support join on update
    public static final String DELETE_PASSWORD_VERIFICATION_BY_URL_QUERY = "DELETE FROM ResetPasswordVerifications WHERE url = :url";
    public static final String SELECT_USER_BY_ACCOUNT_VERIFICATION_URL_QUERY = "SELECT u.* FROM Users AS u INNER JOIN AccountVerifications AS av ON av.user_id = u.id WHERE av.url = :url";
    public static final String UPDATE_USER_ENABLED_BY_ID_QUERY = "UPDATE Users SET enabled = :enabled WHERE id = :userId";
    public static final String UPDATE_USER_METADATA_QUERY = "UPDATE Users SET username =:username, channel_name = :channelName, phone = :phone, description = :description, using_mfa = :usingMfa, profile_picture = :profilePicture WHERE id = :userId";
}
