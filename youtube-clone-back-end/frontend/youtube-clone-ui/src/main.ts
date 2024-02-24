import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule, provideStoreDevtools } from '@ngrx/store-devtools';
import { NZ_I18N, uk_UA } from 'ng-zorro-antd/i18n';
import { NgxFileDropModule } from 'ngx-file-drop';
import { environment } from 'src/environments/environment';
import { appRoutes } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { IconsProviderModule } from './app/module/icons-provider.module';
import { MaterialModule } from './app/module/material/material.module';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule,
      NgxFileDropModule,
      MaterialModule,
      //nz-zorro-antd
      IconsProviderModule,
      //ngrx
      StoreModule.forRoot({}, {}),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: environment.production,
        //autoPause: true, // Pauses recording actions and state changes when the extension window is not open
        //trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
        //traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      })
    ),
    provideRouter(appRoutes),
    { provide: NZ_I18N, useValue: uk_UA },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
