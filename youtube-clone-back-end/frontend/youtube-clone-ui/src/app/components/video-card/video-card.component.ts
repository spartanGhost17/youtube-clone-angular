import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent {
  @Input() title:string = 'Title saaaaaaa aaaaaa aaaaaaaaaaaaaaaaa aeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee azzdsassad dffffffffffffffffff';
  @Input() channelName:string = 'Channel name';
  @Input() likeCount:string = '12.5K';
  @Input() postTime:string = '4 hours ago';

  @Input() ThumbnailURL:string = '../../../assets/batman_and_superman_detective_comics.jpg'//'../../../assets/grand_tourismo.jpg';
  @Input() videoURL:string = '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4';
  @Input() style: string = 'default';//either 'default' or 'horizontal'
  @Input() channelId: string = 'AlJordanFord';
  @Input() showActions: boolean = true;
  @Input() size: string = 'large';//small or large
  dropDownItems: any[];
  tooltipContent: string = 'Remove from watch history';
  description = "lfejefjejfjejfelfjelfjveljrlejrflkerfkelrkfelrkf dsjdsldlskdslkdskksdlk  lskdkslkdlsdklskdlsdklskdlksdlksdkds skdlskdlksd klsdkslkdsdlksdksdlkds kksld ksldkdlksdlklsdkldsksdlk";
  //recommendationCardHeight: string = '140px';

  constructor(private componentUpdatesService : ComponentUpdatesService, private router: Router) {}

  ngOnInit(): void {
    this.dropDownItems =  [
      {icon: 'playlist_play', text: 'Add to queue', action: (id: any) => this.addToQueue(id)},
      {icon: 'schedule', text: 'Save to Watch Later', action: (id: any) => this.addToWatchLater(id)},
      {icon: 'playlist_add', text: 'Save to playlist', action: () => this.addToPlaylist()},
      {icon: 'download', text: 'Download', action: () => this.download()},
      {icon: 'share', text: 'Share', action: (id: any) => this.share(id)},
    ];
  }

  onChannelClicked(): void {
    //this.componentUpdatesService.sideBarTypeUpdate('hover');
    this.router.navigate([`home/@${this.channelId}`]);
  }

  removeFromWatchHistory(id: any): void {
    console.log("remove from watch list id ", this.channelId);
  }

  addToQueue(id: any): void {

  }

  addToWatchLater(id: any): void {

  }

  addToPlaylist(): void {

  }

  download(): void {

  }

  share(id: any): void {

  }


}
