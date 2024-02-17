package com.project.youtube.form;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class VerificationCodeForm {
    @NotEmpty(message = "username cannot be empty")
    private String username;
    @NotEmpty(message = "code cannot be empty")
    private String code;
}
