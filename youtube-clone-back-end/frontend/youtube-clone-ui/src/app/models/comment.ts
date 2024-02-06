import { SubComment } from "./subComment";

export interface Comment {
    id?: string;
    userId?: string,
    imageURL?: string,
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