import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ResponseMessagesInterface } from '../../types/responseMessages.interface';
import { CurrentUserInterface } from "../../types/currentUser.interface";
import { UpdateUserForm } from "../../types/updateUserForm.interface";

export const userActions = createActionGroup({
    source: 'user',
    events: {
        'Update': props<{request: UpdateUserForm}>(),
        'Update Success': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
        'Update Failure': props<{errors: ResponseMessagesInterface}>(),

        'Load Profile': emptyProps(),
        'Load Profile Success': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
        'Load Profile Failure': props<{errors: ResponseMessagesInterface}>(),

        'Update Profile Picture': props<{request: FormData}>(),
        'Update Profile Picture Success': props<{currentUser: CurrentUserInterface, responseMessages: ResponseMessagesInterface}>(),
        'Update Profile Picture Failure': props<{errors: ResponseMessagesInterface}>(),
    }
});