import { ChangeDetectorRef, Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { Icons } from 'src/app/models/icons';

@Component({
  selector: 'app-playlist-metadata',
  templateUrl: './playlist-metadata.component.html',
  styleUrls: ['./playlist-metadata.component.scss']
})
export class PlaylistMetadataComponent {
  icons: Icons = new Icons();
  TITLE_MAX_CHAR_COUNT: number = 500;
  ICON_PEN: string = this.icons.iconsPaths['pen-light'];
  ICON_ELIPSIS: string = this.icons.iconsPaths['elipsis-light'];
  ICON_PLAY: string = this.icons.iconsPaths['play-dark'];
  ICON_PLAY_LIGHT: string = this.icons.iconsPaths['play-light'];
  ICON_SHUFFLE: string = this.icons.iconsPaths['shuffle-light'];
  //THUMBNAIL: string = '../../../assets/mr_wick.jpeg';
  //THUMBNAIL: string = '../../../assets/goku_god_mode.jpg';
  //THUMBNAIL: string = '../../../assets/batman.jpg';
  //THUMBNAIL: string = '../../../assets/batman2.jpg';
  @Input() thumbnail: string; //= '../../../assets/superman_jorge_jimenez.jpg';
  //THUMBNAIL: string = '../../../assets/green-lantern.jpg';
  //THUMBNAIL: string = '../../../assets/light-yagami.png';

  editSection: string = '';


  //playlistTitle: string = 'John Wick Lore';
  playlistTitle: string = 'Green Lantern\'s Home';
  userHandle: string = 'Mr Fiction';
  totalVideos: number = 2;
  totalViews: string = 'No';
  description: string = 'No description';


  editTitleText: string = '';
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('restart side data!!!! \n new image is ', this.thumbnail);
  }

  onEdit(sectionName: string) {
    this.editSection = sectionName;
    this.editTitleText = this.editSection==='title'? this.playlistTitle : this.description;
    //this.title.nativeElement.classList.add('hover-underline-animation');
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
    console.log("char count ==> ",event);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.thumbnail) {
      console.log('Input value has changed:', changes.thumbnail.currentValue);
      //this.cdr.markForCheck();
      this.ngOnInit();
    }
  }

}
