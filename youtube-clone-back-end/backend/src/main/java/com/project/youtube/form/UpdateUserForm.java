package com.project.youtube.form;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserForm {
    private String username;
    private String channelName;
    private String phone;
    private String description;
    private Boolean usingMfa;
    private String profilePicture;
}
