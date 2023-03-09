import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  avatarImage: string = '../../../assets/goku.jpg';
  @Input() showSearchBar: boolean =true;
  @Input() openModal: () => void;
  @Output() uploadVideoButtonClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  addVideoButtonClicked() {
    this.uploadVideoButtonClicked.emit(true);
  }
}
