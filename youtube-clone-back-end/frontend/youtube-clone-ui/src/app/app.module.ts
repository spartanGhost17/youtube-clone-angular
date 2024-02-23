import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import uk from '@angular/common/locales/uk';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, uk_UA } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//nz-zorro-antd
import { IconsProviderModule } from './icons-provider.module';
import { NzZorroModule } from './module/nz-zorro/nz-zorro.module';
//material design
import { MaterialModule } from './module/material/material.module';
//
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxFileDropModule } from 'ngx-file-drop';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './components/auth/signin/signin.component';
import { ChannelComponent } from './components/channel/channel.component';
import { ChipsComponent } from './components/chips/chips.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentsHolderComponent } from './components/comments/comments-holder/comments-holder.component';
import { ContentComponent } from './components/content/content.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { DropDownComponent } from './components/dropdown/drop-down/drop-down.component';
import { StandardDropdownComponent } from './components/dropdown/standard-dropdown/standard-dropdown.component';
import { FrameComponent } from './components/frame/frame.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { HomeExplorerViewComponent } from './components/home-explorer-view/home-explorer-view.component';
import { ModalComponent } from './components/modal/modal.component';
import { PlaylistDashboardComponent } from './components/playlist/playlist-dashboard/playlist-dashboard.component';
import { PlaylistMetadataComponent } from './components/playlist/playlist-metadata/playlist-metadata.component';
import { PlaylistMiniComponent } from './components/playlist/playlist-mini/playlist-mini.component';
import { PlaylistViewComponent } from './components/playlist/playlist-view/playlist-view.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { StepsComponent } from './components/steps/steps.component';
import { SubscriptionsViewComponent } from './components/subscriptions-view/subscriptions-view.component';
import { SwitchComponent } from './components/switch/switch.component';
import { TabComponent } from './components/tab/tab.component';
import { UploadVideoMetadataComponent } from './components/upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { UploadVideoComponent } from './components/upload-video-view/upload-video/upload-video.component';
import { VideoChecksComponent } from './components/upload-video-view/video-checks/video-checks.component';
import { VideoElementsComponent } from './components/upload-video-view/video-elements/video-elements.component';
import { VideoVisibilityComponent } from './components/upload-video-view/video-visibility/video-visibility.component';
import { CustomizationComponent } from './components/user-dashboard/customization/customization.component';
import { VideoDescriptionComponent } from './components/video-description/video-description.component';
import { VideoCardBasicComponent } from './components/video-displays/video-card-basic/video-card-basic.component';
import { VideoCardComponent } from './components/video-displays/video-card/video-card.component';
import { VideoMiniComponent } from './components/video-displays/video-mini/video-mini.component';
import { VideoComponent } from './components/video-displays/video/video.component';
import { VideosExplorerComponent } from './components/videos-explorer/videos-explorer.component';
import { WatchComponent } from './components/watch/watch.component';
import { ContainerBgGradiantDirective } from './directives/background-gradiant/container-bg-gradiant.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { LinkifyPipe } from './pipes/linkify/linkify.pipe';
import { NewlineToBrPipe } from './pipes/newline-to-br/newline-to-br.pipe';
import { NewlineToSpacePipe } from './pipes/newline-to-space/newline-to-space.pipe';

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
    VideosExplorerComponent,
    PlaylistViewComponent,
    VideoComponent,
    VideoMiniComponent,
    SwitchComponent,
    ModalComponent,
    VideoDescriptionComponent,
    WatchComponent,
    VideoCardComponent,
    ChannelComponent,
    TabComponent,
    VideoCardBasicComponent,
    DragDropListComponent,
    StandardDropdownComponent,
    CommentComponent,
    CommentsHolderComponent,
    HistoryViewComponent,
    TooltipDirective,
    LinkifyPipe,
    NewlineToBrPipe,
    NewlineToSpacePipe,
    SubscriptionsViewComponent,
    HomeExplorerViewComponent,
    DashboardViewComponent,
    StepsComponent,
    VideoChecksComponent,
    VideoVisibilityComponent,
    PlaylistMiniComponent,
    PlaylistDashboardComponent,
    //LoginComponent,
    SigninComponent,
    CustomizationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxFileDropModule,
    BrowserAnimationsModule,
    //nz-zorro-antd
    IconsProviderModule,
    NzZorroModule,
    //angular material
    MaterialModule,
    //ngrx
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      //autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      //trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      //traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: uk_UA }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
