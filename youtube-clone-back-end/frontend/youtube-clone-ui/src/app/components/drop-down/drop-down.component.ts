import { Component, Directive, ElementRef, Input, OnInit, SimpleChanges, TemplateRef, ViewChild, EventEmitter, Output, HostListener, QueryList, ViewChildren } from '@angular/core';
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
  @Input() dropdownWidth: string = '400px';
  @Input() buttonRef: ElementRef<any>;
  @Input() searchable: boolean = true;
  @Input() hasFooter: boolean = true;
  @Input() multiSelect: boolean = true;

  @Input() playlists: any [];
  
  left: string;
  top: string;
  searchString: string = '';
  selectedTitle: string = '';
  previousSelected: string = '';
  previousSelectedIdx: number = 0;

  isSearchPlaylist: boolean = false;
  isShowBody: boolean = false;
  

  selectedPlaylists: number = 0;
  @Output() selectedPlaylistEmit: EventEmitter<any[]> = new EventEmitter();
  @Output() createPlaylistEvent: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('dropdownBody') dropdownBody: ElementRef<any>;
  @ViewChild('dropdown') dropdown: ElementRef<any>;
  @ViewChildren('input') input: QueryList<ElementRef>;

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
   * toggle playlist checkbox
   * if multiSelect is false enforce only one checkbox to be selected at a time
   * else allow multiple selections
   * @param checkbox 
  */
  toggleCheckBox(checkbox: any, input: HTMLInputElement) {
    const checkboxIdx = this.playlists.indexOf(checkbox);
    this.previousSelectedIdx = checkboxIdx;
    if(this.multiSelect) {
      this.playlists[checkboxIdx].checked = input.checked;
      this.selectedPlaylists = this.tallySelectedPlaylist(this.playlists);
    }
    else{
      console.log("multiSelect ?id ",input.id, ' selected ', input.checked);
      for(let i = 0; i < this.playlists.length; i++){
        if(i === checkboxIdx && input.checked) {
          //reset previous checkbox
          this.input.toArray().filter((input) => {
            if(input.nativeElement.id === this.previousSelected) {
              input.nativeElement.checked = false;
              this.playlists[this.previousSelectedIdx].checked = false;
            }
          });
          this.playlists.filter((playlist) => {playlist.checked = false});
          this.previousSelected = input.id;//current is now previous
          //make current checkbox active
          this.playlists[checkboxIdx].checked = input.checked;
          this.selectedTitle = this.playlists[checkboxIdx].playlist.title;
        }
      }
      this.savedPlaylists();
    }
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

  /**
   * Create a new playlist event emitter 
  */
  createNewPlaylist() {
    this.createPlaylistEvent.emit(true);
  }
}
