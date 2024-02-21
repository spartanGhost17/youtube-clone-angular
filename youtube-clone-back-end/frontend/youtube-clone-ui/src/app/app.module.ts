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
//material design
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';
//
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
import { DropDownComponent } from './components/dropdown/drop-down/drop-down.component';
import { ContainerBgGradiantDirective } from './directives/background-gradiant/container-bg-gradiant.directive';
import { PlaylistMetadataComponent } from './components/playlist/playlist-metadata/playlist-metadata.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { FrameComponent } from './components/frame/frame.component';
import { VideosExplorerComponent } from './components/videos-explorer/videos-explorer.component';
import { PlaylistViewComponent } from './components/playlist/playlist-view/playlist-view.component';
import { VideoComponent } from './components/video-displays/video/video.component';
import { VideoMiniComponent } from './components/video-displays/video-mini/video-mini.component';
import { SwitchComponent } from './components/switch/switch.component';
import { ModalComponent } from './components/modal/modal.component';
import { VideoDescriptionComponent } from './components/video-description/video-description.component';
import { WatchComponent } from './components/watch/watch.component';
import { VideoCardComponent } from './components/video-displays/video-card/video-card.component';
import { ChannelComponent } from './components/channel/channel.component';
import { TabComponent } from './components/tab/tab.component';
import { VideoCardBasicComponent } from './components/video-displays/video-card-basic/video-card-basic.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { StandardDropdownComponent } from './components/dropdown/standard-dropdown/standard-dropdown.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentsHolderComponent } from './components/comments/comments-holder/comments-holder.component';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { LinkifyPipe } from './pipes/linkify/linkify.pipe';
import { NewlineToBrPipe } from './pipes/newline-to-br/newline-to-br.pipe';
import { NewlineToSpacePipe } from './pipes/newline-to-space/newline-to-space.pipe';
import { SubscriptionsViewComponent } from './components/subscriptions-view/subscriptions-view.component';
import { HomeExplorerViewComponent } from './components/home-explorer-view/home-explorer-view.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { StepsComponent } from './components/steps/steps.component';
import { VideoChecksComponent } from './components/upload-video-view/video-checks/video-checks.component';
import { VideoVisibilityComponent } from './components/upload-video-view/video-visibility/video-visibility.component';
import { PlaylistMiniComponent } from './components/playlist/playlist-mini/playlist-mini.component';
import { PlaylistDashboardComponent } from './components/playlist/playlist-dashboard/playlist-dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { CustomizationComponent } from './components/user-dashboard/customization/customization.component';
import { SnackBarDirective } from './directives/snack-bar/snack-bar.directive';


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
    LoginComponent,
    SigninComponent,
    CustomizationComponent,
    SnackBarDirective,
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
    NzPopoverModule,
    //this is angular material drag drop (segreate this into module export later as well)
    DragDropModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatRippleModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: uk_UA }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
