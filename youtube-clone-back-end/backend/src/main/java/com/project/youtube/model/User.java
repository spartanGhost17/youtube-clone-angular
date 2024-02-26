package com.project.youtube.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import javax.persistence.Column;
import java.sql.Date;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Data
@EntityScan
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(NON_NULL)
public class User {
    private Long id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String username;
    @Column(name = "channel_name")
    private String channelName;
    private String email;
    private String password;
    private String phone;
    @Column(name = "created_at")
    private Date createdAt;
    private Boolean verified;
    private String description;
    private Boolean enabled;
    private Boolean banned;
    @Column(name = "non_locked")
    private Boolean nonLocked;
    @Column(name = "using_mfa")
    private Boolean usingMfa;
    @Column(name = "profile_picture")
    private String profilePicture;
    @Column(name = "banner_picture")
    private String bannerPicture;
    private List<Role> grantedAuthorities;
}
