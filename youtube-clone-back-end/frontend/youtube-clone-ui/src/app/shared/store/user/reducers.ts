import { CurrentUserStateInterface } from "../../types/state/currentUserState.interface";
import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './actions';
import { act } from "@ngrx/effects";

export const initialState: CurrentUserStateInterface = {
    isLoading: false,
    currentUser: undefined,
    validationMessages: null,
    validationErrors: null
}

export const userFeature = createFeature({
    name: 'user',
    reducer: createReducer(
        initialState,
        on(userActions.loadProfile, (state) => ({
            ...state,
            isLoading: true,
            validationErrors: null
        })),
        on(userActions.loadProfileSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: action.currentUser,
            validationMessages: action.responseMessages
        })),
        on(userActions.loadProfileFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validationErrors: action.errors
        })),

        on(userActions.updateProfilePicture, (state) => ({
            ...state,
            isLoading: true,
            validationErrors: null
        })),
        on(userActions.updateProfilePictureSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: action.currentUser,
            responseMessages: action.responseMessages
        })),
        on(userActions.updateProfilePictureFailure, (state, action) => ({
            ...state,
            isLoading: true,
            validationErrors: action.errors
        }))
    )
});


export const {
    name: userFeatureKey,
    reducer: userReducer,
    selectCurrentUser,
    selectIsLoading,
    selectValidationMessages,
    selectValidationErrors
} = userFeature;