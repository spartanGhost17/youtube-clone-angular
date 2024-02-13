import { Component } from '@angular/core';
import { Video } from '../../models/video';

@Component({
  selector: 'app-home-explorer-view',
  templateUrl: './home-explorer-view.component.html',
  styleUrls: ['./home-explorer-view.component.scss']
})
export class HomeExplorerViewComponent {
  videos: Video[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
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
  }
}
