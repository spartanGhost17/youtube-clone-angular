import { createActionGroup, props } from "@ngrx/store";
import { PlaylistForm } from "../../types/playlistForm.interface";
import { PlaylistInterface } from "../../types/playlist.interface";
import { ResponseMessagesInterface } from '../../types/responseMessages.interface';
import { VideoItemFormInterface } from "../../types/videoItemForm.interface";

export const playlistActions = createActionGroup({
    source: 'playlist',
    events: {
        'Create': props<{request: PlaylistForm}>(),
        'Create Success': props<{responseMessages: ResponseMessagesInterface}>(),
        'Create Failure': props<{errors: ResponseMessagesInterface}>(),

        'Get By Id': props<{request: number}>(),
        'Get By Id Success': props<{playlist: PlaylistInterface, responseMessages: ResponseMessagesInterface}>(),
        'Get By Id Failure': props<{errors: ResponseMessagesInterface}>(),
        
        'Get By User': props<{request: number}>(),
        'Get By User Success': props<{playlists: PlaylistInterface[], responseMessages: ResponseMessagesInterface}>(),
        'Get By User Failure': props<{errors: ResponseMessagesInterface}>(),

        'Update Metadata': props<{request: PlaylistForm}>(),
        'Update Metadata Success': props<{playlist: PlaylistInterface, responseMessages: ResponseMessagesInterface}>(),
        'Update Metadata Failure': props<{errors: ResponseMessagesInterface}>(),
        
        'Add Video': props<{request: VideoItemFormInterface}>(),
        'Add Video Success': props<{responseMessages: ResponseMessagesInterface}>(),
        'Add Video Failure': props<{errors: ResponseMessagesInterface}>(),
        //TODO: Add Delete video from playlist 
        'Get Videos': props<{request: number}>(),
        'Get Videos Success': props<{playlist: PlaylistInterface[], responseMessages: ResponseMessagesInterface}>(),
        'Get Videos Failure': props<{errors: ResponseMessagesInterface}>(),
        
        'Update Videos Position': props<{request: VideoItemFormInterface[]}>(),
        'Update Videos Position Success': props<{responeMessages: ResponseMessagesInterface}>(),
        'Update Videos Position Failure': props<{errors: ResponseMessagesInterface}>(),

        'Delete': props<{request: number}>(),
        'Delete Success': props<{responseMessages: ResponseMessagesInterface}>(),
        'Delete Failure': props<{errors: ResponseMessagesInterface}>()
    }
});