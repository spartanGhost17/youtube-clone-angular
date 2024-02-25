package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerificationCodeForm {
    @NotEmpty(message = "username cannot be empty")
    private String username;
    @NotEmpty(message = "code cannot be empty")
    private String code;
}
