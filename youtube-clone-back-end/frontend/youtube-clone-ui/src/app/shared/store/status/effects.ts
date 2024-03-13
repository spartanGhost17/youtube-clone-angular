import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { StatusService } from "../../services/status/status.service";
import { HttpResponseInterface } from "../../types/httpResponse.interface";
import { Status } from "../../types/status.interface";
import { StatusActions } from "./actions";
import { HttpErrorResponse } from "@angular/common/http";
import { toResponseMessage } from "../../utils/sharedUtils";

export const getAllStatusEffect = createEffect((
    actions$ = inject(Actions),
    statusService = inject(StatusService)
) => {
    return actions$.pipe(
        ofType(StatusActions.getStatus),
        switchMap(() => {
            return statusService.getAll().pipe(
                map((response: HttpResponseInterface<Status[]>) => {
                    return StatusActions.getStatusSuccess({
                        status: response.data['status'],
                        responseMessages: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(StatusActions.getStatusFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            ); 
        })
    );
}, {functional: true});

export const updateVideoStatusEffect = createEffect((
    actions$ = inject(Actions),
    statusService = inject(StatusService)
) => {
    return actions$.pipe(
        ofType(StatusActions.updateVideoStatus),
        switchMap(({videoId, statusId}) => {
            return statusService.updateVideoStatus(videoId, statusId).pipe(
                map((response: HttpResponseInterface<Status[]>) => {
                    return StatusActions.updateVideoStatusSuccess({
                        status: response.data['status'],
                        responseMessages: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(StatusActions.updateVideoStatusFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            ); 
        })
    );
}, {functional: true});


export const updatePlaylistStatusEffect = createEffect((
    actions$ = inject(Actions),
    statusService = inject(StatusService)
) => {
    return actions$.pipe(
        ofType(StatusActions.updatePlaylistStatus),
        switchMap(({playlistId, statusId}) => {
            return statusService.updatePlaylistStatus(playlistId, statusId).pipe(
                map((response: HttpResponseInterface<Status[]>) => {
                    return StatusActions.updatePlaylistStatusSuccess({
                        status: response.data['status'],
                        responseMessages: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(StatusActions.updatePlaylistStatusFailure({
                        errors: toResponseMessage(error.error)
                    }))
                })
            ); 
        })
    );
}, {functional: true});