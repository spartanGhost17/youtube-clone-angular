import { Status } from './status.interface';
import { Video } from './video';
export interface PlaylistInterface {
    id?:number;
    name: string;
    userId?: number;
    createdAt?: Date;
    lastUpdated?: Date;
    thumbnailUrl?: string;
    description?: string;
    videos?: Video[];
    visibilityStatus: Status;
    size?: number;
}