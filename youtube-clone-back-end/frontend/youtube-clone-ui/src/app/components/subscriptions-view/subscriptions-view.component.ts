import { Component } from '@angular/core';

@Component({
  selector: 'app-subscriptions-view',
  templateUrl: './subscriptions-view.component.html',
  styleUrls: ['./subscriptions-view.component.scss']
})
export class SubscriptionsViewComponent {
  videos: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos() {
    this.videos = [
      {
        title: `Grand Tourismo 5 Opening Intro`,
        channelName: 'AlJordan',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/grand_tourismo.jpg',
        iconURL: '../../../assets/green_lantern_head_shot.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
      {
        title: 'AL Jordan comes back from the dead',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lantern_head_shot.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
      {
        title: `Justice League: Perpetua's revenge`,
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/justice_league.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Siege of Owa',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green-lantern.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
      {
        title: 'Blackest Night Event',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lantern_rising.png',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: `True Detective: Rust Cole's legacy`,
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/true_detective.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Goku God and Why It Is Great',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/goku_god_mode.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Origin of KilloWog',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/Killowog.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
      {
        title: 'Tal Sinestro and The Yellow Lantern Corp',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/Sinestro_bust.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Blackest night',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Blackest night',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Blackest night',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Why John Wick works',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/mr_wick.jpeg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Death Note Restrospective of light Yagami',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/light-yagami.png',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
      },
      {
        title: 'Batman and Superman Detective Comics #1',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/batman_and_superman_detective_comics.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
      {
        title: `Blackest Nightereeeeeeeeeeeeee eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeexxxxxxxxxxxxxxxxxxxxxxxxxxxxxxe`,
        channelName: 'Green lantern talks',
        likeCount: '5.6K',
        timeStamp: '10 hours ago',
        thumbnailUrl: '../../../assets/green_lanter_vs_sinestro.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
      },
      //-------------------------------------------------------
      {
        title: 'Superman Jorge Jimenz',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/superman_sits_on_clouds.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
      {
        title: 'Superman number #1',
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/superman_number_1.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4',
        verified: true
      },
    ];
  }
}
