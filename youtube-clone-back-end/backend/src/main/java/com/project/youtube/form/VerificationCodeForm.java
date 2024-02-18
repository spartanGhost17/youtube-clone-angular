package com.project.youtube.form;

import javax.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class VerificationCodeForm {
    @NotEmpty(message = "username cannot be empty")
    private String username;
    @NotEmpty(message = "code cannot be empty")
    private String code;
}
