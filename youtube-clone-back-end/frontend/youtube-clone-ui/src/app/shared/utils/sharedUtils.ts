import { HttpResponseInterface } from "../types/httpResponse.interface";
import { ResponseMessagesInterface } from "../types/responseMessages.interface";

// Define the copyProperties function
export function toResponseMessage<T>(source: HttpResponseInterface<T>) : ResponseMessagesInterface {
    let target: ResponseMessagesInterface = {
        timeStamp: source.timeStamp,
        statusCode: source.statusCode,
        status: source.status
    };
    if (source.path !== undefined) {
        console.log("path: " + source.path);
        target.path = source.path;
    }
    if (source.reason !== undefined) {
        console.log("reason: " + source.reason);
        target.reason = source.reason;
    }
    if (source.message !== undefined) {
        target.message = source.message;
    }
    if (source.developerMessage !== undefined) {
        target.developerMessage = source.developerMessage;
    }
    if (source["tokens"] !== undefined) {
        // Handle copying Map tokens if needed
        target.tokens = {};//new Map<any, any>//new Map<string, string>();
        if(source["tokens"]["access_token"]) {
          target["tokens"]['access_token'] = source["tokens"]["access_token"]!;
        }
        if(source["tokens"]["refresh_token"]) {
            target["tokens"]["refresh_token"] = source["tokens"]['refresh_token'] //source.tokens.get("refresh_token")!);
        }
    }
    return target;
}