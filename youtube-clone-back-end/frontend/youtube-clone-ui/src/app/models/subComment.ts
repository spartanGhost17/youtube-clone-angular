export interface SubComment {
    id?: string,
    iconURL: string,
    userId: string,
    postTime: string,
    text: string,
    to: string,
    likeCount: number,
    dislikeCount?: number, 
    like?: boolean,
    dislike?: boolean,
    showReply?: boolean
}