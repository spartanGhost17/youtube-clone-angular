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
export function getFormData(image: File, key: string): FormData {
  const formData = new FormData();
  formData.append(key, image);
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

/**
 * normalize a Capitalized underscored static selection for readibility purposes
 * @param {string} selection 
 * @returns the noramlized selection string
*/
export function normalizeSelection(selection: string): string {
  selection = selection.toLocaleLowerCase()
            .replaceAll('_', ' ')
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
  return selection;
}

  /**
   * formats string time by removing leading zeroes in certains instances
   * @param time string milliseconds
   * @returns return string formatted
  */
export function formatDuration(time: any): string {
  let date: string = new Date(time * 1000).toISOString().substring(11, 11 + 8);
  let currentTime: string;

  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if(hours === 0) {
    if(minutes < 10){
      currentTime = date.substring(4, date.length);
    }
    currentTime = date.substring(3, date.length);
  }
  else if (hours > 0 && hours < 10) {
    currentTime = date.substring(1, date.length);
  }
  else {
    currentTime = date;
  }

  return currentTime;
}
