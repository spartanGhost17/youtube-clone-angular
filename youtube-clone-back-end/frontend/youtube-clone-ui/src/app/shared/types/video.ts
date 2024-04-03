import { Time } from "@angular/common";
import { Tag } from "../../models/tag";
import { Status } from "./status.interface";
import { UserInterface } from "./user.interface";
import { VideoThumbnail } from "./videoThumbnail.interface";

export interface Video {
    /*id: string;
    title: string;
    description?: string;
    likeCount?: number;
    createdAt?: Date; 
    tags?: Tag[];
    status: Status;
    thumbnailURL?: string;
    videoURL?: string;
    upload_date?: string;
    duration?: number;
    views?: number;
    user?: UserInterface;
    position?: number; 
    commentEnabled?: boolean*/
    id: number;
    position?: number;
    userId?: number;
    title: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    duration?: Time;
    stopAt?: Time;
    totalBytes?: number;
    stopAtBytes?: number;
    views?: number;
    commentEnabled?: boolean;
    thumbnailId?: number;
    thumbnailUrl?: string;
    videoThumbnails?: VideoThumbnail[];
    videoUrl?: string;
    location?: string;
    reported?: boolean;
    //extra fields
    likeCount?: number;
    status?: Status;
    gifUrl?: string;
    tags?: Tag[];
    username?: string;
    channelName?: string;
    user?: UserInterface
}