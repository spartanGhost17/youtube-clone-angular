import { createFeature, createReducer, on } from "@ngrx/store";
import { PlaylistsStateInterface } from "../../types/state/playlistsState.interface";
import { playlistActions } from "./actions";

const initialState: PlaylistsStateInterface = {
    isLoading: false,
    playlists: [],
    ValidationMessages: null,
    ValidationErrors: null
}

export const playlistFeature = createFeature({
    name: 'playlist',
    reducer: createReducer(
        initialState,
        on(playlistActions.getByUser, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.getByUserSuccess, (state, action) => ({
            ...state,
            playlists: action.playlists,
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.getByUserFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),

        //add video
        on(playlistActions.addVideo, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.addVideoSuccess, (state, action) => ({
            ...state,
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.addVideoFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),

        //delete video
        on(playlistActions.deleteVideo, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.deleteVideoSuccess, (state, action) => ({
            ...state,
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.deleteVideoFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),
    )
});

export const {
    name: playlistFeatureKey,
    reducer: playlistReducer,
    selectIsLoading,
    selectPlaylists,
    selectValidationMessages,
    selectValidationErrors
} = playlistFeature;