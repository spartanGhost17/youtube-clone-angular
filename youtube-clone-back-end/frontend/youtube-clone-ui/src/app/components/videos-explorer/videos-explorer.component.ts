import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/models/video';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-videos-explorer',
  templateUrl: './videos-explorer.component.html',
  styleUrls: ['./videos-explorer.component.scss']
})
export class VideosExplorerComponent {
  
  sibarWidth: string;
  sidebarType: string = 'hover';
  //video: Video = ;
  videos: any[] = [];//[
  //  {video: '', navigateTo: 'watch'}
  //];

  constructor(private componentUpdatesService :ComponentUpdatesService, private router: Router){
    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((width) => {
      console.log(`width ${width}`);
      this.sibarWidth = width;
    })
  }

  ngOnInit() {
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
        title: `Justice League: Perpetua's revenge`,
        channelName: 'Green lantern talks',
        likeCount: '1.6K',
        timeStamp: '4 hours ago',
        thumbnailUrl: '../../../assets/justice_league.jpg',
        iconURL: '../../../assets/goku_god_mode.jpg',
        videoURL: '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4'
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
  
  openVideo() {
    const videoId = "1234455yuwrct";
    const url = `home/watch`;
    this.router.navigate([url], {queryParams: {v: `${videoId}`}} );
  }

  updateHoverType() {
    this.componentUpdatesService.sideBarTypeUpdate(this.sidebarType)
  }

  test() {
    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((width) => {
      console.log(`width ${width}`);
    })
  }
}
