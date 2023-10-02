import { Component } from '@angular/core';

import { Icons } from 'src/app/models/icons';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss']
})
export class PlaylistViewComponent {

  collapsedSideBar: boolean = false;
  sidebarWidth: string = '240px';//fix this, the subject update this at all times and not have a default value set here
  icons: Icons = new Icons();
  ICON_ELIPSIS: string = this.icons.iconsPaths['elipsis-light'];
  ICON_BURGER: string = this.icons.iconsPaths['burger-light'];
  THUMBNAIL: string = '../../../assets/goku_god_mode.jpg'

  videoTitle: string = 'Why Al Jordan came back | Crisis Event';
  channelName: string = 'DC Central';
  
  //this.sidebarWidth = '240px';


  constructor(private componentUpdatesService: ComponentUpdatesService) {
    this.componentUpdatesService.sideBarCollapsed$.subscribe((collapsedSideBar) => {
      console.log("~~~~~~~~ > ",collapsedSideBar);
      this.collapsedSideBar = collapsedSideBar;
    });

    this.componentUpdatesService.sideBarCurrentWidth$.subscribe((sidebarWidth) => {
      console.log(".....> sidebarWidth ",sidebarWidth);
      this.sidebarWidth = sidebarWidth;
    });

    console.log("================================ " ,this.collapsedSideBar, ' val ', this.sidebarWidth);
  }
  /**
   * subscribe to the sideBarCollapsed event
   */
  /*ngAfterViewInit() {
    this.componentUpdatesService.sideBarCollapsed.subscribe((collapsedSideBar) => {
      console.log("~~~~~~~~ > ",collapsedSideBar);
    });
  }*/
}
