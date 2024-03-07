package com.project.youtube.dtomapper;

import com.project.youtube.dto.CommentDto;
import com.project.youtube.model.Comment;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class commentDTOMapper {

    public static CommentDto toCommentDto(Comment comment) {
        CommentDto commentDto = new CommentDto();
        BeanUtils.copyProperties(comment, commentDto);
        return commentDto;
    }
}
