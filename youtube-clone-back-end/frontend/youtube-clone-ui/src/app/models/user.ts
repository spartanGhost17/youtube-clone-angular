export interface User {
    id: string;
    imageURL?: string;
    firstName?: string;
    lastName?: string;
    emailAddress?: string;
    profilePictureURL?: string;
    subscribedToUsers?: string[];//ids of user being subscribed to
    subscribers?: string[];//ids of user currently subscribed
    videoHistory?: string[];//ids of video watched
    likedVideos?: string[];//ids of liked watched
    dislikedVideos?: string[];//ids of disliked videos
    PlayListsIds?: string[];//ids of owned playlists
}