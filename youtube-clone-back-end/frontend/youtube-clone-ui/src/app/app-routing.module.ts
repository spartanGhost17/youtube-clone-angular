import { Routes } from '@angular/router';
import { HomeExplorerViewComponent } from './components/home-explorer-view/home-explorer-view.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home/explore'},//'/home/explore' },
  { path: 'login', loadChildren: () => import('./components/auth/routes/login.routes').then((m) => m.authRoutes) },
  { path: 'register', loadChildren: () => import('./components/auth/routes/register.routes').then((m) => m.authRoutes)},
  { path: 'reset/password', loadChildren: () => import('./components/auth/routes/resetPassword.routes').then((m) => m.authRoutes)},
  { path: 'verify/password', loadChildren: () => import('./components/auth/routes/resetPassword.routes').then((m) => m.authRoutes)},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'explore',
        component: HomeExplorerViewComponent
      },
      { path: 'register', loadChildren: () => import('./components/auth/routes/register.routes').then((m) => m.authRoutes)},
      {
        path: 'feed',
        loadChildren: () => import('./components/feed/routes/feed-routing.module').then((m) => m.feedRoutes)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./components/feed/playlist/routes/playlist-routing.module').then((m) => m.playlistRoutes),
      },
      {
        path: 'watch',
        loadChildren: () => import('./components/watch/routes/watch-routing.module').then((m) => m.watchRoutes)
      },
      {
        path: ':channelName',
        loadChildren: () => import('./components/channel/routes/channel-routing.module').then((m) => m.channelRoutes),
      }
    ],
  },
  {
    path: 'studio', loadChildren: () => import('./pages/dashboard-view/routes/studio-routing.module').then((module) => module.studioRoutes)
  },
  { path: '**', redirectTo: '/home/explore' }
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule],
//})
//export class AppRoutingModule {}
