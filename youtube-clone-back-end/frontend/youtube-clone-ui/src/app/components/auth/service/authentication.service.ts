import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpResponseInterface } from '../../../shared/types/httpResponse.interface';
import { LoginFormInterface } from '../types/loginForm.interface';
import { RegisterFormInterface } from '../types/registerForm.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * login user with login form
   * @param {LoginFormInterface} the login form
   * @returns the httpResponse
   */
  login(
    loginForm: LoginFormInterface
  ): Observable<HttpResponseInterface<CurrentUserInterface>> {
    console.log('LOGIN FORM IS THIS ', loginForm);
    return this.http.post<HttpResponseInterface<CurrentUserInterface>>(
      this.apiUrl + resources.USER_END_POINTS.LOGIN,
      loginForm
    );
  }

  /**
   * @param {RegisterFormInterface} the login form
   * @returns the httpResponse
   */
  register(
    registerForm: RegisterFormInterface
  ): Observable<HttpResponseInterface<CurrentUserInterface>> {
    return this.http.post<HttpResponseInterface<CurrentUserInterface>>(
      this.apiUrl + resources.USER_END_POINTS.REGISTER,
      registerForm
    );
  }
}
