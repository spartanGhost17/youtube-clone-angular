import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-video-card-basic',
  templateUrl: './video-card-basic.component.html',
  styleUrls: ['./video-card-basic.component.scss']
})
export class VideoCardBasicComponent {
  @Input() video: any;
  @Input() loading: boolean = false;
  @Input() default: boolean = true;
  @Input() size: string = 'default';//either xtra-small, small or default
  @Input() showIcon: boolean = true; 
  
  constructor(private componentUpdatesService: ComponentUpdatesService, private router: Router) {}

  /**
   * opens video view when video is clicked 
  */
  openVideo() {
    if(this.default) {
      const videoId = "1234455yuwrct";
      const url = `home/watch`;
      this.router.navigate([url], {queryParams: {v: `${videoId}`}} );
    }
  }

  /**
   * opens channel view when avatar or channel name is clicked  
   * @param video 
  */
  onChannelInfoClicked(video: any): void {
    if(this.default) {
      this.router.navigate([`home/@${video.channelName}`]);
    }
  }
}
