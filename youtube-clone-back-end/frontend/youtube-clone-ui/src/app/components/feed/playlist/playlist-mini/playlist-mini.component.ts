import { Component, Input } from '@angular/core';
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

  //videoCount: number = 0;
  dropDownSettingsItems: any[] = [];
  //hoverTop: string = '0px';


  constructor() {

  }

  ngOnInit() {
    this.setDropDownSettings();
  }

  ngAfterViewInit() {
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

  }

  onOpenPlaylist() {

  }
}
