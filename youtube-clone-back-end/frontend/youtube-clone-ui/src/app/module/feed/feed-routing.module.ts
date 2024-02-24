import { Routes } from '@angular/router';
import { HistoryViewComponent } from 'src/app/components/feed/history-view/history-view.component';
import { PlaylistDashboardComponent } from '../../components/feed/playlist/playlist-dashboard/playlist-dashboard.component';
import { SubscriptionsViewComponent } from '../../components/feed/subscriptions-view/subscriptions-view.component';
console.warn('FEED MODE HAS BEEN LOADED');

export const feedRoutes: Routes = [
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
  }
];
