package com.project.youtube.dto;

import com.project.youtube.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String channelName;
    private Date createdAt;
    private String email;
    private String phone;
    private Boolean verified;
    private String description;
    private Boolean enabled;
    private Boolean nonLocked;
    private Boolean usingMfa;
    private String profilePicture;
    private List<Role> authorities;
    /*private String id;
    private String firstName;
    private String lastName;
    private String userName;
    private String emailAddress;*/

    /*
    //playlist and other info
    private Set<String> subscribedToUsers;
    private Set<String> subscribers;
    private List<String> videoHistory;
    private Set<String> likedVideos;
    private Set<String> dislikedVideos;
    private List<String> PlayListsIds;*/
}
