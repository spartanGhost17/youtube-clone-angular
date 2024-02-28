import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { NZ_I18N, uk_UA } from 'ng-zorro-antd/i18n';
import { NgxFileDropModule } from 'ngx-file-drop';
import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import {
  authFeatureKey,
  authReducer,
} from './app/components/auth/store/reducers';
import { IconsProviderModule } from './app/module/icons-provider.module';
import { MaterialModule } from './app/module/material/material.module';
import { NgProgressBarModule } from './app/module/ngProgress-bar/ng-progress.module';
import { provideEffects } from '@ngrx/effects';
import * as authEffects from './app/components/auth/store/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { httpInterceptorProviders } from './app/components/auth/interceptors/interceptorProvider/httpInterceptorProvider';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      NgxFileDropModule,
      MaterialModule,
      NgProgressBarModule,
      //nz-zorro-antd
      IconsProviderModule
    ),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors(httpInterceptorProviders)),
    //ngrx
    provideStore({
      router: routerReducer
    }), //register store
    provideState(authFeatureKey, authReducer), //registered here since the auth feature is shared
    provideEffects(authEffects),
    provideRouterStore(), //will helps us manage router navigation in angular way (delete some fields)
    provideStoreDevtools({
      maxAge: 25, //max actions
      logOnly: !isDevMode(),
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    { provide: NZ_I18N, useValue: uk_UA },
    //provideHttpClient(),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
