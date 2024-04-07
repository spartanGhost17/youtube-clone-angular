import { DatePipe, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { StandardDropdownComponent } from '../../dropdown/standard-dropdown/standard-dropdown.component';
import { VideoMiniComponent } from '../video-mini/video-mini.component';
import { Video } from '../../../shared/types/video';
import { DatecstmPipe } from '../../../pipes/datecstm/datecstm.pipe';

@Component({
    selector: 'app-video-card',
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.scss'],
    standalone: true,
    imports: [NgStyle, VideoMiniComponent, NgIf, TooltipDirective, StandardDropdownComponent, DatePipe, DatecstmPipe]
})
export class VideoCardComponent {
  @Input() video: Video;
  @Input() channelName:string = 'Channel name';

  @Input() style: string = 'default';//either 'default' or 'horizontal'
  @Input() channelId: number = 0;
  @Input() showActions: boolean = true;
  @Input() size: string = 'large';//small or large
  dropDownItems: any[];
  tooltipContent: string = 'Remove from watch history';

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
    this.router.navigate([`home/@${this.video.username}`]);
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
