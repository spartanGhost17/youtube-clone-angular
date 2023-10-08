import { Component, Input } from '@angular/core';

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

  @Input() ThumbnailURL:string = '../../../assets/grand_tourismo.jpg';
  @Input() videoURL:string = '../../../assets/test-videos/Y2Mate.is - Gran Turismo 5 Opening Montage-6Z1TL_VEEQo-720p-1654232433855.mp4';
  @Input() style: string = 'default';//either 'default' or 'horizontal'
  recommendationCardHeight: string = '140px';
  constructor() {}
}
