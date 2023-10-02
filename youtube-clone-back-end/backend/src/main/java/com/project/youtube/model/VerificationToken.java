package com.project.youtube.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(value="Token")
@Data
@EntityScan
@AllArgsConstructor
@NoArgsConstructor
public class VerificationToken {

    @Id
    private Long id;
    private String token;
    private User user;
    private Instant expiryDate;
}
