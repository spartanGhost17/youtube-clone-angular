import { SubComment } from "./subComment";

export interface Comment {
    id?: number;
    userId?: number,
    username?: string;
    imageUrl?: string,
    commentText?: string,
    postTime?: string,
    replyCount?: number,
    likeCount?: number,
    dislikeCount?: number,
    subComments?: SubComment[],
    like?: boolean,
    dislike?: boolean,
    showReply?: boolean,
    showReplies?: boolean
}