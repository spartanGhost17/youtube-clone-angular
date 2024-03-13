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