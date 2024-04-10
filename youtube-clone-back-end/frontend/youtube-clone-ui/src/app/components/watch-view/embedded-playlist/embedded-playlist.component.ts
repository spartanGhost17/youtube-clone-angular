import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { DragDropListComponent } from '../../drag-drop-list/drag-drop-list.component';
import { Video } from '../../../shared/types/video';
import { PlaylistService } from '../../../shared/services/playlist/playlist.service';
import { UserService } from '../../../shared/services/user/user.service';

@Component({
  selector: 'app-embedded-playlist',
  standalone: true,
  imports: [CommonModule, DragDropListComponent],
  templateUrl: './embedded-playlist.component.html',
  styleUrls: ['./embedded-playlist.component.scss']
})
export class EmbeddedPlaylistComponent implements OnInit {
  playlistItems: Video[] = [];
  isLooping: boolean = false;
  isOnShuffle: boolean = false;
  playlist: PlaylistInterface;
  dropDownItems: any[] = [];
  active: number = 0;
  pageSize: number = 100;
  offset: number = 0;
  ownerUsername: string;
  status: string;
  @Input() name: string;
  @Input() owner: number;
  @Input() index: number;

  constructor(private playlistService: PlaylistService, private userService: UserService) {}
  
  ngOnInit(): void {
    this.getPlaylist();

    this.dropDownItems = [
      { icon: 'schedule', text: 'Save to Watch Later', action: () => {} },
      { icon: 'playlist_add', text: 'Save to playlist', action: () => {} },
      { icon: 'delete', text: 'Remove from', action: () => {} },
      { icon: 'download', text: 'Download', action: () => {} },
      { icon: 'share', text: 'Share', action: () => {} }
    ]

    
  }

  /**
   * get playlist by name
   */
  getPlaylist() {
    this.playlistService.getByName(this.owner, 100, 0, this.name).subscribe({
      next: (res) => {
        this.playlist = res.data.playlist;
        this.getVideos();      
        this.getOwnerUsername();
        this.checkStatus();
      }
    });
  }

  /**
   * get user name of owner
   */
  getOwnerUsername() {
    this.userService.getUserByUserId(this.owner).subscribe({
      next: (res) => {
        this.ownerUsername = res.data.user.username
      }
    })
  }

  /**
   * get playlist videos
   */
  getVideos() {
    this.playlistService.getVideos(this.playlist.id!, this.pageSize, this.offset).subscribe({
      next: (res) => {
        this.playlistItems = res.data.playlist.videos;
      }
    });
  }

  checkStatus(): void {
    this.status = this.playlist.visibilityStatus.statusName.charAt(0).toUpperCase() + this.playlist.visibilityStatus.statusName.substring(1, this.playlist.visibilityStatus.statusName.length + 1).toLowerCase()//.slice(1).toLowerCase();
  }

  onListUpdated(list: any) {
    this.playlistItems = list;
  }

  onLoopingClicked(): void {
    this.isLooping = !this.isLooping;
  }

  onShuffleClicked(): void {
    this.isOnShuffle = !this.isOnShuffle;
  }

}
