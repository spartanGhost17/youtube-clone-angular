package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Column;

import java.sql.Date;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Report {
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "video_id")
    private Long videoId;
    @Column(name = "comment_id")
    private Long commentId;
    @Column(name = "report_type_id")
    private Long reportTypeId;
    private String type; //('VIDEO', 'COMMENT')
    private String description;
    @Column(name = "created_at")
    private Date created_at;
}
