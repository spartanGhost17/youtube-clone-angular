import { createAction, createActionGroup, props } from "@ngrx/store";
import { User } from "../app/models/user";

const userApiActions = createActionGroup({
    source: '[User API]',
    events: {
        'Get User Success': props<{user: User}>,
        'Get User Failure': props<{user: User}>
    }
});

export const getUser = createAction('[User] Get User');
export const getUserSuccess = createAction('[User] Get User Success', props<{user: User}>);
export const getUserFailure = createAction('[User] Get User Failure', props<{user: User}>);