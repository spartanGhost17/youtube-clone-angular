import { Component } from '@angular/core';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent {
  isVerified: boolean = true;
  subscriptionState: string = 'Subscribed';
  channelName: string = "Green's Lantern Hub";
  userId: string = '@AlJordan';
  subscribeCount: string = '510K';
  videosCount: string = '1.6K';
  bannerURL: string = '../../../assets/justice_league.jpg';//green_lanter_vs_sinestro.jpg';
  videos: any[] = [];
  tabs: any[] = [];
  notifications: string = 'all';//could be personalized or none

  constructor(private componentUpdatesService: ComponentUpdatesService) {}

  ngOnInit() {
    this.componentUpdatesService.sideBarTypeUpdate('hover');
    this.videos = [
      {
        title: `Justice League: Perpetua's revenge`,
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/justice_league.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: `Blackest Nightereeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe`,
        likeCount: '5.6K',
        timeStamp: '10 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'AL Jordan comes back from the dead',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lantern_head_shot.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Siege of Owa',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green-lantern.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Blackest Night Event',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lantern_rising.png',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: `True Detective: Rust Cole's legacy`,
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/true_detective.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Goku God and Why It Is Great',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/goku_god_mode.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Origin of KilloWog',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/Killowog.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Tal Sinestro and The Yellow Lantern Corp',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/Sinestro_bust.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Blackest night',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Blackest night',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Blackest night',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Why John Wick works',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/mr_wick.jpeg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Death Note Restrospective of light Yagami',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/light-yagami.png',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Batman and Superman Detective Comics #1',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/batman_and_superman_detective_comics.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      //-------------------------------------------------------
      {
        title: 'Superman Jorge Jimenz',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/superman_sits_on_clouds.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        title: 'Superman number #1',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/superman_number_1.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
    ];

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
}

