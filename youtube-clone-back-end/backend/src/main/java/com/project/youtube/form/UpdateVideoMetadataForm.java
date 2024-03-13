package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Time;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateVideoMetadataForm {
    @Nullable//NotEmpty(message = "userId cannot be empty.")
    private Long userId;
    private Long videoId;
    @NotEmpty(message = "video title cannot be empty.")
    private String title;
    @Nullable
    private String description;
    //@Nullable
    //private Long thumbnailId;
    @Nullable
    private Time stopAt;
    @Nullable
    private Long stopAtBytes;
    @Nullable
    private Long views;
    @NotNull(message = "Must define comment enabled status.")
    private Boolean commentEnabled;
    @Nullable
    private String location;
    @Nullable
    private Boolean reported;
}
