import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Status } from "../../types/status.interface";
import { ResponseMessagesInterface } from '../../types/responseMessages.interface';

export const StatusActions = createActionGroup({
    source: "status",
    events: {
        'Get Status': emptyProps(),
        'Get Status Success': props<{status: Status[], responseMessages: ResponseMessagesInterface}>(),
        'Get Status Failure': props<{errors: ResponseMessagesInterface}>(),

        'Update Video Status': props<{videoId: number, statusId: number}>(),
        'Update Video Status Success': props<{status: Status, responseMessages: ResponseMessagesInterface}>(),
        'Update Video Status Failure': props<{errors: ResponseMessagesInterface}>(),

        'Update Playlist Status': props<{playlistId: number, statusId: number}>(),
        'Update Playlist Status Success': props<{status: Status, responseMessages: ResponseMessagesInterface}>(),
        'Update Playlist Status Failure': props<{errors: ResponseMessagesInterface}>(),
    }
});