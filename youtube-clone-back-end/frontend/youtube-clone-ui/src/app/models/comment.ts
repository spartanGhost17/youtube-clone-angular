import { SubComment } from "./subComment";

export interface Comment {
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
    toUserId?: number;
}