export interface CommentForm {
    userId?: number;
    videoId: number;
    commentText: string;
    parentCommentId?: number;
}