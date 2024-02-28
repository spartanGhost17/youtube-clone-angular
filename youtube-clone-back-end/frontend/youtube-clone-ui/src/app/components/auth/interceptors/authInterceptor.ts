import {
    HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { PersistanceService } from '../../../shared/services/persistance/persistance.service';


const ACCESS_TOKEN_KEY: string = 'access_token';
const REFRESH_TOKEN_KEY: string = 'refresh_token';
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
];

/**
 * Adds bearer token to outgoing requests
 * @param {HttpRequest<unknown>} req the request
 * @param {HttpHandlerFn} next the next http Interceptor function
 * @returns {Observable<HttpEvent<unknown>>}
*/
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(PersistanceService);
    const token = authService.get(ACCESS_TOKEN_KEY);
    accessToken = typeof token === 'string' ? token : '';

    const isWhiteListed = PUBLIC_URLS.some((path) => req.url.includes(path));

    if(!isWhiteListed && accessToken !== '') {
        const modifiedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return next(modifiedRequest);
    }

    //for whitelisted requests, proceed without modifying headers
    return next(req);
}
