export interface CommentRequestForm {
    videoId: number;
    pageSize: number;
    offset: number;
    parentId: number;
    isSubComment: boolean;
}