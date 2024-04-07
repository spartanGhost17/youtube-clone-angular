package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Column;
import java.sql.Timestamp;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Subscription {
    private Long id;
    @Column(name = "user_id")
    private Long userId;
    @Column(name = "subscriber_id")
    private Long subscriberId;
    @Column(name = "created_at")
    private Timestamp createdAt;
    @Column(name = "notification_type")
    private String notificationType;
}
