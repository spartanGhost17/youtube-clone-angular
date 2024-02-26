import { createActionGroup, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { ResponseMessagesInterface } from '../../../shared/types/responseMessages.interface';
import { LoginFormInterface } from '../types/loginForm.interface';
import { RegisterFormInterface } from '../types/registerForm.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterFormInterface}>(),
    'Register Succes': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
    'Register Failure': props<{errors: ResponseMessagesInterface}>(),
    
    Login: props<{request: LoginFormInterface}>(),
    'Login Success': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
    'Login Failure': props<{errors: ResponseMessagesInterface}>()//emptyProps()
  }
});