import { ResponseMessagesInterface } from "../responseMessages.interface";
import { Status } from "../status.interface";

export interface StatusState {
    isLoading: boolean;
    data: Status[] | null; 
    validationMessages: ResponseMessagesInterface | null;
    validationErrors: ResponseMessagesInterface | null;
}