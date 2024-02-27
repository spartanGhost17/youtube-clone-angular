import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
  isPasswordLinkValid: false,
  validationMessages: null,
  validationErrors: null,
  accessToken: undefined,
  refreshToken: undefined,
  isResetPasswordEmailSent: false
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState, //initial state of the feature
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      isResetPasswordEmailSent: false,
      isPasswordLinkValid: false,
      validationErrors: null, //remove errors if they happened
      validationMessages: null
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false, 
      currentUser: action.currentUser,
      //isResetPasswordEmailSent: false,
      //isPasswordLinkValid: false,
      accessToken: action.responseMessages.tokens['access_token'],
      refreshToken: action.responseMessages.tokens['refresh_token'],
      validationMessages: action.responseMessages,
      //validationErrors: null
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: false,
      isPasswordLinkValid: false,
      validationMessages: null,
      validationErrors: action.errors
    })),

    //register reducers
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      isResetPasswordEmailSent: false,
      isPasswordLinkValid: false,
      validationMessages: null,
      validationErrors: null, //remove errors if they happened
    })),
    on(authActions.registerSucces, (state, action) => ({
      ...state,
      isSubmitting: false, 
      //isResetPasswordEmailSent: false,
      //isPasswordLinkValid: false,
      currentUser: action.currentUser,
      validationMessages: action.responseMessages,
      //validationErrors: null
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      //isResetPasswordEmailSent: false,
      //isPasswordLinkValid: false,
      //validationMessages: null,
      validationErrors: action.errors
    })),

    //--reset password process start
    //reset password
    on(authActions.resetPassword, (state) => ({
      ...state,
      isSubmitting: true,
      isResetPasswordEmailSent: false,
      isPasswordLinkValid: false,
      validationMessages: null,
      validationErrors: null, //remove errors if they happened
    })),
    on(authActions.resetPasswordSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: true,
      validationMessages: action.responseMessages,
    })),
    on(authActions.resetPasswordFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
    //verify password
    on(authActions.verifyResetLink, (state) => ({
      ...state,
      isSubmitting: true,
      isResetPasswordEmailSent: true,
      isPasswordLinkValid: false,
      validationMessages: null,
      validationErrors: null
    })),
    on(authActions.verifyResetLinkSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isPasswordLinkValid: true,
      validationMessages: action.responseMessages,
    })),
    on(authActions.verifyResetLinkFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
    //update password
    on(authActions.renewPassword, (state) => ({
      ...state,
      isSubmitting: true,
      validationMessages: null,
      validationErrors: null
    })),
    on(authActions.renewPasswordSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: false,
      isPasswordLinkValid: false,
      validationMessages: action.responseMessages,
      validationErrors: null,
    })),
    on(authActions.renewPasswordFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),

  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuthState,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectIsResetPasswordEmailSent,
  selectIsPasswordLinkValid,
  selectAccessToken,
  selectRefreshToken,
  selectValidationMessages,
  selectValidationErrors
} = authFeature;
