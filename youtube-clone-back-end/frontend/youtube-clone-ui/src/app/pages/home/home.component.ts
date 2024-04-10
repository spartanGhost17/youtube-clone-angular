import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FrameComponent } from '../../components/frame/frame.component';
import { Icons } from '../../models/icons';
import { selectCurrentUser, selectSubscriptions } from '../../shared/store/user/reducers';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';
import { userActions } from '../../shared/store/user/actions';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [FrameComponent, HeaderComponent]
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
    this.populateSidePanel('', []);
    this.store.select(selectCurrentUser).subscribe({
      next: (data) => {
        if(data) {
          this.username = data.username;
          this.getSubscriptions();
        }
      }
    });
  }

  populateSidePanel(username: string, subcribedChannels: any[]) {
    this.section1 = [
      {'isActive':true, text: 'Home', icon: 'home', provider: 'google', type: 'fill', color: 'white', navigateTo: 'explore', sidebarType: 'side'},//this.ICON_HOME
      {'isActive':false, text: 'Shorts', icon: this.ICON_SHORTS, provider: 'default', type: 'outlined', color: 'white', navigateTo: '', sidebarType: 'side'},//
      //{'isActive':false, text: 'Subscriptions', icon: 'subscriptions', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'feed/subscription', sidebarType: 'side'}//this.ICON_SUBSCRIPTION
    ];
  
    this.section2 = [
      {'isActive':false, username: `${username}`, text: 'Your channel', icon: 'account_box', provider: 'google', type: 'outlined', color: 'white', navigateTo: `home/@`, sidebarType: 'side', isChannel: true},//this.ICON_LIBRARY_VIDEO
      {'isActive':false, text: 'History', icon: 'history', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'feed/history', sidebarType: 'side'},//this.ICON_HISTORY
      {'isActive':false, text: 'Your videos', icon: 'slideshow', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'studio/dashboard', sidebarType: 'side', newTab: true},//this.ICON_LIBRARY
      {'isActive':false, text: 'Watch Later', icon: 'schedule', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'playlist', sidebarType: 'side', playlistName: 'Watch Later'},//this.ICON_WATCH_LATER
      {'isActive':false, text: 'Liked Videos', icon: 'thumb_up', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'playlist', sidebarType: 'side', playlistName: 'Likes'},//this.ICON_LIKE playlistName: 'PLlFiFXELFq7g4nk3ydFeZLdvqacmEfPGG'
      {'isActive':false, text: 'Show more', icon: 'expand_more', provider: 'google', type: 'outlined', color: 'white', navigateTo: 'feed/library', sidebarType: 'side'},
    ];
    this.subcribed_channels = subcribedChannels;
    this.sideMenuOptions = this.subcribed_channels? [this.section1, this.section2, this.subcribed_channels] : [this.section1, this.section2];
  }

  /**
   * get user subscriptions
   */
  getSubscriptions() {
    this.store.select(selectSubscriptions).subscribe({
      next: (subscriptions) => {
        if(!subscriptions) {
          this.store.dispatch(userActions.getSubscriptions());
        } else if (subscriptions.length > 0) {
          let subsList = subscriptions.map(u => {
            return {
              isActive: false, 
              text: u.channelName,
              username: u.username, 
              channel_user_icon: u.profilePicture, 
              icon_right: this.ICON_RADIO_SIGNAL, 
              navigateTo: 'home/@', 
              sidebarType: 'side', 
              isChannel: true}
          });
          this.populateSidePanel(this.username, subsList);  
        } else {
          this.populateSidePanel(this.username, []);
        }
      }
    });
  }
}
