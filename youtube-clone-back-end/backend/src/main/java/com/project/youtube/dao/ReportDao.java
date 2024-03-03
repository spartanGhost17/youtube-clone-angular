package com.project.youtube.dao;

import com.project.youtube.form.CreateReportForm;
import com.project.youtube.model.Report;
import com.project.youtube.model.ReportType;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportDao<T> {
    void createReport(CreateReportForm reportForm);
    void deleteReport(Long id);
    T getReport(Long id);
    List<T> getReportsForVideo(Long videoId, int pageSize, int offset);
    List<T> getReportsForComment(Long commentId, int pageSize, int offset);
    List<ReportType> getReportTypes();
}
