import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProgressBarService } from "../../services/progress-bar/progress-bar.service";
import { UserService } from "../../services/user/user.service";
import { userActions } from "./actions";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { HttpResponseInterface } from "../../types/httpResponse.interface";
import { CurrentUserInterface } from "../../types/currentUser.interface";
import { toResponseMessage } from "../../utils/sharedUtils";
import { HttpErrorResponse } from "@angular/common/http";
import { UpdateUserForm } from '../../types/updateUserForm.interface';
import { request } from 'http';

export const updateProfilePictureEffect = createEffect((
    actions$ = inject(Actions),
    progressBarService = inject(ProgressBarService),
    userService = inject(UserService)
) => {
    return actions$.pipe(
        ofType(userActions.updateProfilePicture),
        switchMap(({request}) => {
            progressBarService.startLoading();
            return userService.updateProfilePicture(request).pipe(
                //tap(() => {}),
                map((response: HttpResponseInterface<CurrentUserInterface>) => {
                    progressBarService.completeLoading();
                    const user: CurrentUserInterface = response.data['user'];
                    console.log(`the old url ${user.profilePicture}`)
                    user.profilePicture = `${response.data['user'].profilePicture}?time=${new Date().getTime()}`;
                    console.log(`the new url: ${user.profilePicture}`);
                    console.log(`user ${user}`)
                    return userActions.updateProfilePictureSuccess({
                        currentUser: user,
                        responseMessages: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    progressBarService.completeLoading();

                    return of(userActions.updateProfilePictureFailure({
                        errors: toResponseMessage(error.error)
                    }));
                })
            )
        })
    )
}, {functional: true});

export const loadProfileEffect = createEffect((
    actions$ = inject(Actions),
    //progressBarService = inject(ProgressBarService),
    userService = inject(UserService)
) => {
    return actions$.pipe(
        ofType(userActions.loadProfile),
        switchMap(() => {
            return userService.getUser().pipe(
                //tap(() => {}),
                map((response: HttpResponseInterface<CurrentUserInterface>) => {
                    return userActions.loadProfileSuccess({
                        currentUser: response.data['user'],
                        responseMessages: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(userActions.loadProfileFailure({
                        errors: toResponseMessage(error.error)
                    }));
                })
            )
        })
    )
}, {functional: true});

//update profile
export const updateProfileEffect = createEffect((
    actions$ = inject(Actions),
    userService = inject(UserService)
) => {
    return actions$.pipe(
        ofType(userActions.update),
        switchMap(({request}) => {
            return userService.updateProfile(request).pipe(
                map((response: HttpResponseInterface<CurrentUserInterface>) => {
                    return userActions.updateSuccess({
                        currentUser: response.data['user'],
                        responseMessages: toResponseMessage(response)
                    });
                }),
                catchError((error: HttpErrorResponse) => {
                    return of(userActions.updateFailure({
                        errors: toResponseMessage(error.error)
                    }));
                })
            )
        })
    )
}, {functional: true});