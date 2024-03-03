package com.project.youtube.controller;

import com.project.youtube.form.CreateReportForm;
import com.project.youtube.model.HttpResponse;
import com.project.youtube.model.ReportType;
import com.project.youtube.service.impl.ReportServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import static com.project.youtube.constants.ApplicationConstants.API_VERSION;

@RestController
@RequestMapping(value = API_VERSION+"report/")
@AllArgsConstructor
public class ReportController {
    private final ReportServiceImpl reportService;
    @PostMapping()
    public ResponseEntity<HttpResponse> createReport(@RequestBody @Valid CreateReportForm reportForm) {
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Report created.")
                        .status(HttpStatus.CREATED)
                        .statusCode(HttpStatus.CREATED.value())
                        .build(), HttpStatus.CREATED);
    }

    @GetMapping("item")
    public ResponseEntity<HttpResponse> getReport() {
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Report retrieved.")
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    @GetMapping("types")
    public ResponseEntity<HttpResponse> getReportTypes() {
        List<ReportType> reportTypeList = reportService.getReportTypes();
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Report types retrieved.")
                        .data(Map.of("types", reportTypeList))
                        .status(HttpStatus.OK)
                        .statusCode(HttpStatus.OK.value())
                        .build(), HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<HttpResponse> deleteReport() {
        return new ResponseEntity(
                HttpResponse.builder()
                        .timeStamp(Instant.now().toString())
                        .message("Report successfully deleted.")
                        .status(HttpStatus.NO_CONTENT)
                        .statusCode(HttpStatus.NO_CONTENT.value())
                        .build(), HttpStatus.NO_CONTENT);
    }

}
