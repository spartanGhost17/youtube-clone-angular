package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.ReportDaoImpl;
import com.project.youtube.form.CreateReportForm;
import com.project.youtube.model.Report;
import com.project.youtube.model.ReportType;
import com.project.youtube.service.ReportService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportServiceImpl implements ReportService {
    private final ReportDaoImpl reportDao;
    @Override
    public void createReport(CreateReportForm reportForm) {
        reportDao.createReport(reportForm);
    }

    @Override
    public void deleteReport(Long id) {

    }

    @Override
    public Report getReport(Long id) {
        return null;
    }

    @Override
    public List<Report> getReportsForVideo(Long videoId, int pageSize, int offset) {
        return null;
    }

    @Override
    public List<Report> getReportsForComment(Long commentId, int pageSize, int offset) {
        return null;
    }

    /**
     * get the report types
     * @return the report types list
     */
    @Override
    public List<ReportType> getReportTypes() {
        return reportDao.getReportTypes();
    }
}
