import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaylistService } from '../../../shared/services/playlist/playlist.service';
import { selectPlaylists } from '../../../shared/store/playlist/reducers';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { Video } from '../../../shared/types/video';
import { VideoCardComponent } from '../../video-displays/video-card/video-card.component';
import { playlistActions } from '../../../shared/store/playlist/actions';
import { ProgressBarService } from '../../../shared/services/progress-bar/progress-bar.service';

@Component({
    selector: 'app-history-view',
    templateUrl: './history-view.component.html',
    styleUrls: ['./history-view.component.scss'],
    standalone: true,
    imports: [NgFor, VideoCardComponent, NgIf]
})
export class HistoryViewComponent {
  videoHistory: Video[] = [];
  test: string[] = [];
  pageSize: number = 100;
  offset: number = 0;
  currentUser: CurrentUserInterface;

  constructor(private playlistService: PlaylistService, private store: Store, private progressBarService: ProgressBarService) {}//Store<{user: CurrentUserInterface, playlist: PlaylistsStateInterface}>) {}

  ngOnInit(): void {
    this.store.select(selectCurrentUser).subscribe({
      next: (user) => {
        if(user) {
          this.currentUser = user;
        }
      }
    });

    this.getHistory();
  }

  ngAfterViewInit() {
    this.setHistoryVideos();
  }
  
  /**
   *  set history to videos
  */
  setHistoryVideos() {
    this.progressBarService.startLoading();
    this.store.select(selectPlaylists).subscribe({
      next: (playlist) => {
        if(playlist) {
          const history: PlaylistInterface = playlist.filter(pl => pl.name.toLowerCase().trim() === 'history')[0];
          if(history) {//get videos
            
            this.playlistService.getVideos(history.id!, this.pageSize, this.offset).subscribe({
              next: (response) => {
                const historyPlaylist: PlaylistInterface = response.data.playlist;
                this.videoHistory = [...this.videoHistory, ...historyPlaylist.videos!];
                this.progressBarService.completeLoading();  
              }
            });
          }
        }
      }
    });
  }

  /**
   * add history playlist to state
  */
  getHistory() {
    this.store.select(selectPlaylists).subscribe({
      next: (playlists) => {
        const history: PlaylistInterface = playlists.filter(pl => pl.name.toLowerCase().trim() === 'history')[0];
        if(!history) {
          this.store.dispatch(playlistActions.getHistory({pageSize: this.pageSize, offset: this.offset, userId: this.currentUser.id, name: 'history'}));
        } 
      }
    });
  }
}
