import { Component } from '@angular/core';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { PlaylistMiniComponent } from '../playlist-mini/playlist-mini.component';
import { StandardDropdownComponent } from '../../../dropdown/standard-dropdown/standard-dropdown.component';
import { VideoCardBasicComponent } from '../../../video-displays/video-card-basic/video-card-basic.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-playlist-dashboard',
    templateUrl: './playlist-dashboard.component.html',
    styleUrls: ['./playlist-dashboard.component.scss'],
    standalone: true,
    imports: [NgFor, VideoCardBasicComponent, StandardDropdownComponent, PlaylistMiniComponent]
})
export class PlaylistDashboardComponent {
  dropDownSettingsItems: any[] = [];
  dropDownText: string = 'A-Z';
  playlists: PlaylistInterface[]
  watchLaterPlaylist: PlaylistInterface;
  historyPlaylist: PlaylistInterface;
  likedPlaylist: PlaylistInterface;

  constructor() {}

  ngOnInit(): void {
    this.setDropDownSettings();
    this.getPlaylists();
    this.getHistoryPlaylist();
    this.getLikedPlaylist();
    this.getWatchLaterPlaylist();
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
      {id: 0, title: 'Comics', visibilityStatus: 'PRIVATE', videos: [
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/vagabon_manga.jpg'},
      ]},      
      {id: 1, title: 'Anime music', visibilityStatus: 'PRIVATE', videos: [
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/true_detective.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/courage.png'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/goku_god_mode.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 2, title: 'C#', visibilityStatus: 'PRIVATE', videos: [
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/goku_god_mode.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/true_detective.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/courage.png'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 3, title: 'Computer music', visibilityStatus: 'PRIVATE', videos: [
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/batman_red_glow.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/courage.png'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/goku_god_mode.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 4, title: 'Green lantern', visibilityStatus: 'PRIVATE', videos: [
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/green_lanter_vs_sinestro.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/courage.png'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/goku_god_mode.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/vagabon_manga.jpg'},
      ]},
      {id: 5, title: 'Green lantern', visibilityStatus: 'PRIVATE', videos: [
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/courage.png'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/batman_and_superman_detective_comics.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/goku_god_mode.jpg'},
        {id: '', title: '', videoStatus: 'DRAFT', thumbnailURL: '../../../../assets/vagabon_manga.jpg'},
      ]},
    ];
  } 

  getWatchLaterPlaylist(): void {
    this.watchLaterPlaylist = {
      id: 1,
      title: 'History',
      visibilityStatus: 'PUBLIC',
      description: '',
      videos: [
        {id: '', title: 'video 144444444444444444444444444444444444', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/batman2.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: '', title: 'video 2', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/courage.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 3', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green-lantern.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: '', title: 'video 4', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/superman_sits_on_clouds.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 5', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/mr_wick.jpeg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 6', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/batman_red_glow.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ]
    }
  }

  getHistoryPlaylist(): void {
    this.historyPlaylist = {
      id: 2,
      title: 'History',
      visibilityStatus: 'PUBLIC',
      description: '',
      videos: [
        {id: '', title: 'video 144444444444444444444444444444444444', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/batman2.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: '', title: 'video 2', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/courage.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 3', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green-lantern.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: '', title: 'video 4', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/superman_sits_on_clouds.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 5', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/mr_wick.jpeg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 6', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/batman_red_glow.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ]
    }
  }

  getLikedPlaylist(): void {
    this.likedPlaylist = {
      id: 3,
      title: 'History',
      visibilityStatus: 'PUBLIC',
      description: '',
      videos: [
        {id: '', title: 'video 144444444444444444444444444444444444', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/batman2.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: '', title: 'video 2', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/courage.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 3', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green-lantern.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        {id: '', title: 'video 4', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/superman_sits_on_clouds.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 5', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/mr_wick.jpeg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        {id: '', title: 'video 6', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/batman_red_glow.jpg', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
        //{id: '', title: 'video 7', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/light-yagami.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg', verified: true}},
        //{id: '', title: 'video 8', videoStatus: 'DRAFT', createDate: '4 hours ago', thumbnailURL: '../../../../assets/green_lantern_rising.png', videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4', user: {id: 'tintin', username:'tintin', channelName: 'channel 1', iconURL: '../../../../assets/Killowog.jpg'}},
      ]
    }
  }

  onSeePlaylist(title: string) {

  }
}
