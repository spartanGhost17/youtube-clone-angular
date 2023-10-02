package com.project.youtube.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String id;
    private String firstName;
    private String lastName;
    private String userName;
    private String emailAddress;
    private String profilePictureURL;
    private Set<String> subscribedToUsers;
    private Set<String> subscribers;
    private List<String> videoHistory;
    private Set<String> likedVideos;
    private Set<String> dislikedVideos;
    private List<String> PlayListsIds;
}
