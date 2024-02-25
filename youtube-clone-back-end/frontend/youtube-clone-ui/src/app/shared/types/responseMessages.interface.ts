export interface ResponseMessagesInterface {
    timeStamp: string;
    path?: string;
    statusCode: number;
    status: string;
    reason?: string;//only if error
    message?: string;
    developerMessage?: string;
    tokens?: any;//Map<any, any>;//Map<string, string>;//TODO: figure out how to make it strongly typed
}