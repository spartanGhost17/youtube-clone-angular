import { PlaylistInterface } from "../playlist.interface";
import { ResponseMessagesInterface } from "../responseMessages.interface";

export interface PlaylistsStateInterface {
    isLoading: boolean;
    playlists: PlaylistInterface[];
    ValidationMessages: ResponseMessagesInterface | null;
    ValidationErrors: ResponseMessagesInterface | null;
}