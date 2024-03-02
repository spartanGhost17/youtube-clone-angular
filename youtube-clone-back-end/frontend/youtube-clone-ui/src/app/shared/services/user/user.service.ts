import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { UserInterface } from '../../types/user.interface';
import { CurrentUserInterface } from '../../types/currentUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverURL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

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
    console.log(path);
    return this.http.patch<HttpResponseInterface<CurrentUserInterface>>(path, formData);
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
