package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserForm {
    @NotEmpty(message = "username cannot be empty")
    private String username;
    @NotEmpty(message = "email cannot be empty")
    @Email(message = "Invalid email, please enter a validation email address")
    private String email;
    @NotEmpty(message = "password cannot be empty")
    private String password;
}
