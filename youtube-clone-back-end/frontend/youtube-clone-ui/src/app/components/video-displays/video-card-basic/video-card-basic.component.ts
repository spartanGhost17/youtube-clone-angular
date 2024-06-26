import { DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { UserInterface } from '../../../shared/types/user.interface';
import { Video } from '../../../shared/types/video';
import { VideoMiniComponent } from '../video-mini/video-mini.component';
import { DatecstmPipe } from '../../../pipes/datecstm/datecstm.pipe';

@Component({
  selector: 'app-video-card-basic',
  templateUrl: './video-card-basic.component.html',
  styleUrls: ['./video-card-basic.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, VideoMiniComponent, DatePipe, DatecstmPipe],
})
export class VideoCardBasicComponent {
  
  @Input() video: Video;
  @Input() loading: boolean = false;
  @Input() default: boolean = true;
  @Input() size: string = 'default'; //either xtra-small, small or default
  @Input() showIcon: boolean = true;
  @Input() user: UserInterface;
  @Input() username: string;
  @Input() channelName: string; 

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private router: Router
  ) {}

  /**
   * opens video view when video is clicked
   */
  openVideo() {
    if (this.default) {
      const url: string = `home/watch`;
      let vUrlParts: string[] = this.video.videoUrl!.split("/");
      const videoId = vUrlParts[vUrlParts.length - 1];
      this.router.navigate([url], { queryParams: { v: `${videoId}`, i: `${this.video.id}` } });
    }
  }

  /**
   * opens channel view when avatar or channel name is clicked
   * @param video
   */
  onChannelInfoClicked(video: any): void {
    if (this.default) {
      if(this.user) {
        this.router.navigate([`home/@${this.user.username}`]);
      } else {
        this.router.navigate([`home/@${this.username}`]);
      }
      
    }
  }
}
