import { inject } from '@angular/core';
import { HttpResponseInterface } from '../types/httpResponse.interface';
import { ResponseMessagesInterface } from '../types/responseMessages.interface';
import { PersistanceService } from '../services/persistance/persistance.service';

// Define the copyProperties function
export function toResponseMessage<T>(
  source: HttpResponseInterface<T>
): ResponseMessagesInterface {
  let target: ResponseMessagesInterface = {
    timeStamp: source.timeStamp,
    statusCode: source.statusCode,
    status: source.status,
  };
  if (source.path !== undefined) {
    console.log('path: ' + source.path);
    target.path = source.path;
  }
  if (source.reason !== undefined) {
    console.log('reason: ' + source.reason);
    target.reason = source.reason;
  }
  if (source.message !== undefined) {
    target.message = source.message;
  }
  if (source.developerMessage !== undefined) {
    target.developerMessage = source.developerMessage;
  }
  if (source['tokens'] !== undefined) {
    // Handle copying Map tokens if needed
    target.tokens = {}; //new Map<any, any>//new Map<string, string>();
    if (source['tokens']['access_token']) {
      target['tokens']['access_token'] = source['tokens']['access_token']!;
    }
    if (source['tokens']['refresh_token']) {
      target['tokens']['refresh_token'] = source['tokens']['refresh_token']; //source.tokens.get("refresh_token")!);
    }
  }
  return target;
}

/**
 * set tokens in local storage
 * @param {any} data the tokens map
 * @param {PersistanceService} persistanceService
 */
export function setTokens(
  data: any,
  persistanceService: PersistanceService
): void {
  for (let key in data) {
    persistanceService.set(key, data[key]);
  }
}

/**
 * Builds a formData object for the update profile picture request
 * @param {File} image the image file
 * @returns {FormData} the formData object
 */
export function getFormData(image: File): FormData {
  const formData = new FormData();
  formData.append('image', image);
  return formData;
}

/**
 * builds a URI path for any request
 * @param {string} serverUrl the server URL
 * @param {string} resource the resource path
 * @returns {string} the URI path
 */
export function buildURL(serverUrl: string, resource: string): string {
  const baseUrl = serverUrl;
  const url = new URL(resource, baseUrl);
  return url.toString();
}
