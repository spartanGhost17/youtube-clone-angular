import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DragDropListComponent } from '../../drag-drop-list/drag-drop-list.component';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';

@Component({
  selector: 'app-embedded-playlist',
  standalone: true,
  imports: [CommonModule, DragDropListComponent],
  templateUrl: './embedded-playlist.component.html',
  styleUrls: ['./embedded-playlist.component.scss']
})
export class EmbeddedPlaylistComponent implements OnInit {
  playlistItems: any[] = [];
  isLooping: boolean = false;
  isOnShuffle: boolean = false;
  playlist: PlaylistInterface;
  dropDownItems: any[] = [];
  isPublic: boolean = false;
  isPrivate: boolean = false;
  isUnlisted: boolean = false;
  
  ngOnInit(): void {
    this.playlistItems = [
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/goku_god_mode.jpg',
        channelName: 'ALJordan',
        title: 'Superman Number #1 DC rebirth',
        viewCount: '12K',
        postTime: '8 months'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/vagabon_manga.jpg',
        channelName: 'ALJordan',
        title: 'The Greatest Manga Ever Written | Vagabon a Story For The Ages',
        viewCount: '2.4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/green_lanter_vs_sinestro.jpg',
        channelName: 'DC Central',
        title: 'Why AL Jordan Came Back | Crisis Event',
        viewCount: '4K',
        postTime: '10 months'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/batman_and_superman_detective_comics.jpg',
        channelName: 'ALJordan',
        title: 'Batman and Superman Defeats Perpetua',
        viewCount: '4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/justice_league.jpg',
        channelName: 'ALJordan',
        title: 'Justice League Vs Perpetua',
        viewCount: '4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/green_lantern_rising.png',
        channelName: 'ALJordan',
        title: 'AL Jordan\'s History',
        viewCount: '4K',
        postTime: '4 hours'
      },
      {
        playlistName: 'District 59 trailer Inspiration',
        thumbnailURL: '../../../../assets/superman_sits_on_clouds.jpg',
        channelName: 'ALJordan',
        title: 'Jorge Jimenez Superman',
        viewCount: '4K',
        postTime: '4 hours'
      },
    ];

    
    this.playlist = {
      id: 22,
      name: 'Anime and comics',
      visibilityStatus: {id: 0, statusName:'private'},
      description: 'This is the description',
      videos: this.playlistItems 
    }

    this.dropDownItems = [
      { icon: 'schedule', text: 'Save to Watch Later', action: () => {} },
      { icon: 'playlist_add', text: 'Save to playlist', action: () => {} },
      { icon: 'delete', text: 'Remove from', action: () => {} },
      { icon: 'download', text: 'Download', action: () => {} },
      { icon: 'share', text: 'Share', action: () => {} }
    ]

    this.checkStatus();
  }

  checkStatus(): void {
    if(this.playlist.visibilityStatus.statusName.toLocaleLowerCase() === 'public') {
      this.isPublic = true;
    }
    else if(this.playlist.visibilityStatus.statusName.toLocaleLowerCase() === 'private') {
      this.isPrivate = true;
    }
    else { 
      this.isUnlisted = true;
    }
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
