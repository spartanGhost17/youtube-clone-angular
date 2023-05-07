import { Component, Directive, ElementRef, Input, OnInit, SimpleChanges, TemplateRef, ViewChild, EventEmitter, Output, HostListener } from '@angular/core';
import { Playlist } from '../../models/playlist';

@Directive({
  selector: '[header]'
})
export class Header {
  constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() showDropdown: boolean;
  @Input() header: TemplateRef<any>;
  @Input() body: TemplateRef<any>;
  @Input() footer: TemplateRef<any>;
  @Input() dropdownWidth: string = '400px';
  @Input() buttonRef: ElementRef<any>;

  @Input() playlists: any [];
  
  left: string;
  top: string;
  searchString: string = '';

  isSearchPlaylist: boolean = false;
  isShowBody: boolean = false;

  selectedPlaylists: number = 0;
  @Output() selectedPlaylistEmit: EventEmitter<any[]> = new EventEmitter(); 

  @ViewChild('dropdownBody') dropdownBody: ElementRef<any>;
  @ViewChild('dropdown') dropdown: ElementRef<any>;

  ngOnInit(): void {}

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.showDropdown) {
    }
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    //if show body and clicked element is not inside dropdownBody
    if (this.isShowBody && !this.dropdown.nativeElement.contains(event.target)) {
      this.toggleBody();
    }
  }

  /**
   * clear search string & reset matchSearch field of playlist 
  */
  clearSearch() {
    this.searchString = '';
    this.searchStringUpdate(this.searchString);
  }

  /**
   * show dropdown body
   */
  toggleBody() {
    this.isShowBody = !this.isShowBody;
    if(this.isShowBody) {
      this.dropdownBody.nativeElement.style.display = 'block';
    }
    else {
      this.dropdownBody.nativeElement.style.display = 'none';
    }
  }

  /**
   * On ngModel change for searchString in playlist
   * find matching playlist titles & set non matching strings 'matchSearch' to false 
   * @param searchString string
   */
  searchStringUpdate(searchString: any): void {
    this.isSearchPlaylist = searchString.length > 0;
    this.playlists.filter((playlist) => {
      if(!playlist.playlist.title.toLowerCase().includes(searchString.toLowerCase())) {
        playlist.matchSearch = false;
      }
      else {
        playlist.matchSearch = true;
      }
    });
  }

  /**
   * toggle play list checkbox
   * @param checkbox 
  */
  toggleCheckBox(checkbox: any, input: HTMLInputElement) {
    const checkboxIdx = this.playlists.indexOf(checkbox);
    this.playlists[checkboxIdx].checked = input.checked;
    this.selectedPlaylists = this.tallySelectedPlaylist(this.playlists);
  }

  /**
   * tally selected playlists
   * @param playlists list of playlist
   * @returns number of selected playlists
  */
  tallySelectedPlaylist(playlists : any[]): number{
    return playlists.filter(playlist => playlist.checked).length;
  }

  /**
   * Emit selected playlists
  */
  savedPlaylists(): void {
    const selectedPlaylist = this.playlists.filter(playlist => playlist.checked);
    console.log("Saved Play ",selectedPlaylist);

    if(selectedPlaylist.length > 0){
      this.selectedPlaylistEmit.emit(selectedPlaylist);
      this.toggleBody();
    } 
  }
}
