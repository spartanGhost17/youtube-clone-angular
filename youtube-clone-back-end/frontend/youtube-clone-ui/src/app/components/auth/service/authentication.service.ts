import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { HttpResponseInterface } from '../../../shared/types/httpResponse.interface';
import { LoginFormInterface } from '../types/loginForm.interface';
import { RegisterFormInterface } from '../types/registerForm.interface';
import { ResponseMessagesInterface } from '../../../shared/types/responseMessages.interface';
import { UpdatePasswordFormInterface } from '../types/updatePasswordForm.interface';
import { VerifyPasswordInterface } from '../types/verifyPassword.interface';
import { PersistanceService } from '../../../shared/services/persistance/persistance.service';
import { TokenType } from '../enum/tokenType.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUrl: string = environment.apiUrl;
  persistanceService = inject(PersistanceService);
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

  /**
   * reset password
   * @param {string} email
   * @returns {Observable<HttpResponseInterface<ResponseMessagesInterface>>} the reponse message
   */
  resetPassword(
    email: string
  ): Observable<HttpResponseInterface<ResponseMessagesInterface>> {
    let params = new HttpParams();
    params = params.append('email', email.trim());
    return this.http.get<HttpResponseInterface<ResponseMessagesInterface>>(
      this.apiUrl + resources.USER_END_POINTS.RESET_PASSWORD,
      { params: params }
    );
  }

  /**
   * verify password link
   * @param {VerifyPasswordInterface} verifyPasswordForm
   * @returns {Observable<HttpResponseInterface<ResponseMessagesInterface>>}
   */
  verifyPasswordLink(
    verifyPasswordForm: VerifyPasswordInterface
  ): Observable<HttpResponseInterface<ResponseMessagesInterface>> {
    const baseUrl = this.apiUrl;
    const url = new URL(
      this.apiUrl + resources.USER_END_POINTS.VERIFY_PASSWORD_URL,
      baseUrl
    );
    const params = new HttpParams()
      .append('type', verifyPasswordForm.type)
      .append('key', verifyPasswordForm.key);
    console.log(`URL:  ${url}`);
    return this.http.post<HttpResponseInterface<ResponseMessagesInterface>>(
      url.toString(),
      params
    );
  }

  /**
   * The update the password for the user
   * @param {string} key the UUID key
   * @param {UpdatePasswordFormInterface} updatePasswordForm
   * @returns {Observable<HttpResponseInterface<ResponseMessagesInterface>>} the response
   */
  updatePassword(
    key: string,
    updatePasswordForm: UpdatePasswordFormInterface
  ): Observable<HttpResponseInterface<ResponseMessagesInterface>> {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.post<HttpResponseInterface<ResponseMessagesInterface>>(
      this.apiUrl + resources.USER_END_POINTS.RESET_PASSWORD,
      updatePasswordForm,
      { params }
    );
  }

  /**
   * get the profile of logged in user
   * @returns {Observable<HttpResponseInterface<CurrentUserInterface>>} the user profile
   */
  getLoggedInUser(): Observable<HttpResponseInterface<CurrentUserInterface>> {
    const baseUrl = this.apiUrl;
    const url = new URL(
      this.apiUrl + resources.USER_END_POINTS.GET_PROFILE,
      baseUrl
    );
    return this.http.get<HttpResponseInterface<CurrentUserInterface>>(url.toString());
  }

  /**
   *  get refresh token if access token expired and write them to local storage
  */
  getRefreshToken(): Observable<HttpResponseInterface<ResponseMessagesInterface>> {
    const baseUrl = this.apiUrl;
    const url = new URL(
      this.apiUrl + resources.USER_END_POINTS.REFRESH_TOKEN,
      baseUrl
    );
    
    const token = this.persistanceService.get(TokenType.REFRESH);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<HttpResponseInterface<ResponseMessagesInterface>>(url.toString(), {headers}).pipe(
      tap(response => {
        this.persistanceService.set(TokenType.ACCESS, response.tokens[TokenType.ACCESS]);
        this.persistanceService.set(TokenType.REFRESH, response.tokens[TokenType.REFRESH]);
      }),
    );
  }
}
