import { Component } from '@angular/core';

import { NgIf, NgStyle } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Icons } from 'src/app/models/icons';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { PlaylistService } from '../../../../shared/services/playlist/playlist.service';
import { selectCurrentUser } from '../../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../../shared/types/currentUser.interface';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { DragDropListComponent } from '../../../drag-drop-list/drag-drop-list.component';
import { PlaylistMetadataComponent } from '../playlist-metadata/playlist-metadata.component';

@Component({
  selector: 'app-playlist-view',
  templateUrl: './playlist-view.component.html',
  styleUrls: ['./playlist-view.component.scss'],
  standalone: true,
  imports: [NgStyle, PlaylistMetadataComponent, DragDropListComponent, NgIf],
})
export class PlaylistViewComponent {
  collapsedSideBar: boolean = false;
  sidebarWidth: string = '240px'; //fix this, the subject update this at all times and not have a default value set here
  icons: Icons = new Icons();
  thumbnail: string;
  playlist: PlaylistInterface;
  videos: any[] = [];
  currentuser: CurrentUserInterface;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private playlistService: PlaylistService,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.componentUpdatesService.sideBarCollapsed$.subscribe(
      (collapsedSideBar) => {
        console.log('~~~~~~~~ > ', collapsedSideBar);
        this.collapsedSideBar = collapsedSideBar;
      }
    );

    this.componentUpdatesService.sideBarCurrentWidth$.subscribe(
      (sidebarWidth) => {
        console.log('.....> sidebarWidth ', sidebarWidth);
        this.sidebarWidth = sidebarWidth;
      }
    );

    console.log(
      '================================ ',
      this.collapsedSideBar,
      ' val ',
      this.sidebarWidth
    );
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getPlaylistByName();
  }

  /**
   * get playlist by name
   */
  getPlaylistByName() {
    this.route.queryParamMap.subscribe({
      next: (data) => {
        const playlistName = data.get('list');
        if(playlistName) {
          //userId: number, pageSize: number, offset: number
          this.playlistService.getByName(this.currentuser.id, 100, 0, playlistName).subscribe({
            next: (response) => {
              this.playlist = response.data.playlist;
              this.thumbnail = this.playlist.thumbnailUrl!;
              this.getVideos();
            }
          });
        }
        
      }
    });
  }

  /**
   * get current user from state
   */
  getCurrentUser() {
    this.store.select(selectCurrentUser).subscribe({
      next: (user) => {
        if(user) {
          this.currentuser = user;
        }
      }
    })
  }

  /**
   * get videos for playlist
   */
  getVideos() {
    this.playlistService.getVideos(this.playlist.id!, 100, 0).subscribe({
      next: (response) => {
        this.videos = response.data.playlist.videos;
      }
    })
  }

  /**
   * update list of videos based on new order
   * @param event list of objects
   */
  onListUpdate(event: any[]) {
    this.videos = event;
    this.thumbnail = event[0].thumbnailUrl;
  }
}
