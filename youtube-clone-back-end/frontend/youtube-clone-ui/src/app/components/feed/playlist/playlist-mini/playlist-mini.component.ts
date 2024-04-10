import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PlaylistService } from '../../../../shared/services/playlist/playlist.service';
import { playlistActions } from '../../../../shared/store/playlist/actions';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { StandardDropdownComponent } from '../../../dropdown/standard-dropdown/standard-dropdown.component';
import { Router } from '@angular/router';
import { Video } from '../../../../shared/types/video';

@Component({
    selector: 'app-playlist-mini',
    templateUrl: './playlist-mini.component.html',
    styleUrls: ['./playlist-mini.component.scss'],
    standalone: true,
    imports: [StandardDropdownComponent]
})
export class PlaylistMiniComponent {
  @Input() playlist: PlaylistInterface;
  firstVideo: Video;
  dropDownSettingsItems: any[] = [];


  constructor(private playlistService: PlaylistService, private store: Store, private router: Router) {}

  ngOnInit() {
    this.setDropDownSettings();
  }

  ngAfterViewInit() {
    this.playlistService.getVideos(this.playlist.id!, 1, 0).subscribe({
      next: (response) => {
        this.firstVideo = response.data.playlist.videos[0];
      }
    });
    //this.updateTopValue();
  }

  setDropDownSettings() {
    this.dropDownSettingsItems = [
      {icon: 'edit', text: 'Edit', action: (id: any) => this.edit(id)},
      {icon: 'delete', text: 'Delete', action: (id: any) => this.delete(id)},
    ];
  }

  edit(id: any) {

  }

  delete(id: any) {
    this.store.dispatch(playlistActions.delete({request: id}));
  }

  onOpenPlaylist() {
    const url = 'home/playlist'
    this.router.navigate([url], { queryParams: { list: `${this.playlist.name}` } });
  }

  onPlayAll() {
    //https://www.youtube.com/watch?v=bheUCRpuIzU&list=PLlFiFXELFq7gk7lhceZgqdVoDOvXwX8Pw
    //http://localhost:4200/home/watch?v=b1d8d6e5-ef5f-46f8-9c26-4fb62206c392&i=77
    
    const url = 'home/watch'
    const urlParts = this.firstVideo.videoUrl!.split("/");
    const videoManifestId = urlParts[urlParts.length - 1]; 
    this.router.navigate([url], { queryParams: { v: `${videoManifestId}`, i: `${this.firstVideo.id}`, list: `${this.playlist.name}`, o: `${this.playlist.userId}` } });
  }
}
