import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { PlaylistService } from "../../services/playlist/playlist.service";
import { ProgressBarService } from "../../services/progress-bar/progress-bar.service";
import { HttpResponseInterface } from "../../types/httpResponse.interface";
import { PlaylistInterface } from '../../types/playlist.interface';
import { playlistActions } from "./actions";
import { HttpErrorResponse } from "@angular/common/http";
import { toResponseMessage } from "../../utils/sharedUtils";

export const getPlaylistEffect = createEffect((
    actions$ = inject(Actions),
    progressBarService = inject(ProgressBarService),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.getByUser),
        switchMap(({request}) => {
            return playlistService.getUserPlaylists(request).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    const playlists: PlaylistInterface[] = response.data['playlist'];

                    return playlistActions.getByUserSuccess({
                        playlists: playlists,
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.getByUserFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//create playlist
export const createPlaylistEffect = createEffect((
    actions$ = inject(Actions),
    progressBarService = inject(ProgressBarService),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.create),
        switchMap(({request}) => {
            return playlistService.createPlaylist(request).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    const playlists: PlaylistInterface[] = response.data['playlist'];

                    return playlistActions.createSuccess({
                        playlists: playlists,
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.getByUserFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//get history playlist
export const getHistoryEffect = createEffect((
    actions$ = inject(Actions),
    progressBarService = inject(ProgressBarService),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.getHistory),
        switchMap(({userId, name, pageSize, offset}) => {
            return playlistService.getByName(userId, pageSize, offset, name).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    const playlists: PlaylistInterface = response.data['playlist'];

                    return playlistActions.getHistorySuccess({
                        playlist: playlists,
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.getHistoryFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//get watch later playlist
export const getWatchedLaterEffect = createEffect((
    actions$ = inject(Actions),
    progressBarService = inject(ProgressBarService),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.getWatchLater),
        switchMap(({userId, name, pageSize, offset}) => {
            return playlistService.getByName(userId, pageSize, offset, name).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    const playlists: PlaylistInterface = response.data['playlist'];

                    return playlistActions.getWatchLaterSuccess({
                        playlist: playlists,
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.getWatchLaterFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//get history playlist
export const getLikedEffect = createEffect((
    actions$ = inject(Actions),
    progressBarService = inject(ProgressBarService),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.getLiked),
        switchMap(({userId, name, pageSize, offset}) => {
            return playlistService.getByName(userId, pageSize, offset, name).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    const playlists: PlaylistInterface = response.data['playlist'];

                    return playlistActions.getLikedSuccess({
                        playlist: playlists,
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.getLikedFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//add video
export const addVideoEffect = createEffect((
    actions$ = inject(Actions),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.addVideo),
        switchMap(({request}) => {
            return playlistService.addVideo(request).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    return playlistActions.addVideoSuccess({
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.addVideoFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//delete video
export const deleteVideoEffect = createEffect((
    actions$ = inject(Actions),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.deleteVideo),
        switchMap(({request}) => {
            return playlistService.deleteVideo(request).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    return playlistActions.deleteVideoSuccess({
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.deleteVideoFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});

//delete playlist
export const deletePlaylistEffect = createEffect((
    actions$ = inject(Actions),
    playlistService = inject(PlaylistService)
) => {
    return actions$.pipe(
        ofType(playlistActions.delete),
        switchMap(({request}) => {
            return playlistService.delete(request).pipe(
                map((response: HttpResponseInterface<PlaylistInterface[]>) => {
                    const playlist: PlaylistInterface = response.data['playlist'];

                    return playlistActions.deleteSuccess({
                        playlist: playlist,
                        responseMessages: toResponseMessage(response)
                    })
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(playlistActions.deleteFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            );
        })
    )
},{functional: true});