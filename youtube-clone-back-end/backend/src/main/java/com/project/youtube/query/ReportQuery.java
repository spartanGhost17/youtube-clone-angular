package com.project.youtube.query;

public class ReportQuery {
    public static final String CREATE_REPORT_BY_VIDEO_ID_QUERY = "INSERT INTO UserReports (user_id, video_id, report_type_id, type, description) VALUES (:userId, :videoId, :reportTypeId, :type, :description)";
    public static final String CREATE_REPORT_BY_COMMENT_ID_QUERY = "INSERT INTO UserReports (user_id, comment_id, report_type_id, type, description) VALUES (:userId, :commentId, :reportTypeId, :type, :description)";
    public static final String DELETE_REPORT_QUERY = "";
    public static final String GET_REPORT = "";
    public static final String GET_REPORT_BY_VIDEO_ID_QUERY = "";
    public static final String GET_REPORT_BY_COMMENT_ID_QUERY = "";
    public static final String GET_REPORT_TYPES = "SELECT * FROM Reports";
}
