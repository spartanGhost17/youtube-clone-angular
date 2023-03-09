import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UploadVideoComponent } from './components/upload-video/upload-video.component';
import { UploadVideoDetailsComponent } from './components/upload-video-details/upload-video-details.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'dashboard', component: DashboardComponent,
  },
  {
    path: 'upload-video', component: UploadVideoComponent,
  },
  {
    path: 'upload-video-details', component: UploadVideoDetailsComponent,
  }
  //{ path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
