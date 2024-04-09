export interface CommentForm {
    userId?: number;
    toUserId?: number,
    videoId: number;
    commentText: string;
    parentCommentId?: number;
}