import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { UserService } from '../../shared/services/user/user.service';
import { selectCurrentUser } from '../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { CurrentUserStateInterface } from '../../shared/types/state/currentUserState.interface';
import { UserInterface } from '../../shared/types/user.interface';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { ModalComponent } from '../modal/modal.component';
import { SwitchComponent } from '../switch/switch.component';
import { TabComponent } from '../tab/tab.component';
import { VideoCardBasicComponent } from '../video-displays/video-card-basic/video-card-basic.component';
import { HttpResponseInterface } from '../../shared/types/httpResponse.interface';
import { environment } from '../../../environments/environment';
import { VideoService } from '../../shared/services/video/video.service';
import { Video } from '../../shared/types/video';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    SwitchComponent,
    StandardDropdownComponent,
    TabComponent,
    NgClass,
    NgFor,
    VideoCardBasicComponent,
    ModalComponent,
    DatePipe,
    AsyncPipe,
  ],
})
export class ChannelComponent {
  isVerified: boolean = true;
  isInfoVisible: boolean = false;
  subscriptionState: string = 'Subscribed';
  channelName: string = "Green's Lantern Hub";
  userId: string = '@AlJordan';
  subscribeCount: string = '510K';
  videosCount: string = '1.6K';
  bannerURL: string = '../../../assets/justice_league.jpg'; //green_lanter_vs_sinestro.jpg';
  videos: Video[] = [];
  tabs: any[] = [];
  notifications: string = 'all'; //could be personalized or none

  testItems: any[] = [];

  latestActive: boolean = true;
  popularActive: boolean = false;
  oldestActive: boolean = false;
  channelDescription: string;

  user: UserInterface;
  username: string;
  serverUrl: string;

  videoPageSize: number = 20;
  videoOffset: number = 0;

  data$: Observable<{
    currentUser: CurrentUserInterface | null | undefined;
  }>;

  loadingVideos: boolean = true;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private store: Store<{ user: CurrentUserStateInterface }>,
    private userService: UserService,
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    //this.data$ = combineLatest({
    //  currentUser: this.store.select(selectCurrentUser),
    //});

    this.serverUrl = environment.apiUrl;

    this.testItems = [
      { icon: 'playlist_play', text: 'Add to queue', action: () => {} },
      { icon: 'schedule', text: 'Save to Watch Later', action: () => {} },
      { icon: 'playlist_add', text: 'Save to playlist', action: () => {} },
      { icon: 'delete', text: 'Remove from', action: () => {} },
      { icon: 'download', text: 'Download', action: () => {} },
      { icon: 'share', text: 'Share', action: () => {} },
      { divider: true },
      { icon: 'image', text: 'Set as playlist thumbnail', action: () => {} },
    ];

    this.componentUpdatesService.sideBarTypeUpdate('hover');
    this.componentUpdatesService.sideBarCollapsedEmit(true);
    this.videos = [];

    this.populateTabs();
    this.getUsernameFromUrl();
    this.getVideos();
  }

  populateTabs() {
    this.tabs = [
      { title: 'HOME', active: false },
      { title: 'VIDEO', active: true },
      { title: 'SHORTS', active: false },
      { title: 'LIVE', active: false },
      { title: 'PODCASTS', active: false },
      { title: 'PLAYLISTS', active: false },
      { title: 'COMMUNITY', active: false },
      { title: 'CHANNELS', active: false },
      { title: 'ABOUT', active: false },
    ];
  }

  onLatestClicked(): void {
    this.latestActive = true;
    this.popularActive = false;
    this.oldestActive = false;
  }

  onPopularClicked(): void {
    this.latestActive = false;
    this.popularActive = true;
    this.oldestActive = false;
  }

  onOldestClicked(): void {
    this.latestActive = false;
    this.popularActive = false;
    this.oldestActive = true;
  }

  onMoreInfoClicked(): void {
    this.isInfoVisible = !this.isInfoVisible;
  }

  showModalUpdateEvent(isModalClosed: boolean): void {
    this.isInfoVisible = isModalClosed;
  }

  getUserInfo() {
    // /this.userService.getUserById()
    //this.user =
  }

  /**
   * get the user information
   */
  getUsernameFromUrl(): void {
    this.route.params.subscribe((params) => {
      const user: string = params.channelName;
      this.username = user.substring(1, user.length);
      this.userService.getUserById(this.username).subscribe({
        next: (data: HttpResponseInterface<CurrentUserInterface>) => {
          this.user = data.data.user;
        },
      });
    });
  }

  /**
   * get videos  
  */
  getVideos() {
    this.videoService.getUserVideos(this.videoPageSize, this.videoOffset).subscribe({
      next: (data: HttpResponseInterface<Video[]>) => {
        if(data.data) {
          this.loadingVideos = false;
          this.videos = [...this.videos, ...data.data.video];
        }
      }
    })
  }
}
