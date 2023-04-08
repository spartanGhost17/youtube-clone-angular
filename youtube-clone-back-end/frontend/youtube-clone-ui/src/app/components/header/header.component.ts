import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() {}

  addVideoButtonClicked() {
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
