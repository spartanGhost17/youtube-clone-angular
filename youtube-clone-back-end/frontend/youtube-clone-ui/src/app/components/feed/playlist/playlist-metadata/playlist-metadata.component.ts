import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Icons } from 'src/app/models/icons';
import { FormsModule } from '@angular/forms';
import { NgStyle, NgIf, NgTemplateOutlet, DatePipe } from '@angular/common';
import { ContainerBgGradiantDirective } from '../../../../directives/background-gradiant/container-bg-gradiant.directive';
import { PlaylistInterface } from '../../../../shared/types/playlist.interface';
import { UserService } from '../../../../shared/services/user/user.service';
import { PlaylistService } from '../../../../shared/services/playlist/playlist.service';

@Component({
    selector: 'app-playlist-metadata',
    templateUrl: './playlist-metadata.component.html',
    styleUrls: ['./playlist-metadata.component.scss'],
    standalone: true,
    imports: [ContainerBgGradiantDirective, NgStyle, NgIf, NgTemplateOutlet, FormsModule, DatePipe]
})
export class PlaylistMetadataComponent {
  icons: Icons = new Icons();
  TITLE_MAX_CHAR_COUNT: number = 500;
  ICON_PEN: string = this.icons.iconsPaths['pen-light'];
  ICON_ELIPSIS: string = this.icons.iconsPaths['elipsis-light'];
  ICON_PLAY: string = this.icons.iconsPaths['play-dark'];
  ICON_PLAY_LIGHT: string = this.icons.iconsPaths['play-light'];
  ICON_SHUFFLE: string = this.icons.iconsPaths['shuffle-light'];

  @Input() thumbnail: string; //= '../../../assets/superman_jorge_jimenez.jpg';
  @Input() metadata: PlaylistInterface;

  editSection: string = '';


  //playlistTitle: string = 'John Wick Lore';
  playlistTitle: string = 'Green Lantern\'s Home';
  userHandle: string = 'Mr Fiction';
  //totalVideos: number = 2;
  totalViews: string = 'No';
  description: string = 'No description';


  editTitleText: string = '';
  
  constructor(private cdr: ChangeDetectorRef, private userService: UserService, private playlistService: PlaylistService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.description = this.metadata?.description!;
    this.getOwner();
  }

  getOwner() {
    this.userService.getUserByUserId(this.metadata.userId!).subscribe({
      next: (response) => {
        this.userHandle = response.data.user.username;
      }
    });
  }

  onEdit(sectionName: string) {
    this.editSection = sectionName;
    this.editTitleText = this.editSection==='title'? this.playlistTitle : this.description;
  }

  cancelEdit(): void {
    if(this.editSection === 'title') {
      this.editSection = '';
      this.editTitleText = this.playlistTitle;
    }
    else {
      this.editSection = '';
      this.editTitleText = this.description;
    }
  }

  saveEdit(): void {
    if(this.editSection === 'title') {
      this.editSection = '';
      this.playlistTitle = this.editTitleText;
    }
    else {
      this.editSection = '';
      this.description = this.editTitleText;
    }
  }

  /**
   * Needs to be implemented
   * @param event 
   */
  checkLength(event: any) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.thumbnail) {
      //this.ngOnInit();
    }
  }

}
