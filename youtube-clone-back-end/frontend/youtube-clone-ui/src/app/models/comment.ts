import { SubComment } from "./subComment";

export interface Comment {
    //id?: number;
    //userId?: number,
    //username?: string;
    //imageUrl?: string,
    //commentText?: string,
    //postTime?: string,
    //replyCount?: number,
    //likeCount?: number,

    id: number;
    userId: number;
    videoId: number;
    commentText: string;
    createdAt: Date;
    lastUpdated: Date;
    parentCommentId: number | undefined;
    //extra fields
    likeCount: number;
    replyCount: number;
    imageUrl: string;
    username: string;

    dislikeCount?: number;
    subComments: SubComment[];
    like?: boolean;
    dislike?: boolean;
    showReply?: boolean;
    showReplies?: boolean;
    reported?: boolean;
    pageSize?: number;
    offset?: number;
    to?: string;

    /**
     * 
    id: number;
    userId: number;
    videoId: number;
    commentText: string;
    createdAt: Timestamp;
    lastUpdated: Timestamp;
    parentCommentId: number;
    reported: number;
    //extra fields
    likeCount: number;
    replyCount: number;
    imageUrl: string;
    username: string;
     */
}