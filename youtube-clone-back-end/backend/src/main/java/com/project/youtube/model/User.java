package com.project.youtube.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Date;
import java.util.List;
import java.util.Set;

//@Document(value = "User") //this is a mongodb document 'equivalent of SQL table'
@Data
@EntityScan
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String userName;
    private String emailAddress;
    //private String profilePictureURL;
    //private Boolean verified;
    //private Set<String> subscribedToUsers;
    //private Set<String> subscribers;
    //private List<String> videoHistory;
    //private Set<String> likedVideos;
    //private Set<String> dislikedVideos;
    //private List<String> userPlayListsIds;
    private Long userid;
    private String username;
    private String email;
    private String password;
    private Date date_registered;
    private String profilePictureURL;
    private Set<Authority> authorities;

}
