import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { ResponseMessagesInterface } from '../../../shared/types/responseMessages.interface';
import { LoginFormInterface } from '../types/loginForm.interface';
import { RegisterFormInterface } from '../types/registerForm.interface';
import { UpdatePasswordFormInterface } from '../types/updatePasswordForm.interface';
import { VerifyPasswordInterface } from '../types/verifyPassword.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{request: RegisterFormInterface}>(),
    'Register Succes': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
    'Register Failure': props<{errors: ResponseMessagesInterface}>(),
    
    Login: props<{request: LoginFormInterface}>(),
    'Login Success': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
    'Login Failure': props<{errors: ResponseMessagesInterface}>(),//emptyProps()
    //reset password flow start
    'Reset Password': props<{request: string}>(),
    'Reset Password Success': props<{responseMessages: ResponseMessagesInterface}>(),
    'Reset Password Failure': props<{errors: ResponseMessagesInterface}>(),
    //password reset link validation
    'Verify Reset Link': props<{request: VerifyPasswordInterface}>(),
    'Verify Reset Link Success': props<{responseMessages: ResponseMessagesInterface}>(),
    'Verify Reset Link Failure': props<{errors: ResponseMessagesInterface}>(),
    //renew password
    'Renew Password': props<{request: UpdatePasswordFormInterface}>(),
    'Renew Password Success': props<{responseMessages: ResponseMessagesInterface}>(),
    'Renew Password Failure': props<{errors: ResponseMessagesInterface}>(),
  }
});