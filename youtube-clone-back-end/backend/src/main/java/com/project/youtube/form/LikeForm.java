package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LikeForm {
    @Nullable
    private Long userId;
    @Nullable
    private Long videoId;
    @Nullable
    private Long commentId;
}
