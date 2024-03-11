import { Role } from "../Role";
import { ResponseMessagesInterface } from "../responseMessages.interface";

export interface GlobalPermissionStateInterface {
    isLoading: boolean;
    data: Role[] | [],
    validationMessages: ResponseMessagesInterface | null,
    validationErrors: ResponseMessagesInterface | null,
}