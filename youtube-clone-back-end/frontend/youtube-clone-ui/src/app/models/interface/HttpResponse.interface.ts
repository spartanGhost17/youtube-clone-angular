export interface HttpResponse<T> {
    timeStamp: string;
    path?: string;
    statusCode: number;
    status: string;
    reason?: string;//only if error
    message: string;
    developerMessage?: string;
    data?: Map<string, T>;
}