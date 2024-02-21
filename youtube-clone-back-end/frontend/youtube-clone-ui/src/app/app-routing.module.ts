import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadVideoComponent } from './components/upload-video-view/upload-video/upload-video.component';
import { UploadVideoMetadataComponent } from './components/upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { VideosExplorerComponent } from './components/videos-explorer/videos-explorer.component';
import { PlaylistViewComponent } from './components/playlist/playlist-view/playlist-view.component';
import { VideoComponent } from './components/video-displays/video/video.component';
import { WatchComponent } from './components/watch/watch.component';
import { ChannelComponent } from './components/channel/channel.component';
import { DragDropListComponent } from './components/drag-drop-list/drag-drop-list.component';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { SubscriptionsViewComponent } from './components/subscriptions-view/subscriptions-view.component';
import { HomeExplorerViewComponent } from './components/home-explorer-view/home-explorer-view.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { StepsComponent } from './components/steps/steps.component';
import { ContentComponent } from './components/content/content.component';
import { PlaylistDashboardComponent } from './components/playlist/playlist-dashboard/playlist-dashboard.component';
import { PlaylistMiniComponent } from './components/playlist/playlist-mini/playlist-mini.component';
import { CustomizationComponent } from './components/user-dashboard/customization/customization.component';

const routes: Routes = [
  //{ path: 'login', component: PlaylistMiniComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home/explore' },
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'explore', component: HomeExplorerViewComponent,
      },
      {
        path: 'feed',
        children: [
          {
            path: 'history', component: HistoryViewComponent,
          },
          {
            path: 'subscription', component: SubscriptionsViewComponent,
          },
          {
            path: 'library', component: PlaylistDashboardComponent,
          }
        ]
      },
      {
        path: 'playlist', component: PlaylistViewComponent,
      },
      {
        path: 'watch', component: WatchComponent,
      },
      {
        path: ':channelName', component: ChannelComponent,
      },

      //{ path: '**', redirectTo: '/home/explore'}
    ]
  },
  {
    path: 'studio', component: DashboardViewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/studio/dashboard' },
      {
        path: 'dashboard', component: DashboardComponent,
      },
      {
        path: 'content', component: ContentComponent,
      },
      {
        path: 'edit', component: CustomizationComponent,
      },
      { path: '**', redirectTo: '/studio/dashboard'}
    ]
    
  },
  //{ path: '**', redirectTo: '/home/explore'}
  //user dashboard


  //{
  //  path: 'studio/dashboard', component: DashboardViewComponent,
    //children: [
    //  {
    //    path: 'dashboard', component: DashboardComponent,
    //  }
    //]
  //},

  //{
  //  path: 'drag', component: DragDropListComponent,
  //},
  /*{
    path: 'video-player', component: VideoComponent,
  },
  {
    path: 'upload-video', component: UploadVideoComponent,
  },
  {
    path: 'upload-video-details', component: UploadVideoMetadataComponent,
  },*/
  //{ path: '**', redirectTo: '/home/explore'}
  
  //{
  //  path: 'upload-video-details', component: UploadVideoMetadataComponent,
  //}
//home(frame-body:upload-video)http://localhost:4200/home/(frame-body:upload-video)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
