import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { UserInterface } from '../../types/user.interface';
import { CurrentUserInterface } from '../../types/currentUser.interface';
import { buildURL } from '../../utils/sharedUtils';
import { UpdateUserForm } from '../../types/updateUserForm.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverURL: string = environment.apiUrl;
  userResource = resources.USER_END_POINTS;
  constructor(private http: HttpClient) {}

  /**
   * get user information by username
   * @param { string } username
   * @returns { Observable<HttpResponseInterface<UserInterface>> } the response 
  */
  getUserById(username: string): Observable<HttpResponseInterface<UserInterface>> {
    const url = buildURL(this.serverURL, this.userResource.GET_PROFILE_BY_ID);
    const params: HttpParams = new HttpParams().append('username', username);
    return this.http.get<HttpResponseInterface<UserInterface>>(url, {params});
  }

  /**
  * get user information by user id
  * @param { number } userId
  * @returns { Observable<HttpResponseInterface<UserInterface>> } the response 
  */
  getUserByUserId(id: number): Observable<HttpResponseInterface<UserInterface>> {
    const url = buildURL(this.serverURL, this.userResource.GET_PROFILE_BY_USER_ID);
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.get<HttpResponseInterface<UserInterface>>(url, {params});
  }

  /**
   * get user profile 
   * @returns {Observable<HttpResponseInterface<UserInterface>>} the resposne
  */
  getUser(): Observable<HttpResponseInterface<UserInterface>> {
    return this.http.get<HttpResponseInterface<UserInterface>>(
      this.serverURL + resources.USER_END_POINTS.GET_PROFILE
    );
  }
  
  /**
   * get the user image
   * @param fileName 
   */
  getUserImage(fileName: string) {
    const path = this.buildURL(this.serverURL, resources.USER_END_POINTS.GET_IMAGE+`${fileName}`);
    this.http.get(path);
  }

  /**
   * update the user image
   * @param {FormData} formData the image form data
   * @returns {Observable<HttpResponseInterface<CurrentUserInterface>>} 
   */
  updateProfilePicture(formData: FormData): Observable<HttpResponseInterface<CurrentUserInterface>> {
    const path = this.buildURL(this.serverURL, resources.USER_END_POINTS.UPDATE_PROFILE_IMAGE);
    return this.http.patch<HttpResponseInterface<CurrentUserInterface>>(path, formData);
  }

  /**
   * update user profile 
   * @param { UpdateUserForm } updateUserForm 
   * @returns { Observable<HttpResponseInterface<UserInterface>> } the response
  */
  updateProfile(updateUserForm: UpdateUserForm): Observable<HttpResponseInterface<UserInterface>> {
    const url = this.buildURL(this.serverURL, this.userResource.UPDATE_PROFILE);
    return this.http.patch<HttpResponseInterface<UserInterface>>(url, updateUserForm);
  } 

  /**
   * check if logged-in user is subscribed to user (channel)
   * @param { number } to id of channel to subscribe to
   * @param { number } subscriberId id of logged-in user
   * @returns { HttpResponseInterface<UserInterface[]> } the response
   */
  isSubscribed(to: number, subscriberId: number): Observable<HttpResponseInterface<UserInterface[]>> {
    const url = buildURL(this.serverURL, this.userResource.IS_SUBSCRIBED);
    const params = new HttpParams().append('to', to).append('subscriber', subscriberId);
    return this.http.get<HttpResponseInterface<UserInterface[]>>(url, { params });
  }

  /**
   * subscribe to a user
   * @param { number } to id of channel (user) to subscribe to  
   * @returns { Observable<HttpResponseInterface<UserInterface>> } the response
   */
  subscribe(to: number): Observable<HttpResponseInterface<UserInterface>> {
    const params: HttpParams = new HttpParams().set('to', to);
    const url = buildURL(this.serverURL, this.userResource.SUBSCRIBE);
    return this.http.post<HttpResponseInterface<UserInterface>>(url, params);
  }

  /**
   * unsubscribe from a user
   * @param { number } from id of user to unsubscribe from
   * @returns { Observable<HttpResponseInterface<UserInterface>> } the response
  */
  unsubscribe(from: number): Observable<HttpResponseInterface<UserInterface>> {
    const url = buildURL(this.serverURL, this.userResource.UNSUBSCRIBE)
    const params: HttpParams = new HttpParams().set('from', from);
    return this.http.delete<HttpResponseInterface<UserInterface>>(url, { params });
  }

  /**
   * get a logged in user subscriptions
   * @returns { Observable<HttpResponseInterface<UserInterface>> } the response
   */
  subscriptions(): Observable<HttpResponseInterface<UserInterface>> {
    const url: string = buildURL(this.serverURL, this.userResource.SUBSCRIPTIONS)
    return this.http.get<HttpResponseInterface<UserInterface>>(url);
  }

  /**
   * get subscribers for a channel
   * @param { number } id the user id 
   * @returns { Observable<HttpResponseInterface<UserInterface>> } the response
   */
  subscribers(id: number): Observable<HttpResponseInterface<UserInterface>> {
    const url: string = buildURL(this.serverURL, this.userResource.SUBSCRIBERS);
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.get<HttpResponseInterface<UserInterface>>(url, { params });
  }

  /**
   * builds a URI path for any request 
   * @param {string} serverUrl the server URL
   * @param {string} resource the resource path
   * @returns {string} the URI path
  */
  private buildURL(serverUrl: string, resource: string): string {
    const baseUrl = serverUrl;
    const url = new URL(
      resource,
      baseUrl
    );
    return url.toString();
  }
}
