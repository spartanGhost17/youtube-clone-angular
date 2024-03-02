import { CurrentUserInterface } from "./currentUser.interface";
import { ResponseMessagesInterface } from "./responseMessages.interface";

export interface CurrentUserStateInterface {
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined,
    validationMessages: ResponseMessagesInterface | null,
    validationErrors: ResponseMessagesInterface | null
}