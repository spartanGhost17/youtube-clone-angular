import { NgFor, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { VideoCardBasicComponent } from '../video-displays/video-card-basic/video-card-basic.component';

@Component({
    selector: 'app-videos-explorer',
    templateUrl: './videos-explorer.component.html',
    styleUrls: ['./videos-explorer.component.scss'],
    standalone: true,
    imports: [NgStyle, NgFor, VideoCardBasicComponent]
})
export class VideosExplorerComponent {
  
  sibarWidth: string;
  sidebarType: string = 'side';
  @Input() feed: any[];
  @Input() loading: boolean;

  constructor(private componentUpdatesService :ComponentUpdatesService, private router: Router){}

  ngOnInit() {
    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((width) => {
      this.sibarWidth = width;
    });

    this.updateHoverType();
  }

  updateHoverType() {
    this.componentUpdatesService.sideBarTypeUpdate(this.sidebarType)
  }
}
