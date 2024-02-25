import { Role } from "./Role";

export interface CurrentUserInterface {
    id: number;
    channelName: string;
    createdAt?: Date;
    email?: string;
    phone?: string;
    verified?: boolean;
    description?: string;
    enabled?: boolean;
    nonLocked?: boolean;
    usingMfa?: boolean;
    profilePictureURL?: string;
    authorities?: Role[]; 
}