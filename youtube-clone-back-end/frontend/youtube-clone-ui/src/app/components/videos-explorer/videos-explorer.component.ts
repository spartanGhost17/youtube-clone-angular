import { Component } from '@angular/core';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-videos-explorer',
  templateUrl: './videos-explorer.component.html',
  styleUrls: ['./videos-explorer.component.scss']
})
export class VideosExplorerComponent {
  
  sibarWidth: string;

  constructor(private componentUpdatesService :ComponentUpdatesService){
    this.componentUpdatesService.sideBarCurrentWidth.subscribe((width) => {
      console.log(`width ${width}`);
      this.sibarWidth = width;
    })
  }
  
  test() {
    this.componentUpdatesService.sideBarCurrentWidth.subscribe((width) => {
      console.log(`width ${width}`);
    })
  }
}
