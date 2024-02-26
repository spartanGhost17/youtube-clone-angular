import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpResponseInterface } from '../../../shared/types/httpResponse.interface';
import { toResponseMessage } from '../../../shared/utils/sharedUtils';
import { AuthenticationService } from '../service/authentication.service';
import { authActions } from './actions';
import { ProgressBarService } from '../../../shared/services/progress-bar/progress-bar.service';



//create effect is like a listener, listening to some action (start process, success or error)
export const loginEffect = createEffect(
  (
    //get all actions
    actions$ = inject(Actions),
    authService = inject(AuthenticationService),
    progressBarService = inject(ProgressBarService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login), //limit to actions of this type (login is start of login process)
      switchMap(({ request }) => {
        progressBarService.startLoading();//start progress
        return authService.login(request).pipe(
          map((response: HttpResponseInterface<CurrentUserInterface>) => {
            const user: CurrentUserInterface = response.data.user;
            progressBarService.completeLoading();//start progress
            return authActions.loginSuccess({
                currentUser: user,
                responseMessages: toResponseMessage(response) //map fields to ResponseMessageInterface
            });
          }),
          catchError(
            ((error: HttpErrorResponse) => {
              progressBarService.completeLoading();
              return of(authActions.loginFailure({ errors: toResponseMessage(error.error)})); //??
            }
          ))
        ); //do transformation
      }) //switch map returns a new observable
    ); //group actions
  },
  { functional: true }
);

//export const registerEffect