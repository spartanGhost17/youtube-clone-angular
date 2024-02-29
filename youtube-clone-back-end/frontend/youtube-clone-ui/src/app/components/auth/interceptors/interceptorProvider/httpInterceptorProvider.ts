import { Provider } from "@angular/core";
import { AuthInterceptor } from "../authInterceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

/** Array of Http interceptor providers in outside-in order */
export const httpInterceptorProviders: Provider = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
]