package com.project.youtube.service.impl;

import com.project.youtube.dao.impl.CommentDaoImpl;
import com.project.youtube.dto.CommentDto;
import com.project.youtube.dto.UserDTO;
import com.project.youtube.dtomapper.commentDTOMapper;
import com.project.youtube.form.CreateCommentForm;
import com.project.youtube.form.LikeForm;
import com.project.youtube.model.Comment;
import com.project.youtube.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.youtube.dtomapper.commentDTOMapper.toCommentDto;
import static java.util.Objects.requireNonNull;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {
    @Autowired
    private final CommentDaoImpl commentDao;
    private final UserServiceImpl userService;
    private final LikeServiceImpl likeService;
    @Override
    public CommentDto create(CreateCommentForm commentForm) {
        UserDTO user = userService.getUser(commentForm.getUserId());
        CommentDto commentDto = toCommentDto(commentDao.create(commentForm));
        commentDto.setUsername(user.getUsername());
        commentDto.setImageUrl(user.getProfilePicture());
        commentDto.setReplyCount(getReplyCount(commentDto.getId()));
        commentDto.setLikeCount(getLikeCount(commentDto));
        if(commentForm.getParentCommentId() != null) {
            //Comment parentComment = commentDao.get(commentForm.getParentCommentId());
            UserDTO to = userService.getUser(commentForm.getToUserId());//userService.getUser(parentComment.getUserId());
            commentDto.setTo(to.getUsername());
        }
        return commentDto;
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
     * @param parentId the parent of id of sub-comments
     * @return the comments list
     */
    @Override //TODO: get primary comments with parent_comment_id null
    public List<CommentDto> getComments(Long videoId, Long pageSize, Long offset, Boolean isSubComment, Long parentId) {
        //Comment parentComment;
        //UserDTO to = new UserDTO();
        //if(isSubComment) {
        //    parentComment = commentDao.get(parentId);
        //    to = userService.getUser(parentComment.getUserId());
        //}

        //UserDTO finalTo = to;
        return commentDao.getComments(videoId, pageSize, offset, isSubComment, parentId)
                .stream()
                .map(comment -> {
                    CommentDto commentDto = toCommentDto(comment);
                    UserDTO user = userService.getUser(commentDto.getUserId());
                    Long likes = getLikeCount(commentDto);
                    commentDto.setUsername(user.getUsername());
                    commentDto.setImageUrl(user.getProfilePicture());
                    commentDto.setReplyCount(getReplyCount(commentDto.getId()));
                    commentDto.setLikeCount(likes);

                    if(isSubComment) {
                        UserDTO to = userService.getUser(commentDto.getToUserId());
                        commentDto.setTo(to.getUsername());
                    }
                    return commentDto;
                })
                .collect(Collectors.toList());
    }

    /**
     * delete a comment
     * @param id the comment id
     */
    @Override
    public CommentDto delete(Long id) {
        CommentDto commentDto = toCommentDto(commentDao.get(id));
        commentDao.delete(id);
        return commentDto;
    }

    /**
     * Update comment text
     * @param commentText the text
     * @return the updated Comment
     */
    @Override
    public CommentDto updateComment(String commentText, Long id) {
        CommentDto commentDto = toCommentDto(commentDao.updateComment(commentText, id));

        UserDTO user = userService.getUser(commentDto.getUserId());
        commentDto.setUsername(user.getUsername());
        commentDto.setImageUrl(user.getProfilePicture());

        commentDto.setReplyCount(getReplyCount(commentDto.getId()));
        commentDto.setLikeCount(getLikeCount(commentDto));

        if(commentDto.getParentCommentId() != null) {
            //Comment parentComment = commentDao.get(commentDto.getParentCommentId());
            UserDTO to = userService.getUser(commentDto.getToUserId());//userService.getUser(parentComment.getUserId());
            commentDto.setTo(to.getUsername());
        }
        return commentDto;
    }

    /**
     * get reply count for comment
     * @param id the comment id
     * @return the count
     */
    @Override
    public Long getReplyCount(Long id) {
        return commentDao.getCommentCount(id);
    }


    /**
     * get comment count for video
     * @param videoId the video id
     * @return the count
     */
    @Override
    public Long getVideoCommentsCount(Long videoId) {
        return commentDao.getVideoCommentsCount(videoId);
    }

    /**
     * get like count
     * @param commentDto the comment DTO
     * @return the like count
     */
    private Long getLikeCount(CommentDto commentDto) {
        LikeForm likeForm = new LikeForm();
        likeForm.setUserId(commentDto.getUserId());
        likeForm.setCommentId(commentDto.getId());
        return likeService.getLikeCount(likeForm);
    }

    private CommentDto toCommentDto(Comment comment) {
        return commentDTOMapper.toCommentDto(comment);
    }
}
