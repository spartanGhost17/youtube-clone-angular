import { CurrentUserInterface } from "../../../shared/types/currentUser.interface";
import { ResponseMessagesInterface } from "../../../shared/types/responseMessages.interface";

export interface AuthStateInterface {
    isSubmitting: boolean;
    currentUser: CurrentUserInterface | null | undefined;//user is null when not logged in and undefined at the start of login process
    isLoading: boolean;
    isResetPasswordEmailSent: boolean;
    isPasswordLinkValid: boolean;
    validationMessages: ResponseMessagesInterface | null,
    validationErrors: ResponseMessagesInterface | null,
    accessToken: string | undefined,
    refreshToken: string | undefined,
}