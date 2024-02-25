export interface HttpResponseInterface<T> {
    timeStamp: string;
    path?: string;
    statusCode: number;
    status: string;
    reason?: string;//only if error
    message: string;
    developerMessage?: string;
    data?: any;//Map<string, T>; //TODO: figure out how to make it strongly typed
    tokens?: any;//Map<string, string>; //TODO: figure out how to make it strongly typed
}