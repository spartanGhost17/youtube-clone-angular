package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateReportForm {
    @NotEmpty(message = "userId cannot be empty")
    private Long userId;
    @Nullable
    private Long videoId;
    @Nullable
    private Long commentId;
    @NotEmpty(message = "report type id cannot be empty")
    private Long reportTypeId;
    @NotEmpty(message = "report type cannot be empty")
    private String type; //('VIDEO', 'COMMENT')
    private String description;
}
