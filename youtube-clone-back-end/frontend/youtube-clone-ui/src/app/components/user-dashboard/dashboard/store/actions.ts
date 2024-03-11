import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ResponseMessagesInterface } from "../../../../shared/types/responseMessages.interface";
import { CategoryInterface } from "../types/category.interface";

export const dashboardActions = createActionGroup({
    source: 'dashboard',
    events: {
        'Get All Categories': emptyProps(),
        'Get All Categories Success': props<{categories: CategoryInterface[], responseMessages: ResponseMessagesInterface}>(),
        'Get All Categories Failure': props<{errors: ResponseMessagesInterface}>()
    }
})