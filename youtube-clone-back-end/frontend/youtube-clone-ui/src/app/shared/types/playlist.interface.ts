import { Video } from '../../models/video';
export interface PlaylistInterface {
    id?:number;
    title: string;
    videos?: Video[];
    description?: string;
    visibilityStatus: string;
}