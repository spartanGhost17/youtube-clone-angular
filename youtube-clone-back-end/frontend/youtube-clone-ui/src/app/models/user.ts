import { Role } from "./interface/Role";

export interface User {
    id: string;
    username: string;
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
    iconURL?: string;

    
    
     
    subscribedToUsers?: string[];//ids of user being subscribed to
    subscribers?: string[];//ids of user currently subscribed
    videoHistory?: string[];//ids of video watched
    likedVideos?: string[];//ids of liked watched
    dislikedVideos?: string[];//ids of disliked videos
    PlayListsIds?: string[];//ids of owned playlists
}