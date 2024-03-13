export interface VideoMetadataForm {
    userId: number;
    videoId: number;
    title: string;
    //thumbnailId?: number;
    description?: string;
    commentEnabled: boolean;
    location?: string;
}