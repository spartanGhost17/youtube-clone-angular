package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class PlaylistForm {

    @NotNull(message = "The playlist name cannot be null")
    private String name;
    @Nullable
    private Long playlistId;
    @Nullable
    private String description;
    //@NotNull(message = "The user id cannot be null")
    @Nullable
    private Long userId;
    @NotNull(message = "The status id cannot be null")
    private Long statusId;
}
