import { Routes } from '@angular/router';
import { ChannelComponent } from '../../components/channel/channel.component';
console.warn('LOADED CHANNEL !!!!');
export const channelRoutes: Routes = [
  {
    path: '',
    component: ChannelComponent,
  },
];
