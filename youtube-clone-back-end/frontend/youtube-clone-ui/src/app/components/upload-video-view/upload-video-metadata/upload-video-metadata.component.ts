import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { Video } from '../../../shared/types/video';
import { SnackbarService } from '../../../shared/services/snack-bar-messages/snackbar.service';
import { ChipsComponent } from '../../chips/chips.component';
import { DropDownComponent } from '../../dropdown/drop-down/drop-down.component';
import { ModalComponent } from '../../modal/modal.component';
import { VideoCardBasicComponent } from '../../video-displays/video-card-basic/video-card-basic.component';

@Component({
    selector: 'app-upload-video-metadata',
    templateUrl: './upload-video-metadata.component.html',
    styleUrls: ['./upload-video-metadata.component.scss'],
    standalone: true,
    imports: [ NgFor, NgClass, CommonModule, FormsModule, DropDownComponent, ChipsComponent, VideoCardBasicComponent, ModalComponent],
  })
export class UploadVideoMetadataComponent {
  
  largeThumbnailURL: string = '';
  //descriptionText: string = '';
  //titleText: string = '';
  newPlaylistDescription: string = '';
  newPlaylistTitle: string = '';
  
  MAX_DESCRIPTION_COUNT: number = 5000;
  MAX_TITLE_COUNT: number = 100;

  //titleValue: string | null = null;
  //textValue: string | null = null;
  showExtraMetadataText: string = 'SHOW MORE';
  
  showDropdown: boolean = false;
  isVisibleNewPlaylist: boolean = false;
  shouldShowExtraMeta: boolean = false;
  allPlaylistsChecked: boolean = false;
  showPlayList: boolean = false;
  indeterminate:boolean = true;
  isNewPlaylist: boolean = false;
  
  checkOptionsOnePlaylist = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];

  thumbnails: any = [];

  //hGutter = 8;
  //vGutter = 16;
  count = 4;
  //array = new Array(this.count);
  fallback =
    'data:image/png;base64,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';
  @Output() videoTitleChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() metadataUpdated: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() playlistUpdated: EventEmitter<PlaylistInterface[]> = new EventEmitter<PlaylistInterface[]>();
  @Output() categoriesUpdated: EventEmitter<PlaylistInterface[]> = new EventEmitter<PlaylistInterface[]>();
  @ViewChild('playListBtn') showPlaylistBtn: ElementRef<any>;
  @ViewChild('descriptionTextArea') descriptionTextArea: ElementRef<any>;

  data = [
    { label: 'Item 1', checked: false },
    { label: 'Item 2', checked: false },
    { label: 'Item 3', checked: false },
    { label: 'Item 4', checked: false },
    { label: 'Item 5', checked: false },
    { label: 'Item 6', checked: false },
    { label: 'Item 7', checked: false },
    { label: 'Item 8', checked: false },
    { label: 'Item 9', checked: false },
    { label: 'Item 10', checked: false },
    { label: 'Item 11', checked: false },
    { label: 'Item 12', checked: false },
    { label: 'Item 13', checked: false },
    { label: 'Item 14', checked: false },
    { label: 'Item 15', checked: false },
    { label: 'Item 16', checked: false },
  ];

  //video: any;

  @Input() videoFileName = "Ultra Instinct ｜ Dragon Ball Super.mp4"
  @Input() videoURL = "https://youtu.be/GMes87zIQ08";
  @Input() video: Video;
  @Input() playlists: any[];
  @Input() categories: any[];
  visibility: any[];


  constructor(private messageService: SnackbarService, private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.thumbnails = [
      {url: '../../../../assets/batman.jpg', isActive: true},
      {url: '../../../../assets/goku_god_mode.jpg', isActive: false},
      {url: '../../../../assets/green-lantern.jpg', isActive: false},
      {url: '../../../../assets/mr_wick.jpeg', isActive: false},
      {url: '../../../../assets/batman.jpg', isActive: false},
      {url: '../../../../assets/goku_god_mode.jpg', isActive: false},
      {url: '../../../../assets/green-lantern.jpg', isActive: false},
      {url: '../../../../assets/mr_wick.jpeg', isActive: false},
    ];

    this.visibility = [
      {playlist: {id: '', title: 'PUBLIC'},checked: false, matchSearch: true},
      {playlist: {id: '', title: 'PRIVATE'},checked: false, matchSearch: true},
      {playlist: {id: '', title: 'UNLISTED'},checked: false, matchSearch: true}
    ]

    this.largeThumbnailURL = this.thumbnails[0].url;
    console.log("this UPLOAD VIDEO COMPONENT IS LOADED");
    //this.video = {
    //  thumbnailUrl: this.largeThumbnailURL,
    //  videoURL: '../../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4'
    //};
  }



  /**
   * called whenever a metadata is updated  
  */
  onMetadataUpdated():void {
    this.metadataUpdated.emit(this.video);
  }

  /**
   * add a new line when enter is pressed 
   * @param event 
  */
  onEnterKeyPressedDescrpt(event: any): void {
    console.log('Enter key pressed before ', this.video.description);
    // Append a newline character to the current ngModel value newlineToSpace
    this.video.description += '\n';//maybe delete this
    console.log('Enter key pressed before ', this.video.description);
    let newlineCount = (this.video.description!.match(/\n/g) || []).length;

    console.log("Number of newline characters: " + newlineCount);
  }

  /**
   * Selected playlists from playlist dropdown 
   * @param event list of playlists with selected items
  */
  selectedPlaylists(event: any) {
    this.playlistUpdated.emit(this.playlists);
  }

  /**
   * emit selected category
   * @param event list of categories with selected items
   */
  selectedCategories(event: any) {
    this.categoriesUpdated.emit(event);
  }

  /**
   * toggle active thumbnail
   * @param thumbnail thumbnail object
   */
  toggleActiveThumbnail(thumbnail: any) {
    const thumbnailIndex = this.thumbnails.indexOf(thumbnail);
    for(let i=0; i<this.thumbnails.length; i++) {
      if(thumbnailIndex === i) {
        this.thumbnails[i].isActive = true;
        this.largeThumbnailURL = this.thumbnails[i].url;
        console.log("changing LARGE thumbnail ", this.largeThumbnailURL);
      }
      else {
        this.thumbnails[i].isActive = false;
      }
    }
    this.updateVideoThumbnail();
  }

  updateVideoThumbnail() {
    this.video.thumbnailUrl = this.largeThumbnailURL;
  }

  /**
   * event binding for create new playlist
   * @param event boolean 
  */
  showCreatePlaylistModal(event: boolean) {
    this.isNewPlaylist = event;
    console.log("event create playlist ", event);
  }

  /**
   * updated the value of isNewPlaylist which determines whether to hide the new playlist modal or not
   * @param event 
  */
  newPlaylistShowUpdated(event: boolean) {
    this.isNewPlaylist = event;
  }

  /**
   * makes a post request to create a new playlist  
  */
  createPlaylist() {

  }

  /**
   * cancel new playlist creation 
  */
  cancel() {
    this.onMetadataUpdated();
    this.isNewPlaylist = false;
  }

  chipsUpdated(tags: any) {
    this.video.tags = tags;
    this.onMetadataUpdated();
    console.log("updated chips ", tags);
  }

  /*onTitleUpdated(event: any) {
    this.onMetadataUpdated();
  }
  
  onDescriptionUpdated(event: any) {
    this.onMetadataUpdated();
  }*/

  /**
   * add to height of description box on key up based on scrollheight 
   * @param event keyup event
  */
  handleKeyUpDescription(event : any) {
    this.descriptionTextArea.nativeElement.style.height = "auto";
    let scrllHeight = event.target.scrollHeight;
    this.descriptionTextArea.nativeElement.style.height = `${scrllHeight}px`;
  }

  //getTitleValue(){
  //  return this.titleValue;
  //}

  onVideoTitleChanged(): void{
    //this.titleValue = value;
    this.videoTitleChanged.emit(this.video.title);
  }

  showExtraMetadata(): void{
    this.shouldShowExtraMeta = !this.shouldShowExtraMeta;
    if(this.shouldShowExtraMeta){
      this.showExtraMetadataText = "SHOW LESS";
    }
    else{
      this.showExtraMetadataText = "SHOW MORE";
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    console.log("toggleDropdown", this.showDropdown);
  }

  showUserPlayLists(){
    this.showPlayList = true;
    //should have a call to fetch this user's playlists from mongodb
    //add those playlists to array of playlists
    //map them to selection check
  }

  selectSinglePlaylist(value: boolean, item: any): void{
    this.data.forEach(playlist => {
      if(playlist===item) {
        playlist.checked = true;
      }
    })
  }

  closeCreateNewPlaylist() {
    this.isVisibleNewPlaylist = false;
  }

  /**
   * copy videURL to clipboard 
  */
  onCopyToClipboard() {
    navigator.clipboard.writeText(this.videoURL);
    this.messageService.openSnackBar("Link copied to clipboard");
  }
}
