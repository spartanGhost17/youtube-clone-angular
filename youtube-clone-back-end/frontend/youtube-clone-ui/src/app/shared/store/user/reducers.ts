import { CurrentUserStateInterface } from "../../types/state/currentUserState.interface";
import { createFeature, createReducer, on } from '@ngrx/store';
import { userActions } from './actions';
import { act } from "@ngrx/effects";

export const initialState: CurrentUserStateInterface = {
    isLoading: false,
    currentUser: undefined,
    subscriptions: undefined,
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
        //update profile picture
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
            isLoading: false,
            validationErrors: action.errors
        })),

        //update profile
        on(userActions.update, (state) => ({
            ...state,
            isLoading: true,
            validationErrors: null
        })),
        on(userActions.updateSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            currentUser: action.currentUser,
            responseMessages: action.responseMessages
        })),
        on(userActions.updateFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validationErrors: action.errors
        })),

        //load subscriptions
        on(userActions.getSubscriptions, (state) => ({
            ...state,
            isLoading: true,
            validationErrors: null
        })),
        on(userActions.getSubscriptionsSuccess, (state, action) => ({
            ...state,
            isLoading: false,
            subscriptions: action.subscriptions,
            responseMessages: action.responseMessages
        })),
        on(userActions.getSubscriptionsFailure, (state, action) => ({
            ...state,
            isLoading: false,
            validationErrors: action.errors
        })),
    )
});


export const {
    name: userFeatureKey,
    reducer: userReducer,
    selectCurrentUser,
    selectSubscriptions,
    selectIsLoading,
    selectValidationMessages,
    selectValidationErrors
} = userFeature;