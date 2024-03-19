import { CommonModule, NgClass, NgFor } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { Video } from '../../../shared/types/video';
import { SnackbarService } from '../../../shared/services/snack-bar-messages/snackbar.service';
import { ChipsComponent } from '../../chips/chips.component';
import { DropDownComponent } from '../../dropdown/drop-down/drop-down.component';
import { ModalComponent } from '../../modal/modal.component';
import { VideoCardBasicComponent } from '../../video-displays/video-card-basic/video-card-basic.component';
import { VideoThumbnail } from '../../../shared/types/videoThumbnail.interface';
import { Store } from '@ngrx/store';
import { selectStatus } from '../../../shared/store/status/reducers';
import { normalizeSelection } from '../../../shared/utils/sharedUtils';

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
  //allPlaylistsChecked: boolean = false;
  showPlayList: boolean = false;
  //indeterminate:boolean = true;
  isNewPlaylist: boolean = false;
  

  thumbnails: VideoThumbnail[] = [];
  count = 4;

  @Output() videoTitleChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() metadataUpdated: EventEmitter<Video> = new EventEmitter<Video>();
  @Output() playlistUpdated: EventEmitter<PlaylistInterface[]> = new EventEmitter<PlaylistInterface[]>();
  @Output() categoriesUpdated: EventEmitter<PlaylistInterface[]> = new EventEmitter<PlaylistInterface[]>();
  @Output() tagsUpdated: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('playListBtn') showPlaylistBtn: ElementRef<any>;
  @ViewChild('descriptionTextArea') descriptionTextArea: ElementRef<any>;

  @Input() videoFileName = "Ultra Instinct ｜ Dragon Ball Super.mp4"
  @Input() videoURL = "https://youtu.be/GMes87zIQ08";
  @Input() video: Video;
  @Input() playlists: any[];
  @Input() categories: any[];
  visibility: any[];


  constructor(private messageService: SnackbarService, private store: Store<{}>){}

  ngOnInit(): void {
    this.thumbnails = this.video.videoThumbnails!;
    this.thumbnails.forEach((thumbnail) => {
      thumbnail.isActive = this.video && this.video.thumbnailId === thumbnail.id;
    });

    this.store.select(selectStatus).subscribe({
      next: (data) => {
        this.visibility = data!.filter(s => s.statusName !== 'DRAFT').map((status) => {
          const plt = {
            playlist: { ...status, name: normalizeSelection(status.statusName) },
            checked: false,
            matchSearch: true,
          };
          return plt;
        })
      }
    });

    this.largeThumbnailURL = this.thumbnails[0].thumbnailUrl;
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
        this.largeThumbnailURL = this.thumbnails[i].thumbnailUrl;
        this.video.thumbnailId = this.thumbnails[i].id;
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

  /**
   * on chips updated event
   * @param tags 
   */
  chipsUpdated(tags: any) {
    this.video.tags = tags;
    this.onMetadataUpdated();
    console.log("updated chips ", tags);
  }

  /**
   * add to height of description box on key up based on scrollheight 
   * @param event keyup event
  */
  handleKeyUpDescription(event : any) {
    this.descriptionTextArea.nativeElement.style.height = "auto";
    let scrllHeight = event.target.scrollHeight;
    this.descriptionTextArea.nativeElement.style.height = `${scrllHeight}px`;
  }

  onVideoTitleChanged(): void{
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
