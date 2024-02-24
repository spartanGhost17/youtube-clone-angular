import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ChannelComponent } from './components/channel/channel.component';
import { ContentComponent } from './components/content/content.component';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { HomeExplorerViewComponent } from './components/home-explorer-view/home-explorer-view.component';
import { PlaylistDashboardComponent } from './components/playlist/playlist-dashboard/playlist-dashboard.component';
import { PlaylistViewComponent } from './components/playlist/playlist-view/playlist-view.component';
import { SubscriptionsViewComponent } from './components/subscriptions-view/subscriptions-view.component';
import { CustomizationComponent } from './components/user-dashboard/customization/customization.component';
import { WatchComponent } from './components/watch/watch.component';
import { DashboardViewComponent } from './pages/dashboard-view/dashboard-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/explore' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'explore',
        component: HomeExplorerViewComponent,
      },
      {
        path: 'feed',
        children: [
          {
            path: 'history',
            component: HistoryViewComponent,
          },
          {
            path: 'subscription',
            component: SubscriptionsViewComponent,
          },
          {
            path: 'library',
            component: PlaylistDashboardComponent,
          },
        ],
      },
      {
        path: 'playlist',
        component: PlaylistViewComponent,
      },
      {
        path: 'watch',
        component: WatchComponent,
      },
      {
        path: ':channelName',
        component: ChannelComponent,
      }
    ],
  },
  {
    path: 'studio',
    component: DashboardViewComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/studio/dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'content',
        component: ContentComponent,
      },
      {
        path: 'edit',
        component: CustomizationComponent,
      },
      { path: '**', redirectTo: '/studio/dashboard' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
