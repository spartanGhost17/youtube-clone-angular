import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ProgressBarService } from '../../../shared/services/progress-bar/progress-bar.service';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpResponseInterface } from '../../../shared/types/httpResponse.interface';
import { toResponseMessage } from '../../../shared/utils/sharedUtils';
import { AuthenticationService } from '../service/authentication.service';
import { authActions } from './actions';
import { ResponseMessagesInterface } from '../../../shared/types/responseMessages.interface';
import { Router } from '@angular/router';

//create effect is like a listener, listening to some action (start process, success or error)
export const loginEffect = createEffect(
  (
    //get all actions
    actions$ = inject(Actions),
    authService = inject(AuthenticationService),
    progressBarService = inject(ProgressBarService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.login), //limit to actions of this type (login is start of login process)
      switchMap(({ request }) => {
        progressBarService.startLoading(); //start progress
        return authService.login(request).pipe(
          map((response: HttpResponseInterface<CurrentUserInterface>) => {
            const user: CurrentUserInterface = response.data.user;
            progressBarService.completeLoading(); //stop progress
            router.navigate(['/home/explore'])
            return authActions.loginSuccess({
              currentUser: user,
              responseMessages: toResponseMessage(response), //map fields to ResponseMessageInterface
            });
          }),
          catchError((error: HttpErrorResponse) => {
            progressBarService.completeLoading();
            return of(
              authActions.loginFailure({
                errors: toResponseMessage(error.error),
              })
            ); //??
          })
        ); //do transformation
      }) //switch map returns a new observable
    ); //group actions
  },
  { functional: true }
);
//registration effects
export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthenticationService),
    progressBarService = inject(ProgressBarService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register), //start of registration process
      switchMap(({ request }) => {
        progressBarService.startLoading();
        return authService.register(request).pipe(
          map((response: HttpResponseInterface<CurrentUserInterface>) => {
            const user: CurrentUserInterface = response.data.user;
            progressBarService.completeLoading(); //stop progress

            return authActions.registerSucces({
              currentUser: user,
              responseMessages: toResponseMessage(response),
            });
          }),
          catchError((error: HttpErrorResponse) => {
            progressBarService.completeLoading(); //stop progress

            return of(
              authActions.registerFailure({
                errors: toResponseMessage(error.error),
              })
            );
          })
        );
      }) //get new observable
    );
  },
  { functional: true }
);

//reset password start
export const resetPasswordEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthenticationService),
    progressBarService = inject(ProgressBarService)
  ) => {
    return actions$.pipe(
      ofType(authActions.resetPassword), //start of registration process
      switchMap(({ request }) => {
        progressBarService.startLoading();
        console.log(`request ${request}`);
        return authService.resetPassword(request).pipe(
          map((response: HttpResponseInterface<ResponseMessagesInterface>) => {
            progressBarService.completeLoading(); //stop progress

            return authActions.resetPasswordSuccess({
              responseMessages: toResponseMessage(response),
            });
          }),
          catchError((error: HttpErrorResponse) => {
            progressBarService.completeLoading(); //stop progress

            return of(
              authActions.resetPasswordFailure({
                errors: toResponseMessage(error.error),
              })
            );
          })
        );
      }) //get new observable
    );
  },
  { functional: true }
);

//verifiy password reset link
export const verifyPasswordResetLinkEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthenticationService),
    progressBarService = inject(ProgressBarService)
  ) => {
    return actions$.pipe(
      ofType(authActions.verifyResetLink), //start of registration process
      switchMap(({ request }) => {
        progressBarService.startLoading();
        return authService.verifyPasswordLink(request).pipe(
          map((response: HttpResponseInterface<ResponseMessagesInterface>) => {
            progressBarService.completeLoading(); //stop progress

            return authActions.verifyResetLinkSuccess({
              responseMessages: toResponseMessage(response),
            });
          }),
          catchError((error: HttpErrorResponse) => {
            progressBarService.completeLoading(); //stop progress

            return of(
              authActions.verifyResetLinkFailure({
                errors: toResponseMessage(error.error),
              })
            );
          })
        );
      }) //get new observable
    );
  },
  { functional: true }
);

//renew password
export const updatePasswordEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthenticationService),
    progressBarService = inject(ProgressBarService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(authActions.renewPassword),
      switchMap(({ request, key }) => {
        progressBarService.startLoading();

        return authService.updatePassword(key, request).pipe(
          map((response: HttpResponseInterface<ResponseMessagesInterface>) => {
            progressBarService.completeLoading(); //stop progress
            router.navigate(['/verify/password']);//navigate 
            return authActions.renewPasswordSuccess({
              responseMessages: toResponseMessage(response),
            });
          }),
          catchError((error: HttpErrorResponse) => {
            progressBarService.completeLoading(); //stop progress

            return of(
              authActions.renewPasswordFailure({
                errors: toResponseMessage(error.error),
              })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
