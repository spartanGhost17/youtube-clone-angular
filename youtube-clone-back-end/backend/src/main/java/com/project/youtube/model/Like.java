package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;


@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class Like {
    private Long id;
    private Long userId;
    private Long videoId;
    private Long commentId;
}
