import { Tag } from "./tag";
import { UserInterface } from "../shared/types/user.interface";

export interface Video {
    id: string;
    title: string;
    description?: string;
    likeCount?: number;
    createDate?: string; 
    tags?: Tag[];
    videoStatus: string;
    thumbnailURL?: string;
    videoURL?: string;
    upload_date?: string;
    duration?: number;
    views?: number;
    user?: UserInterface; 
}