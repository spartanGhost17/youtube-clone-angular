import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { StandardDropdownComponent } from '../../../dropdown/standard-dropdown/standard-dropdown.component';

@Component({
    selector: 'app-playlist-mini',
    templateUrl: './playlist-mini.component.html',
    styleUrls: ['./playlist-mini.component.scss'],
    standalone: true,
    imports: [StandardDropdownComponent]
})
export class PlaylistMiniComponent {
  @Input() playlist: PlaylistInterface;

  videoCount: number = 0;
  dropDownSettingsItems: any[] = [];
  //hoverTop: string = '0px';


  constructor() {

  }

  ngOnInit() {
    this.setVideoCount();
    this.setDropDownSettings();
  }

  ngAfterViewInit() {
    //this.updateTopValue();
  }

  setVideoCount() {
    this.videoCount = this.playlist.size? this.playlist.size : 0; //this.playlist?.videos? this.playlist.videos.length : 0;
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

  }

  onOpenPlaylist() {

  }
}
