package com.project.youtube.dao.impl;

import com.project.youtube.Exception.APIException;
import com.project.youtube.dao.ReportDao;
import com.project.youtube.form.CreateReportForm;
import com.project.youtube.model.Report;
import com.project.youtube.model.ReportType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.project.youtube.query.ReportQuery.*;

@Repository
@RequiredArgsConstructor
@Slf4j
public class ReportDaoImpl implements ReportDao<Report> {
    @Autowired
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public void createReport(CreateReportForm reportForm) {

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
     * get the list of all report types
     * @return the different kind of reports
     */
    @Override
    public List<ReportType> getReportTypes() {
        try {
            return jdbcTemplate.query(GET_REPORT_TYPES, new BeanPropertyRowMapper<>(ReportType.class));
        } catch (EmptyResultDataAccessException exception) {
            throw new APIException("Could not retrieve the report types");
        } catch (Exception exception) {
            throw new APIException("An error occurred, please try again.");
        }
    }
}
