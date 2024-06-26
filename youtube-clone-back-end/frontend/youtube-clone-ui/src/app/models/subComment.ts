export interface SubComment {
    id?: number,
    imageUrl?: string,
    userId?: number,
    username?: string;
    createdAt: Date,
    lastUpdated: Date,
    text: string,
    to: string,
    toUserId?: number,
    parentId: number,
    likeCount: number,
    dislikeCount?: number, 
    like?: boolean,
    dislike?: boolean,
    showReply?: boolean
}