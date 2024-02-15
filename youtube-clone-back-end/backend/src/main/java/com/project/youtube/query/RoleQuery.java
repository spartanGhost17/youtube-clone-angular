package com.project.youtube.query;

public class RoleQuery {
    public static final String SELECT_ROLE_BY_NAME_QUERY = "SELECT * FROM Roles WHERE name = :name";
    public static final String INSERT_ROLE_TO_USER_QUERY = "INSERT INTO UserRoles(user_id, role_id) VALUES(:userId, :roleId)";
    public static final String SELECT_ROLE_BY_USERNAME_QUERY = "SELECT ur.id, r.name, r.permissions, u.username FROM Roles r INNER JOIN UserRoles ur ON ur.role_id = r.id INNER JOIN Users u ON u.id = ur.user_id WHERE u.username = :username";
    public static final String SELECT_ROLE_BY_EMAIL_QUERY = "SELECT ur.id, r.name, r.permissions, u.email FROM Roles r INNER JOIN UserRoles ur ON ur.role_id = r.id INNER JOIN Users u ON u.id = ur.user_id WHERE u.email = :email";
    public static final String SELECT_ROLE_BY_USER_ID_QUERY = "SELECT ur.id, r.name, r.permissions, u.email FROM Roles r INNER JOIN UserRoles ur ON ur.role_id = r.id INNER JOIN Users u ON u.id = ur.user_id WHERE u.id = :userId";
}
