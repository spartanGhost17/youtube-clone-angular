import { Component } from '@angular/core';

import { Icons } from 'src/app/models/icons';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { DragDropListComponent } from '../../../drag-drop-list/drag-drop-list.component';
import { PlaylistMetadataComponent } from '../playlist-metadata/playlist-metadata.component';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'app-playlist-view',
    templateUrl: './playlist-view.component.html',
    styleUrls: ['./playlist-view.component.scss'],
    standalone: true,
    imports: [NgStyle, PlaylistMetadataComponent, DragDropListComponent]
})
export class PlaylistViewComponent {

  collapsedSideBar: boolean = false;
  sidebarWidth: string = '240px';//fix this, the subject update this at all times and not have a default value set here
  icons: Icons = new Icons();
  thumbnail: string;
  videos: any[] = [];


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

  ngOnInit() {
    this.videos = [
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/superman_flying.jpg',
        channelName: 'ALJordan',
        title: 'Superman Number #1 DC rebirth',
        viewCount: '12K',
        postTime: '8 months'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/vagabon_manga.jpg',
        channelName: 'ALJordan',
        title: 'The Greatest Manga Ever Written | Vagabon a Story For The Ages',
        viewCount: '2.4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/green_lanter_vs_sinestro.jpg',
        channelName: 'DC Central',
        title: 'Why AL Jordan Came Back | Crisis Event',
        viewCount: '4K',
        postTime: '10 months'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/batman_and_superman_detective_comics.jpg',
        channelName: 'ALJordan',
        title: 'Batman and Superman Defeats Perpetua',
        viewCount: '4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/justice_league.jpg',
        channelName: 'ALJordan',
        title: 'Justice League Vs Perpetua',
        viewCount: '4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/green_lantern_rising.png',
        channelName: 'ALJordan',
        title: 'AL Jordan\'s History',
        viewCount: '4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../assets/superman_sits_on_clouds.jpg',
        channelName: 'ALJordan',
        title: 'Jorge Jimenez Superman',
        viewCount: '4K',
        postTime: '4 hours'
      },
    ];
    this.thumbnail = this.videos[0].thumbnailURL;
    console.log("prior list: ", this.videos)
  }

  /**
   * update list of videos based on new order
   * @param event list of objects 
  */
  onListUpdate(event : any[]) {
    console.log("list updated now in parent \n", event);
    console.log("old list  old list: ", this.videos)
    this.videos = event;
    this.thumbnail = event[0].thumbnailURL;
  }

}
