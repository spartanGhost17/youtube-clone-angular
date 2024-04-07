import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import {
  selectCurrentUser,
  selectIsLoading,
  selectValidationErrors,
  selectValidationMessages,
} from '../../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { ResponseMessagesInterface } from '../../../../shared/types/responseMessages.interface';
import { CurrentUserStateInterface } from '../../../../shared/types/state/currentUserState.interface';
import { StandardDropdownComponent } from '../../../dropdown/standard-dropdown/standard-dropdown.component';
import { VideoCardBasicComponent } from '../../../video-displays/video-card-basic/video-card-basic.component';
import { PlaylistMiniComponent } from '../playlist-mini/playlist-mini.component';
import { ProgressBarService } from '../../../../shared/services/progress-bar/progress-bar.service';
import { selectPlaylists } from '../../../../shared/store/playlist/reducers';
import { PlaylistService } from '../../../../shared/services/playlist/playlist.service';
import { playlistActions } from '../../../../shared/store/playlist/actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-playlist-dashboard',
  templateUrl: './playlist-dashboard.component.html',
  styleUrls: ['./playlist-dashboard.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    VideoCardBasicComponent,
    StandardDropdownComponent,
    PlaylistMiniComponent,
    NgIf,
    AsyncPipe,
    RouterLink
  ],
})
export class PlaylistDashboardComponent {
  nonPlaylistNames: string[] = ['watch later', 'history', 'liked'];
  dropDownSettingsItems: any[] = [];
  dropDownText: string = 'A-Z';
  playlists: PlaylistInterface[];
  watchLaterPlaylist: PlaylistInterface;
  historyPlaylist: PlaylistInterface;
  likedPlaylist: PlaylistInterface;
  currentUser: CurrentUserInterface;
  pageSize: number = 20;
  offset: number  = 0;

  data$: Observable<{
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    validationMessages: ResponseMessagesInterface | null;
    validationErrors: ResponseMessagesInterface | null;
  }>;

  playlists$: Observable<{
    playlists: PlaylistInterface[]
  }>;

  constructor(
    private store: Store<{ user: CurrentUserStateInterface }>,
    private progressBarService: ProgressBarService,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    this.subscribeToCurrentUserState();
    this.playlists$ = combineLatest({
      playlists: this.store.select(selectPlaylists),
    });
 
    this.setDropDownSettings();
    this.getPlaylists();
    this.getHistory();
       
    this.getLikedPlaylist();
    this.getWatchLaterPlaylist();
    
  }

  ngAfterViewInit() {
    this.setHistoryVideos();
  }

  /**
   * open subscription to current user state
   */
  subscribeToCurrentUserState() {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      currentUser: this.store.select(selectCurrentUser),
      validationMessages: this.store.select(selectValidationMessages),
      validationErrors: this.store.select(selectValidationErrors),
    });

    this.data$.subscribe({
      next: (data) => {
        if(data.currentUser) {
          this.currentUser = data.currentUser;
        }
      }
    });
  }

  setDropDownSettings() {
    this.dropDownSettingsItems = [
      { icon: 'match_case', text: 'A-Z', action: (id: any) => this.edit(id) },
      {
        icon: 'schedule',
        text: 'Recently added',
        action: (id: any) => this.delete(id),
      },
    ];
  }

  edit(id: any): void {
    this.dropDownText = 'A-Z';
  }

  delete(id: any): void {
    this.dropDownText = 'Recently added';
  }

  getPlaylists(): void {
    this.store.select(selectPlaylists).subscribe({
      next: (playlists) => {
        const length = playlists.length;
        if(length <= 0) {
          this.store.dispatch(playlistActions.getByUser({request: this.currentUser.id}));
        }
      }
    });
  }

  getWatchLaterPlaylist(): void {
    this.watchLaterPlaylist = {
      id: 1,
      name: 'History',
      visibilityStatus: {id: 0, statusName: 'PUBLIC'},
      description: '',
      videos: [
        {
          id: 0,
          title: 'video 144444444444444444444444444444444444',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/batman2.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 0,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
          },
        },
        {
          id: 0,
          title: 'video 2',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/courage.png',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 1,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
            verified: true,
          },
        },
        {
          id: 0,
          title: 'video 3',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/green-lantern.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 2,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
          },
        },
        {
          id: 0,
          title: 'video 4',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/superman_sits_on_clouds.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 3,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
            verified: true,
          },
        },
        {
          id: 0,
          title: 'video 5',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/mr_wick.jpeg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 4,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
            verified: true,
          },
        },
        {
          id: 0,
          title: 'video 6',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/batman_red_glow.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 5,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
          },
        },
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ],
    };
  }

  /**
   *  set history to videos
   */
  setHistoryVideos() {
    this.progressBarService.startLoading();
    this.store.select(selectPlaylists).subscribe({
      next: (playlist) => {
        if (playlist) {
          const history: PlaylistInterface = playlist.filter((pl) => pl.name.toLowerCase().trim() === 'history')[0];
          if (history) {
            //get videos
            this.playlistService
              .getVideos(history.id!, this.pageSize, this.offset)
              .subscribe({
                next: (response) => {
                  const historyPlaylist: PlaylistInterface = response.data.playlist;
                    this.historyPlaylist = historyPlaylist;
                  this.progressBarService.completeLoading();
                },
              });
          }
        }
      },
    });
  }

  /**
   * add history playlist to state
   */
  getHistory() {
    this.store.select(selectPlaylists).subscribe({
      next: (playlists) => {
        const history: PlaylistInterface = playlists.filter((pl) => pl.name.toLowerCase().trim() === 'history')[0];
        if (!history) {
          this.store.dispatch(
            playlistActions.getHistory({
              pageSize: this.pageSize,
              offset: this.offset,
              userId: this.currentUser.id,
              name: 'history',
            })
          );
        }
      },
    });
  }

  getLikedPlaylist(): void {
    this.likedPlaylist = {
      id: 3,
      name: 'History',
      visibilityStatus: {id: 0, statusName: 'PUBLIC'},
      description: '',
      videos: [
        {
          id: 0,
          title: 'video 144444444444444444444444444444444444',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/batman2.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 0,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
          },
        },
        {
          id: 0,
          title: 'video 2',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/courage.png',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 1,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
            verified: true,
          },
        },
        {
          id: 0,
          title: 'video 3',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/green-lantern.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 2,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
          },
        },
        {
          id: 0,
          title: 'video 4',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/superman_sits_on_clouds.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 4,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
            verified: true,
          },
        },
        {
          id: 0,
          title: 'video 5',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/mr_wick.jpeg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 5,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
            verified: true,
          },
        },
        {
          id: 0,
          title: 'video 6',
          status: { id: 0, statusName: 'DRAFT' },
          createdAt: new Date('4'),
          thumbnailUrl: '../../../../assets/batman_red_glow.jpg',
          videoUrl:
            '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
          user: {
            id: 6,
            username: 'tintin',
            channelName: 'channel 1',
            iconURL: '../../../../assets/Killowog.jpg',
          },
        },
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ],
    };
  }

  onSeePlaylist(title: string) {}
}
