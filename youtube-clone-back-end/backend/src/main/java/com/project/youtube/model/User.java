package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.sql.Date;
import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;


//@Document(value = "User") //this is a mongodb document 'equivalent of SQL table'
@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class User {
    private Long id;
    @NotEmpty(message = "username cannot be empty")
    private String username;
    @NotEmpty(message = "channel name cannot be empty")
    @Column(name = "channel_name")
    private String channelName;
    @NotEmpty(message = "email cannot be empty")
    @Email(message = "Invalid email, please enter a validation email address")
    private String email;
    @NotEmpty(message = "password cannot be empty")
    private String password;
    @Column(name = "created_at")
    private Date createdAt;
    private Boolean verified;
    private String description;
    private Boolean enabled;
    private Boolean banned;
    @Column(name = "non_locked")
    private Boolean isNotLocked;
    @Column(name = "using_mfa")
    private Boolean isUsingMFA;
    @Column(name = "profile_picture")
    private String profilePicture;
}
