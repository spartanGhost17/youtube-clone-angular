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
public class VideoItemForm {
    @NotNull(message = "video id cannot be null")
    private Long videoId;
    @NotNull(message = "playlist id cannot be null")
    private Long playlistId;
    @Nullable
    private Long videoPosition;
}
