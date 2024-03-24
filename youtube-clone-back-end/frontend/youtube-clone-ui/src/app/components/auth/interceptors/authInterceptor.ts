import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHandlerFn,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, switchMap, throwError } from 'rxjs';
import { PersistanceService } from '../../../shared/services/persistance/persistance.service';
import { HttpResponseInterface } from '../../../shared/types/httpResponse.interface';
import { ResponseMessagesInterface } from '../../../shared/types/responseMessages.interface';
import { TokenType } from '../enum/tokenType.enum';
import { AuthenticationService } from '../service/authentication.service';

const API_VERSION: string = '/api/v1/';
let accessToken: string; //token string

const PUBLIC_URLS: string[] = [
    API_VERSION + 'user/login/',
    API_VERSION + 'user/register/',
    API_VERSION + 'user/verify/code/',
    '/error',
    API_VERSION + 'user/reset/password/',
    API_VERSION + 'user/verify/password',
    API_VERSION + 'user/verify/account',
    API_VERSION + 'user/refresh/token',
    API_VERSION + 'user/image',
    API_VERSION + 'video/thumbnail',
    API_VERSION + 'video/watch'
];


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private isTokenRefreshing = false;
    private refreshedTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    private persistanceService = inject(PersistanceService);
    private authService = inject(AuthenticationService);

    private token = this.persistanceService.get(TokenType.ACCESS);
    private accessToken = typeof this.token === 'string' ? this.token : '';

    

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> | Observable<HttpResponse<any>> {
        const isWhiteListed = PUBLIC_URLS.some((path) => req.url.includes(path));
        if(isWhiteListed) {
            //for whitelisted requests, proceed without modifying headers
            return next.handle(req);
        }
        //if endpoint is secured
        return next.handle(this.addAuthorizationHeader(req, this.accessToken)).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error instanceof HttpErrorResponse && error.status === 401 && error.error.reason.includes('expired')) {
                    return this.handleFreshToken(req, next);
                } else {
                    return throwError(() => error);
                }
            })
        );


    }


    private handleFreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        if(!this.isTokenRefreshing) {
            //console.log("refreshing token...");
            this.isTokenRefreshing = true;
            this.refreshedTokenSubject.next(null);
            return this.authService.getRefreshToken().pipe(
                switchMap((response: HttpResponseInterface<ResponseMessagesInterface>) => {
                    //console.log("token refreshed!");
                    this.isTokenRefreshing = false;
                    this.refreshedTokenSubject.next(response); //TODO: use NGRX TO RESET TOKEN
                    return next.handle(this.addAuthorizationHeader(request, response.tokens[TokenType.ACCESS]));
                })
            )
        } 
        else {
            this.refreshedTokenSubject.pipe(
                switchMap((response: HttpResponseInterface<ResponseMessagesInterface>) => {
                    //console.log("token already set");
                    return next.handle(this.addAuthorizationHeader(request, response.tokens[TokenType.ACCESS]));
                })
            )
        }

        return next.handle(request);
    }
    
    /**
     * Add authorization bearer header 
     * @param request the request
     * @param token the local storage
     * @returns the cloned request
    */
    private addAuthorizationHeader(request: HttpRequest<unknown>, token: string): HttpRequest<any> {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}





/**
 * Adds bearer token to outgoing requests
 * @param {HttpRequest<unknown>} req the request
 * @param {HttpHandlerFn} next the next http Interceptor function
 * @returns {Observable<HttpEvent<unknown>>}
*/
/*export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const isTokenRefreshing = false;
    const peristanceService = inject(PersistanceService);
    const authService = inject(AuthenticationService);

    const token = peristanceService.get(ACCESS_TOKEN_KEY);
    accessToken = typeof token === 'string' ? token : '';

    const isWhiteListed = PUBLIC_URLS.some((path) => req.url.includes(path));

    if(!isWhiteListed && accessToken !== '') {
        const modifiedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return next(modifiedRequest).pipe(
            tap({
                error: (error: HttpErrorResponse) => {
                    if(error instanceof HttpErrorResponse && error.status === 401 && error.error.reason.includes('expired')) {
                        return handleFreshToken(req, next, authService, peristanceService);
                        //return of({});
                        // Return a fallback value (e.g., an empty object)
                    } else {
                        return throwError(() => error);
                    }
                }
            })
        )
    }

    //for whitelisted requests, proceed without modifying headers
    return next(req);
}*/

