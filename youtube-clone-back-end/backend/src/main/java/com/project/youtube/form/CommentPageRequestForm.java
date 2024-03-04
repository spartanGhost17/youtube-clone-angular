package com.project.youtube.form;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentPageRequestForm {
    @NotNull(message = "Video id cannot be null")
    private Long videoId;
    @NotNull(message = "Page size cannot be null")
    private int pageSize;
    @NotNull(message = "Offset cannot be null")
    private Long offset;
    @NotNull(message = "Need to specify if the request is for a sub comment")
    private Boolean isSubComment;
}
