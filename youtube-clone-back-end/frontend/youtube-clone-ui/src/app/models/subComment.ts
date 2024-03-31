export interface SubComment {
    id?: number,
    imageUrl?: string,
    userId?: number,
    username?: string;
    postTime?: string,
    text: string,
    to: string,
    likeCount: number,
    dislikeCount?: number, 
    like?: boolean,
    dislike?: boolean,
    showReply?: boolean
}