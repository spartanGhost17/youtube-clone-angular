import { createFeature, createReducer, on } from "@ngrx/store";
import { PlaylistsStateInterface } from "../../types/state/playlistsState.interface";
import { playlistActions } from "./actions";
import { PlaylistInterface } from "../../types/playlist.interface";

const initialState: PlaylistsStateInterface = {
    isLoading: false,
    playlists: [],
    ValidationMessages: null,
    ValidationErrors: null,
    /*history: null,
    watchLater: null,
    liked: null*/
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
            playlists: action.playlists.reduce((acc, playlist) => {
                // Check if the playlist doesn't already exist in the state
                if (!playlistExistsInState(state.playlists, playlist)) {
                  acc.push(playlist);
                }
                return acc;
              }, [...state.playlists]),//state.playlists.length <= 0? action.playlists : [...state.playlists, ...action.playlists],
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.getByUserFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),
        
        //get liked liked
        on(playlistActions.getLiked, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.getLikedSuccess, (state, action) => ({
            ...state,
            playlists: [...state.playlists, action.playlist],
            //liked:  action.playlist,
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.getLikedFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),

        //get history playlist
        on(playlistActions.getHistory, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.getHistorySuccess, (state, action) => ({
            ...state,
            playlists: [...state.playlists, action.playlist],
            //history:  action.playlist,
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.getHistoryFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),

        //get watch later watch later
        on(playlistActions.getWatchLater, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.getWatchLaterSuccess, (state, action) => ({
            ...state,
            playlists: [...state.playlists, action.playlist],
            //watchLater:  action.playlist,
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.getWatchLaterFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),

        //create playlist
        on(playlistActions.create, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.createSuccess, (state, action) => ({
            ...state,
            playlists: [...state.playlists, ...action.playlists],
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.createFailure, (state, action) => ({
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

        //delete playlist
        on(playlistActions.delete, (state) => ({
            ...state,
            ValidationMessages: null,
            ValidationErrors: null
        })),
        on(playlistActions.deleteSuccess, (state, action) => ({
            ...state,
            playlists: state.playlists.filter(pl => pl.id !== action.playlist.id),
            ValidationMessages: action.responseMessages
        })),
        on(playlistActions.deleteFailure, (state, action) => ({
            ...state,
            ValidationErrors: action.errors
        })),
    )
});

// Define a helper function to check if a playlist already exists in the state
function playlistExistsInState(statePlaylists: PlaylistInterface[], playlist: PlaylistInterface): boolean {
    return statePlaylists.some(p => p.id === playlist.id);
} 

export const {
    name: playlistFeatureKey,
    reducer: playlistReducer,
    selectIsLoading,
    selectPlaylists,
    /*selectHistory,
    selectLiked,
    selectWatchLater,*/
    selectValidationMessages,
    selectValidationErrors
} = playlistFeature;