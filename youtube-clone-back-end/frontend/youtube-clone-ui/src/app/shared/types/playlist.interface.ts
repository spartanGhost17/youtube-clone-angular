import { Video } from './video';
export interface PlaylistInterface {
    id?:number;
    name: string;
    description?: string;
    videos?: Video[];
    visibilityStatus: string;
    size?: number;
}