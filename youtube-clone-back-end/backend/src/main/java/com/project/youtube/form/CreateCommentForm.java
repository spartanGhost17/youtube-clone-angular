package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateCommentForm {
    //@NotNull(message = "userId cannot be empty")
    @Nullable
    private Long userId;
    @NotNull(message = "videoId cannot be empty")
    private Long videoId;
    @NotEmpty(message = "comment text cannot be empty")
    private String commentText;
    @Nullable
    private Long parentCommentId;
    @Nullable
    private Long toUserId;
}
