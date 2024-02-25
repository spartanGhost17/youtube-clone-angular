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
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState, //initial state of the feature
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null, //remove errors if they happened
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isSubmitting: false, 
      currentUser: action.currentUser,
      validationMessages: action.responseMessages
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectIsLoading,
  selectCurrentUser,
  selectValidationErrors
} = authFeature;
