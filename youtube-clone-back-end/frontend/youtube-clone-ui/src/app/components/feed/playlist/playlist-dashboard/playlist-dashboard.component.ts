import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { selectCurrentUser, selectIsLoading, selectValidationErrors, selectValidationMessages } from '../../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { ResponseMessagesInterface } from '../../../../shared/types/responseMessages.interface';
import { CurrentUserStateInterface } from '../../../../shared/types/state/currentUserState.interface';
import { StandardDropdownComponent } from '../../../dropdown/standard-dropdown/standard-dropdown.component';
import { VideoCardBasicComponent } from '../../../video-displays/video-card-basic/video-card-basic.component';
import { PlaylistMiniComponent } from '../playlist-mini/playlist-mini.component';

@Component({
    selector: 'app-playlist-dashboard',
    templateUrl: './playlist-dashboard.component.html',
    styleUrls: ['./playlist-dashboard.component.scss'],
    standalone: true,
    imports: [NgFor, VideoCardBasicComponent, StandardDropdownComponent, PlaylistMiniComponent, NgIf, AsyncPipe]
})
export class PlaylistDashboardComponent {
  dropDownSettingsItems: any[] = [];
  dropDownText: string = 'A-Z';
  playlists: PlaylistInterface[]
  watchLaterPlaylist: PlaylistInterface;
  historyPlaylist: PlaylistInterface;
  likedPlaylist: PlaylistInterface;

  data$: Observable<{
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined,
    validationMessages: ResponseMessagesInterface | null,
    validationErrors: ResponseMessagesInterface | null
  }>;

  constructor(private store: Store<{user: CurrentUserStateInterface}>) {}

  ngOnInit(): void {
    this.setDropDownSettings();
    this.getPlaylists();
    this.getHistoryPlaylist();
    this.getLikedPlaylist();
    this.getWatchLaterPlaylist();
    this.subscribeToCurrentUserState();
  }

  /**
   * open subscription to current user state 
  */
  subscribeToCurrentUserState() {
    this.data$ = combineLatest({
      isLoading: this.store.select(selectIsLoading),
      currentUser: this.store.select(selectCurrentUser),
      validationMessages: this.store.select(selectValidationMessages),
      validationErrors: this.store.select(selectValidationErrors)
    })
  }

  setDropDownSettings() {
    this.dropDownSettingsItems = [
      {icon: 'match_case', text: 'A-Z', action: (id: any) => this.edit(id)},
      {icon: 'schedule', text: 'Recently added', action: (id: any) => this.delete(id)},
    ];
  }

  edit(id: any): void {
    this.dropDownText = 'A-Z';
  }

  delete(id: any): void {
    this.dropDownText = 'Recently added';
  }

  getPlaylists(): void {
    this.playlists = [
      {id: 0, name: 'Comics', visibilityStatus: 'PRIVATE', videos: [
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/vagabon_manga.jpg'},
      ]},      
      {id: 1, name: 'Anime music', visibilityStatus: 'PRIVATE', videos: [
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/true_detective.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/courage.png'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/goku_god_mode.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 2, name: 'C#', visibilityStatus: 'PRIVATE', videos: [
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/goku_god_mode.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/true_detective.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/courage.png'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 3, name: 'Computer music', visibilityStatus: 'PRIVATE', videos: [
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/batman_red_glow.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/courage.png'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/goku_god_mode.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 4, name: 'Green lantern', visibilityStatus: 'PRIVATE', videos: [
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/green_lanter_vs_sinestro.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/courage.png'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/goku_god_mode.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 5, name: 'Green lantern', visibilityStatus: 'PRIVATE', videos: [
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/courage.png'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/goku_god_mode.jpg'},
        {id: 0, title: '', status: {id: 0, statusName: 'DRAFT'}, thumbnailUrl: '../../../../assets/vagabon_manga.jpg'},
      ]},
    ];
  } 

  getWatchLaterPlaylist(): void {
    this.watchLaterPlaylist = {
      id: 1,
      name: 'History',
      visibilityStatus: 'PUBLIC',
      description: '',
      videos: [
        {id: 0, title: 'video 144444444444444444444444444444444444', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/batman2.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 0, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: 0, title: 'video 2', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/courage.png', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 1, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 3', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/green-lantern.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 2, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: 0, title: 'video 4', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/superman_sits_on_clouds.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 3, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 5', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/mr_wick.jpeg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 4, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 6', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/batman_red_glow.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 5, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ]
    }
  }

  getHistoryPlaylist(): void {
    this.historyPlaylist = {
      id: 2,
      name: 'History',
      visibilityStatus: 'PUBLIC',
      description: '',
      videos: [
        {id: 0, title: 'video 144444444444444444444444444444444444', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/batman2.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 0, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: 0, title: 'video 2', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/courage.png', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 1, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 3', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/green-lantern.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 2, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: 0, title: 'video 4', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/superman_sits_on_clouds.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 3, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 5', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/mr_wick.jpeg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 4, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 6', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/batman_red_glow.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 5, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ]
    }
  }

  getLikedPlaylist(): void {
    this.likedPlaylist = {
      id: 3,
      name: 'History',
      visibilityStatus: 'PUBLIC',
      description: '',
      videos: [
        {id: 0, title: 'video 144444444444444444444444444444444444', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/batman2.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 0, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: 0, title: 'video 2', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/courage.png', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 1, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 3', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/green-lantern.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 2, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: 0, title: 'video 4', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/superman_sits_on_clouds.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 4, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 5', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/mr_wick.jpeg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 5, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: 0, title: 'video 6', status: {id: 0, statusName: 'DRAFT'}, createdAt: new Date('4'), thumbnailUrl: '../../../../assets/batman_red_glow.jpg', videoUrl: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 6, username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ]
    }
  }

  onSeePlaylist(title: string) {

  }
}
