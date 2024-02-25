import { createAction, createActionGroup, props } from "@ngrx/store";
import { UserInterface } from "../app/shared/types/user.interface";

const userApiActions = createActionGroup({
    source: '[UserInterface API]',
    events: {
        'Get UserInterface Success': props<{user: UserInterface}>,
        'Get UserInterface Failure': props<{user: UserInterface}>
    }
});

export const getUser = createAction('[UserInterface] Get UserInterface');
export const getUserSuccess = createAction('[UserInterface] Get UserInterface Success', props<{user: UserInterface}>);
export const getUserFailure = createAction('[UserInterface] Get UserInterface Failure', props<{user: UserInterface}>);