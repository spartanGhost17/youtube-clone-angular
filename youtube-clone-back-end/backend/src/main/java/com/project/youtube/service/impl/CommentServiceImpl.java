package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.CommentDaoImpl;
import com.project.youtube.dto.CommentDto;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.form.LikeForm;
import com.project.youtube.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.youtube.dtomapper.commentDTOMapper.toCommentDto;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
    @Autowired
    private final CommentDaoImpl commentDao;
    private final LikeServiceImpl likeService;
    @Override
    public void create(CreateCommentForm commentForm) {
        commentDao.create(commentForm);
    }

    @Override
    public CommentDto get(Long id) {
        return null;
    }

    /**
     * get top level comments page
     * @param videoId the video id
     * @param pageSize the page size
     * @param offset the offset
     * @return the comments list
     */
    @Override //TODO: get primary comments with parent_comment_id null
    public List<CommentDto> getComments(Long videoId, int pageSize, Long offset, Boolean isSubComment) {
        return commentDao.getComments(videoId, pageSize, offset, isSubComment).stream()
                .map(comment -> toCommentDto(comment))
                .map(commentDto -> {
                    Long likes = getLikeCount(commentDto);
                    commentDto.setLikeCount(likes);
                    return commentDto;
                })
                .collect(Collectors.toList());
    }

    /**
     * delete a comment
     * @param id the comment id
     */
    @Override
    public void delete(Long id) {
        commentDao.delete(id);
    }

    /**
     * Update comment text
     * @param commentText the text
     * @return the updated Comment
     */
    @Override
    public CommentDto updateComment(String commentText, Long id) {
        CommentDto commentDto = toCommentDto(commentDao.updateComment(commentText, id));
        commentDto.setLikeCount(getLikeCount(commentDto));
        return commentDto;
    }

    /**
     * get like count
     * @param commentDto the comment DTO
     * @return the like count
     */
    private Long getLikeCount(CommentDto commentDto) {
        LikeForm likeForm = new LikeForm();
        likeForm.setCommentId(commentDto.getId());
        return likeService.getLikeCount(likeForm);
    }
}
