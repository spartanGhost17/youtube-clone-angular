import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: undefined,
  isLoading: false,
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
      validationErrors: null, //remove errors if they happened
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false, 
      currentUser: action.currentUser,
      isResetPasswordEmailSent: false,
      validationMessages: action.responseMessages,
      validationErrors: null
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: false,
      validationMessages: null,
      validationErrors: action.errors
    })),

    //register reducers
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      isResetPasswordEmailSent: false,
      validationErrors: null, //remove errors if they happened
    })),
    on(authActions.registerSucces, (state, action) => ({
      ...state,
      isSubmitting: false, 
      isResetPasswordEmailSent: false,
      currentUser: action.currentUser,
      validationMessages: action.responseMessages,
      validationErrors: null
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: false,
      validationMessages: null,
      validationErrors: action.errors
    })),

    //--reset password process start
    //reset password
    on(authActions.resetPassword, (state) => ({
      ...state,
      isSubmitting: true,
      isResetPasswordEmailSent: false,
      validationMessages: null,
      validationErrors: null, //remove errors if they happened
    })),
    on(authActions.resetPasswordSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: true,
      validationMessages: action.responseMessages,
      validationErrors: null
    })),
    on(authActions.resetPasswordFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      isResetPasswordEmailSent: false,
      validationMessages: null,
      validationErrors: action.errors
    })),
    //verify password
    on(authActions.verifyResetLink, (state) => ({
      ...state,
      isSubmitting: false,
    })),
    on(authActions.verifyResetLinkSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationMessages: action.responseMessages,
    })),
    on(authActions.verifyResetLinkFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    })),
    //update password
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectIsResetPasswordEmailSent,
  selectAccessToken,
  selectRefreshToken,
  selectValidationMessages,
  selectValidationErrors
} = authFeature;
