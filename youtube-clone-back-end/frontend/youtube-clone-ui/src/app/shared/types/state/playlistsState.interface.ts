import { PlaylistInterface } from "../playlist.interface";
import { ResponseMessagesInterface } from "../responseMessages.interface";

export interface PlaylistsStateInterface {
    isLoading: boolean;
    playlists: PlaylistInterface[];
    /*history: PlaylistInterface | null;
    watchLater: PlaylistInterface | null;
    liked: PlaylistInterface | null;*/
    ValidationMessages: ResponseMessagesInterface | null;
    ValidationErrors: ResponseMessagesInterface | null;
}