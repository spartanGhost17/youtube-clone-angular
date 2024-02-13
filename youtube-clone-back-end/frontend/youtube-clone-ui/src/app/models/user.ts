export interface User {
    id: string;
    username: string;
    channelName: string;
    iconURL?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    profilePictureURL?: string;
    verified?: boolean; 
    subscribedToUsers?: string[];//ids of user being subscribed to
    subscribers?: string[];//ids of user currently subscribed
    videoHistory?: string[];//ids of video watched
    likedVideos?: string[];//ids of liked watched
    dislikedVideos?: string[];//ids of disliked videos
    PlayListsIds?: string[];//ids of owned playlists
}