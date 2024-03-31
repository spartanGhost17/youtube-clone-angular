import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FrameComponent } from '../../components/frame/frame.component';
import { Icons } from '../../models/icons';
import { selectCurrentUser } from '../../shared/store/user/reducers';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [FrameComponent]
})
export class HomeComponent {
  sideMenuOptions: any[] = [];
  section1: any[] = [];
  section2: any[] = [];
  subcribed_channels: any[] = [];
  username: string;

  icons: Icons = new Icons();
  
  ICON_USER: string = '../../../assets/goku.jpg';
  ICON_SHORTS: string = '../'+this.icons.iconsPaths['shorts'];
  ICON_RADIO_SIGNAL: string = '../'+this.icons.iconsPaths['radio-signal'];

  constructor(private store: Store, private componentUpdatesService: ComponentUpdatesService) {}

  ngOnInit(): void {
    this.componentUpdatesService.sideBarTypeUpdate('side');
    
    this.store.select(selectCurrentUser).subscribe({
      next: (data) => {
        if(data) {
          this.username = data.username;
          this.populateSidePanel(this.username);
        }
      }
    });
    
    this.populateSidePanel('');
  }

  populateSidePanel(username: string) {
    this.section1 = [
      {'isActive':true, text: 'Home', icon: 'home', provider: 'google', type: 'fill', color: 'white', navigateTo: 'explore', sidebarType: 'side'},//this.ICON_HOME
      {'isActive':false, text: 'Shorts', icon: this.ICON_SHORTS, provider: 'default', type: 'outlined', color: 'white', navigateTo: '', sidebarType: 'side'},//
      {'isActive':false, text: 'Subscriptions', icon: 'subscriptions', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'feed/subscription', sidebarType: 'side'}//this.ICON_SUBSCRIPTION
    ];
  
    this.section2 = [
      {'isActive':false, text: 'Your channel', icon: 'account_box', provider: 'google', type: 'outlined', color: 'white', navigateTo: `home/@${username}`, sidebarType: 'side', isChannel: true},//this.ICON_LIBRARY_VIDEO
      {'isActive':false, text: 'History', icon: 'history', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'feed/history', sidebarType: 'side'},//this.ICON_HISTORY
      {'isActive':false, text: 'Your videos', icon: 'slideshow', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'studio/dashboard', sidebarType: 'side', newTab: true},//this.ICON_LIBRARY
      {'isActive':false, text: 'Watch Later', icon: 'schedule', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'playlist', sidebarType: 'side', playlistName: 'WL'},//this.ICON_WATCH_LATER
      {'isActive':false, text: 'Liked Videos', icon: 'thumb_up', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'playlist', sidebarType: 'side', playlistName: 'LL'},//this.ICON_LIKE playlistName: 'PLlFiFXELFq7g4nk3ydFeZLdvqacmEfPGG'
      {'isActive':false, text: 'Show more', icon: 'expand_more', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'feed/library', sidebarType: 'side'},
    ];
  
    this.subcribed_channels = [
      {'isActive':false, text: 'One Piece', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'DBZ Hollo', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 3', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel4777777777777777777777777 7777777777777777777777777777777', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: '', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 5', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 6', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 7', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 8', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 9', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel 10', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Channel4 about ben solo  777777777777777777777777 7777777777777777777777777777777', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: '', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Cartoon Network kids', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Double Champ ent.', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'WWE', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'arte', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'History portrait', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},
      {'isActive':false, text: 'Legends of History', channel_user_icon: this.ICON_USER, icon_right: this.ICON_RADIO_SIGNAL, navigateTo: 'home/@', sidebarType: 'side', isChannel: true},

    ];
  

    this.sideMenuOptions = [this.section1, this.section2, this.subcribed_channels];
  }

  getSubscriptions() {

  }
}
