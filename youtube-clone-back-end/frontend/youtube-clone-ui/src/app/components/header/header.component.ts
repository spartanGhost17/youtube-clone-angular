import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Icons } from '../../models/icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  avatarImage: string = '../../../assets/goku.jpg';
  shouldSideBar: boolean = false;
  searchString: string = '';
  @Input() showSearchBar: boolean = true;
  @Input() openModal: () => void;
  @Output() uploadVideoButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchTriggered: EventEmitter<string> = new EventEmitter<string>();
  icons : Icons = new Icons();
  ICON_SEARCH_LIGHT: string =  '../'+this.icons.iconsPaths['search-light'];
  ICON_YOUTUBE: string = '../'+this.icons.iconsPaths['yt-logo-light'];
  ICON_BURGER: string = '../'+this.icons.iconsPaths['burger-light'];
  ICON_USER: string = '../../../assets/goku.jpg';
  ICON_CAMERA: string = '../'+this.icons.iconsPaths['camera-light'];
  ICON_BELL: string = '../'+this.icons.iconsPaths['bell-dark'];
  
  constructor() {
    console.log();
  }

  addVideoButtonClicked() {
    console.log("add video button");
    this.uploadVideoButtonClicked.emit(true);
  }

  search() {
    console.log("search string ", this.searchString);
    this.searchTriggered.emit(this.searchString);
  }

  /**
   * Toggle sidebar event
   */
  toggleSideBar() {
    this.shouldSideBar = !this.shouldSideBar;
    console.log("toggle side bar ", this.shouldSideBar);
    this.showSideBar.emit(this.shouldSideBar);
  }
}
