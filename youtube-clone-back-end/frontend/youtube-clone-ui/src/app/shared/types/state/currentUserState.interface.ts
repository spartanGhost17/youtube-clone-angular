import { CurrentUserInterface } from "../currentUser.interface";
import { ResponseMessagesInterface } from "../responseMessages.interface";
import { UserInterface } from "../user.interface";

export interface CurrentUserStateInterface {
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined,
    subscriptions: UserInterface[] | undefined,
    validationMessages: ResponseMessagesInterface | null,
    validationErrors: ResponseMessagesInterface | null
}