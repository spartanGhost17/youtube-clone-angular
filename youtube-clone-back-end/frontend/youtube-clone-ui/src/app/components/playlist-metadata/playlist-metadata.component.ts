import { Component, ElementRef, ViewChild } from '@angular/core';
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
  THUMBNAIL: string = '../../../assets/green-lantern.jpg';
  //THUMBNAIL: string = '../../../assets/light-yagami.png';

  editSection: string = '';


  //playlistTitle: string = 'John Wick Lore';
  playlistTitle: string = 'Green Lantern\'s Home';
  userHandle: string = 'Mr Fiction';
  totalVideos: number = 2;
  totalViews: string = 'No';
  description: string = 'No description';


  editTitleText: string = ''; 
  //editTitleText: string = this.editSection==='title'? this.playlistTitle : this.description;
  //editDescriptTex: string = this.description;

  //@ViewChild('PenIcon', { static: true }) PenIcon: ElementRef;
  //@ViewChild('title') title!: ElementRef;

  constructor() {}

  /*ngAfterViewInit() {
    //const parentBgColor = getComputedStyle(this.PenIcon.nativeElement.parentNode).backgroundColor;
    const parentBgColor = getComputedStyle(this.PenIcon.nativeElement.parentNode).backgroundColor;
    const lighterColor = this.lightenColor(parentBgColor, 0.2);
    console.log("lighter color ",lighterColor, " - ", parentBgColor);
    //this.PenIcon.nativeElement.style.backgroundColor = lighterColor;
  }*/
  //PenIcon

  /**
   * 
   * @param color color of div background
   * @param amount alpha value 0 <= x <= 1
   * @returns 
   */
  /*lightenColor(color: string, amount: number): string {
    let usePound = false;

    if (color[0] === '#') {
      color = color.slice(1);
      usePound = true;
    }

    const num = parseInt(color, 16);
    let r = (num >> 16) + amount;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    let b = ((num >> 8) & 0x00ff) + amount;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    let g = (num & 0x0000ff) + amount;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
  }*/

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
}
