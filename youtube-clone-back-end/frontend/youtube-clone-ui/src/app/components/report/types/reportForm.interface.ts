export interface ReportFormInterface {
    userId: number;
    videoId?: number;
    commentId?: number;
    reportTypeId: number;
    type: 'VIDEO' | 'COMMENT'; //('VIDEO', 'COMMENT')
    description?: string;
}