package com.project.youtube.service;

import com.project.youtube.form.CreateReportForm;
import com.project.youtube.model.Report;
import com.project.youtube.model.ReportType;

import java.util.List;

public interface ReportService {
    void createReport(CreateReportForm reportForm);
    void deleteReport(Long id);
    Report getReport(Long id);
    List<Report> getReportsForVideo(Long videoId, int pageSize, int offset);
    List<Report> getReportsForComment(Long commentId, int pageSize, int offset);
    List<ReportType> getReportTypes();
}
