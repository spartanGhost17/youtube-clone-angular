import { Routes } from '@angular/router';
import { HomeExplorerViewComponent } from './components/home-explorer-view/home-explorer-view.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/explore' },
  { path: 'login', loadChildren: () => import('./components/auth/routes/login.routes').then((m) => m.authRoutes) },
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
        loadChildren: () => import('./module/feed/feed-routing.module').then((m) => m.feedRoutes)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./module/playlist/playlist-routing.module').then((m) => m.playlistRoutes),
      },
      {
        path: 'watch',
        loadChildren: () => import('./module/watch/watch-routing.module').then((m) => m.watchRoutes)
      },
      {
        path: ':channelName',
        loadChildren: () => import('./module/channel/channel-routing.module').then((m) => m.channelRoutes),
      }
    ],
  },
  {
    path: 'studio', loadChildren: () => import('./module/studio/studio-routing.module').then((module) => module.studioRoutes)
  }
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule],
//})
//export class AppRoutingModule {}
