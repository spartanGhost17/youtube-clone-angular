import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Role } from "../../types/Role";
import { ResponseMessagesInterface } from '../../types/responseMessages.interface';


export const permissionsActions = createActionGroup({
    source: "permissions",
    events: {
        'Load All Permissions': emptyProps(),
        'Load All Permissions Success': props<{roles: Role[], responseMessage: ResponseMessagesInterface}>(),
        'Load All Permissions Failure': props<{errors: ResponseMessagesInterface}>()
    }

});