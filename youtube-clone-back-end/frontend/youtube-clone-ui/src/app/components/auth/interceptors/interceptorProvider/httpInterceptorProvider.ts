import { AuthInterceptor } from "../authInterceptor";

/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  AuthInterceptor
]