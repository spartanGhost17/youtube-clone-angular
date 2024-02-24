import { Component } from '@angular/core';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';
import { VideoCardBasicComponent } from '../video-displays/video-card-basic/video-card-basic.component';
import { TabComponent } from '../tab/tab.component';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { SwitchComponent } from '../switch/switch.component';
import { NgIf, NgClass, NgFor } from '@angular/common';

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
    ],
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

  testItems: any[] = [];

  latestActive: boolean = true;
  popularActive: boolean = false;
  oldestActive: boolean = false;

  constructor(private componentUpdatesService: ComponentUpdatesService) {}

  ngOnInit() {


    this.testItems =  [
      {icon: 'playlist_play', text: 'Add to queue', action: () => {}},
      {icon: 'schedule', text: 'Save to Watch Later', action: () => {}},
      {icon: 'playlist_add', text: 'Save to playlist', action: () => {}},
      {icon: 'delete', text: 'Remove from', action: () => {}},
      {icon: 'download', text: 'Download', action: () => {}},
      {icon: 'share', text: 'Share', action: () => {}},
      {divider: true},
      {icon: 'image', text: 'Set as playlist thumbnail', action: () => {}}
    ]



    this.componentUpdatesService.sideBarTypeUpdate('hover');
    this.videos = [
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: `Grand Tourismo 5 Opening Intro`,
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/grand_tourismo.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'AlJordan', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: `Justice League: Perpetua's revenge`,
        likeCount:  1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/justice_league.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: `Blackest Nightereeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe`,
        likeCount: 5.6,
        createDate: '10 hours ago',
        thumbnailURL: '../../../assets/green_lanter_vs_sinestro.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Hakira', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'AL Jordan comes back from the dead',
        //channelName: 'Green lantern talks',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/green_lantern_head_shot.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Hakira', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Siege of Owa',
        //channelName: 'Green lantern talks',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/green-lantern.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Blackest Night Event',
        //channelName: 'Green lantern talks',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/green_lantern_rising.png',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: `True Detective: Rust Cole's legacy`,
        //channelName: 'Green lantern talks',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/true_detective.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Goku God and Why It Is Great',
        //channelName: 'Green lantern talks',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/goku_god_mode.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Origin of KilloWog',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/Killowog.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Tal Sinestro and The Yellow Lantern Corp',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/Sinestro_bust.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Blackest night',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/green_lanter_vs_sinestro.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Blackest night',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/green_lanter_vs_sinestro.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Blackest night',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/green_lanter_vs_sinestro.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Why John Wick works',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/mr_wick.jpeg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Death Note Restrospective of light Yagami',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/light-yagami.png',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Batman and Superman Detective Comics #1',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/batman_and_superman_detective_comics.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      //-------------------------------------------------------
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Superman Jorge Jimenz',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/superman_sits_on_clouds.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg', verified: true},
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      {
        id: '',
        videoStatus: 'PUBLISHED',
        title: 'Superman number #1',
        likeCount: 1.6,
        createDate: '4 hours ago',
        thumbnailURL: '../../../assets/superman_number_1.jpg',
        user: {id:'', username:'Tintin_Dumbo17', channelName: 'Green lantern talks', iconURL: '../../../assets/goku_god_mode.jpg'},
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
}

