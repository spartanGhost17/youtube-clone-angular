import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Video } from '../../shared/types/video';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { VideoCardBasicComponent } from '../video-displays/video-card-basic/video-card-basic.component';
import { NgStyle, NgFor } from '@angular/common';

@Component({
    selector: 'app-videos-explorer',
    templateUrl: './videos-explorer.component.html',
    styleUrls: ['./videos-explorer.component.scss'],
    standalone: true,
    imports: [NgStyle, NgFor, VideoCardBasicComponent]
})
export class VideosExplorerComponent {
  
  sibarWidth: string;
  sidebarType: string = 'hover';
  @Input() videos: any[] = [];

  constructor(private componentUpdatesService :ComponentUpdatesService, private router: Router){
    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((width) => {
      console.log(`width ${width}`);
      this.sibarWidth = width;
    })
  }

  ngOnInit() {}
  
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
