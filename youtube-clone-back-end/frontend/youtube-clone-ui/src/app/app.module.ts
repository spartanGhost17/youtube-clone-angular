import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadVideoComponent } from './components/upload-video-view/upload-video/upload-video.component';
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
import { ContentComponent } from './components/content/content.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DrawerComponent } from './components/drawer/drawer.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { UploadVideoMetadataComponent } from './components/upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { VideoElementsComponent } from './components/upload-video-view/video-elements/video-elements.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { ChipsComponent } from './components/chips/chips.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ContainerBgGradiantDirective } from './directives/container-bg-gradiant.directive';
import { PlaylistMetadataComponent } from './components/playlist-metadata/playlist-metadata.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { FrameComponent } from './components/frame/frame.component';

registerLocaleData(uk);

@NgModule({
  declarations: [
    AppComponent,
    UploadVideoComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    ContentComponent,
    DrawerComponent,
    UploadVideoMetadataComponent,
    VideoElementsComponent,
    ChipsComponent,
    DropDownComponent,
    ContainerBgGradiantDirective,
    PlaylistMetadataComponent,
    SidePanelComponent,
    FrameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    //think about moving some of this to a special components module
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzUploadModule,
    NzPageHeaderModule,
    NzInputModule,
    NzAvatarModule,
    NzModalModule,
    NzDrawerModule,
    NzDividerModule,
    NzStepsModule,
    NzGridModule,
    NzImageModule,
    NzDropDownModule,
    NzCheckboxModule,
    NzPopoverModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: uk_UA }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
