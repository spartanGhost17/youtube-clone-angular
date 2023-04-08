import { Video } from './video';
export interface Playlist {
    id?:string;
    title: string;
    videos?: Video[];
    description?: string;
    VisibilityStatus: string;
}