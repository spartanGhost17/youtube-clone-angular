import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { uk_UA } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NgxFileDropModule } from 'ngx-file-drop';
import { HeaderComponent } from './components/header/header.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzUploadModule,
    NzPageHeaderModule,
    NzInputModule,
    NzAvatarModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: uk_UA }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
