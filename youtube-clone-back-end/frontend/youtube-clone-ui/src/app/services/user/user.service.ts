import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { LoginForm } from '../../models/forms/loginForm';
import { environment } from '../../../environments/environment';
import * as resources from '../../../resources/end-points.json';
import { HttpResponse } from '../../models/interface/HttpResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverURL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUser(): Observable<HttpResponse<User>> {
    return this.http.get<HttpResponse<User>>(
      this.serverURL + resources.USER_END_POINTS.GET_PROFILE
    );
  }
  /**
   * login user with login form
   * @param {loginForm} the login form
   * @returns the httpResponse
   */
  login(loginForm: LoginForm): Observable<HttpResponse<User>> {
    return this.http.post<HttpResponse<User>>(
      this.serverURL + resources.USER_END_POINTS.LOGIN,
      { loginForm }
    );
  }
}
