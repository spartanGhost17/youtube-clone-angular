import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadVideoComponent } from './components/upload-video-view/upload-video/upload-video.component';
import { UploadVideoMetadataComponent } from './components/upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { VideosExplorerComponent } from './components/videos-explorer/videos-explorer.component';
import { PlaylistViewComponent } from './components/playlist-view/playlist-view.component';
import { VideoComponent } from './components/video/video.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/explore' },
  {
    path: 'home', component: HomeComponent,
    children: [
      {
        path: 'explore', component: VideosExplorerComponent, 
      },
      {
        path: 'playlist', component: PlaylistViewComponent,
      }
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: 'video-player', component: VideoComponent,
  },
  {
    path: 'upload-video', component: UploadVideoComponent,
  },
  {
    path: 'upload-video-details', component: UploadVideoMetadataComponent,
  }

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
