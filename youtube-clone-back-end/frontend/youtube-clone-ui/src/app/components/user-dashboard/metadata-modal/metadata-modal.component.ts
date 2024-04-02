import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { ComponentUpdatesService } from '../../../shared/services/app-updates/component-updates.service';
import { PlaylistService } from '../../../shared/services/playlist/playlist.service';
import { VideoService } from '../../../shared/services/video/video.service';
import { selectPlaylists } from '../../../shared/store/playlist/reducers';
import { StatusActions } from '../../../shared/store/status/actions';
import { selectStatus } from '../../../shared/store/status/reducers';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { ReportTypeInterface } from '../../../shared/types/reportType.interface';
import { CurrentUserStateInterface } from '../../../shared/types/state/currentUserState.interface';
import { Status } from '../../../shared/types/status.interface';
import { Video } from '../../../shared/types/video';
import { VideoItemFormInterface } from '../../../shared/types/videoItemForm.interface';
import { VideoMetadataForm } from '../../../shared/types/videoMetadataForm.interface';
import { VideoThumbnail } from '../../../shared/types/videoThumbnail.interface';
import { normalizeSelection } from '../../../shared/utils/sharedUtils';
import { ModalComponent } from '../../modal/modal.component';
import { StepsComponent } from '../../steps/steps.component';
import { UploadVideoMetadataComponent } from '../../upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { UploadVideoComponent } from '../../upload-video-view/upload-video/upload-video.component';
import { VideoChecksComponent } from '../../upload-video-view/video-checks/video-checks.component';
import { VideoElementsComponent } from '../../upload-video-view/video-elements/video-elements.component';
import { VideoVisibilityComponent } from '../../upload-video-view/video-visibility/video-visibility.component';
import { dashboardActions } from '../dashboard/store/actions';
import { selectCategories } from '../dashboard/store/reducers';
import { CategoryInterface } from '../dashboard/types/category.interface';
import { VideoCategoriesState } from '../dashboard/types/videoCategoryState.interface';
import { playlistActions } from '../../../shared/store/playlist/actions';
import { Tag } from '../../../models/tag';
import { TagService } from '../../../shared/services/tag/tag.service';
import { CreateTagForm } from '../../../shared/types/createTagForm.interface';
import { SnackbarService } from '../../../shared/services/snack-bar-messages/snackbar.service';
import { request } from 'http';

@Component({
  selector: 'app-metadata-modal',
  standalone: true,
  imports: [
    NgIf,
    ModalComponent,
    StepsComponent,
    UploadVideoComponent,
    UploadVideoMetadataComponent,
    VideoElementsComponent,
    VideoChecksComponent,
    VideoVisibilityComponent,
    AsyncPipe,
    NgStyle
  ],
  templateUrl: './metadata-modal.component.html',
  styleUrls: ['./metadata-modal.component.scss'],
})
export class MetadataModalComponent {
  currentUser: CurrentUserInterface;
  visibility: ReportTypeInterface[] = [];
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  videoUploaded: boolean = false;
  
  videoMetadataForm: VideoMetadataForm;
  status: Status;
  thumbnail: VideoThumbnail;
  videoInPlaylist: PlaylistInterface[] = [];

  //videoTitle: string = 'Upload video';
  staticTitle: string = 'Ultra Instinct ｜ Dragon Ball Super.mp4'; //"";

  playlists: PlaylistInterface[]; // = [];
  playlistSelection: any[]; // = [];
  categories: CategoryInterface[] = []; //PlaylistInterface[] = [];
  categorySelection: any[] = [];

  selectedCategories: any[] = [];
  selectedPlaylists: any[]; // = [];

  fetchInitData: boolean = false;

  data$: Observable<{
    currentUser: CurrentUserInterface | null | undefined;
    playlists: PlaylistInterface[];
    visibility: Status[] | null
  }>;
  videoCopy: Video;

  current = 0;
  totalSteps: number = 3;
  nextBtnText: string = 'NEXT';

  @Input() isShowModal: boolean = false;
  @Input() video: Video;
  @Input() showVideoDetailSteps: boolean = false;
  @Output() modalVisibility: EventEmitter<boolean> = new EventEmitter();
  @ViewChildren('stepTemplate') stepsTemplateRefs: QueryList<TemplateRef<any>>;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private videoService: VideoService,
    private tagService: TagService,
    private playlistService: PlaylistService,
    private messageService: SnackbarService,
    private store: Store<{ user: CurrentUserStateInterface, dashboard: VideoCategoriesState }>
  ) {}

  showModal() {
    console.log('modal before ', this.isShowModal);
    this.isShowModal = !this.isShowModal;
    console.log('modal after ', this.isShowModal);
  }

  ngOnInit(): void {
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
      playlists: this.store.select(selectPlaylists),
      visibility: this.store.select(selectStatus)
    });

    /*this.data$.subscribe({
      next: (data) => {
        this.currentUser = data.currentUser!;
        //JSON.stringify(this.playlists) !== JSON.stringify(data.playlists) ||
        if (!this.playlistSelection) {
          this.playlists = data.playlists;
          this.populateUserPlaylists();
        }

        console.log('\n\n');
      },
    });*/
  }

  ngAfterViewInit() {
    /**this.componentUpdatesService.headerAddVideo$.subscribe(
      (addVideoClicked) => {
        this.isShowModal = addVideoClicked;
        console.log('addVideoClicked ', addVideoClicked);
      }
    );*/
    this.data$.subscribe({
      next: (data) => {
        if(data.currentUser) {
          this.currentUser = data.currentUser!;
          if(!this.fetchInitData) {
            this.fetchInitData = true;
            this.getPlaylists(this.currentUser); 
            this.getStatus();
          }
        }
      }
    });

    this.populateCategories();
  }

  getPlaylists(currentUser: CurrentUserInterface) {
    this.store.dispatch(playlistActions.getByUser({request: currentUser.id}));
    this.videoInPlaylists(this.videoCopy.id);
  }

  getStatus() {
    this.store.dispatch(StatusActions.getStatus());
    this.populateVisibilityStatus();
  }

  /**
   * show modal
   * @param event
   */
  showModalUpdateEvent(event: boolean) {
    console.log('  closed modal ====>  ', event);
    this.isShowModal = event;
    this.current = 0;
    this.modalVisibility.emit(event);
  }

  //????
  /*handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }*/
  /** hide video upload modal on view closed */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * Show video details steps view and hide video upload component when
   * video was successfully uploaded
   * @param data
   */
  videoUploadedSucces(data: any) {

    if (data) {
      //this.videoTitle = data.fileName;
      this.staticTitle = data.fileName;
      this.showVideoDetailSteps = true; //set to true if successfully uploaded video
      //this.videoId = data.videoUploadResponse.id;
      this.video = data.videoUploadResponse;
      //this.video.id = data.videoUploadResponse.id;
      //this.video.thumbnailId = data
      this.video.title = data.fileName;
      //this.videoUploaded = true;
    }
  }

  videoTitleChanged(event: string): void {
    //this.videoTitle = event;
    //if(this.videoTitle=="")
    //  this.videoTitle = "Upload video";
    this.video.title = event;
    if (this.video.title === '') {
      this.video.title = 'Upload video';
    }
    //console.log("null ",this.videoTitle=="");
    console.log('video TITLE : ' + event); //this.videoTitle);
  }

  onModalActiveSessionChange(event: number) {
    this.current = event;
    this.updateNextBtn();
    console.log('active session change ', event);
  }

  /**
   * on previous clicked
   */
  onPreClicked(): void {
    this.current -= 1;
    if (this.current < 0) {
      this.current = 0;
    }
    this.updateNextBtn();
  }

  /**
   * on next clicked
   */
  onNextClicked(): void {
    this.current += 1;
    if (this.current > this.totalSteps) {
      this.current = this.totalSteps;
    }
    this.updateNextBtn();
  }

  done(): void {
    console.log('done');
  }

  /**
   * update inner text of 'next' button
   */
  updateNextBtn() {
    if(this.nextBtnText === 'UPLOAD') {
      this.videoService.updateVideoMetadata(this.videoMetadataForm).subscribe({
        next: (data) => {
          this.messageService.openSnackBar(data.message);
          this.showModalUpdateEvent(false);
        }
      });
      this.nextBtnText = 'NEXT';
      this.current = 0;
    }

    if (this.current < this.totalSteps) {
      this.nextBtnText = 'NEXT';
    } else if (this.current === this.totalSteps) {
      this.nextBtnText = 'UPLOAD'; //only if public playlist is chosen, if private just Save
    }
  }

  /**
   * triggered when the video visibility is updated
   * @param event 
   */
  onVisibilitySelected(event: any): void {
    const statusId = event.id;
    const videoId = this.video.id;
    this.store.dispatch(StatusActions.updateVideoStatus({videoId, statusId}));

    this.video.status = {
      id: statusId,
      statusName: event.type
    }
    this.populateVisibilityStatus();
  }

  /**
   * on metadata updated
   * @param metadata 
   */
  onMetadataUpdated(metadata: Video): void {

    this.videoMetadataForm = {
      userId: this.currentUser.id,
      videoId: this.videoCopy.id,
      title: metadata.title,//this.videoCopy.title,
      commentEnabled: this.videoCopy.commentEnabled!
    };

    if(this.videoCopy.description !== metadata.description) {
      this.videoMetadataForm.description = metadata.description;
    }

    if(this.videoCopy.location !== metadata.location) {
      this.videoMetadataForm.location = metadata.location;
    }

    this.updateTags(this.videoCopy.tags!, metadata.tags!);
  }

  /**
   * add or remove tags from metadata
   * @param {Tag[]} originalTags the original tags
   * @param {Tag[]} newTags the new tags
   */
  updateTags(originalTags: Tag[], newTags: Tag[]): void {
    
    //add tags
    newTags.forEach((t: Tag) => {
      if(!originalTags.some((ot: Tag) => t.id === ot.id)) {
        const createTagForm: CreateTagForm = {
          videoId: this.videoCopy.id,
          tags: [t.tagName!]
        };
        
        this.tagService.createTag(createTagForm).subscribe({
          next: (response) => {
            const idx = newTags.findIndex(t => t.tagName === response.data['tags'][0].tagName && !t.id);
            newTags[idx] = response.data['tags'][0];
            this.videoCopy.tags = [...this.videoCopy.tags!, response.data['tags'][0]];
          }
        });
      }
    });
    //delete tags
    originalTags.forEach((t: Tag) => {
      if(!newTags.some((ot: Tag) => t.id === ot.id)) {
        this.tagService.deleteTagById(this.videoCopy.id, t.id!).subscribe({
          next: (data) => {
            this.videoCopy.tags = this.videoCopy.tags!.filter(tag => tag.id !== t.id);
          }
        }); 
      }
    });
  }


  /**
   * playlist selection update event
   * @param playlists
   */
  onPlaylistUpdated(playlists: any[]) {
    this.playlistSelection = playlists;
    this.selectedPlaylists = [];
    this.playlistSelection.forEach((playlist: any) => {
      
      const videoItemForm: VideoItemFormInterface = {
        videoId: this.videoCopy.id,
        playlistId: playlist.playlist.id
      }
      
      if (playlist.checked) { //add to playlist
        this.selectedPlaylists.push(playlist);
        if(!this.videoInPlaylist.some(pl => pl.id === playlist.playlist.id)) {
          this.store.dispatch(playlistActions.addVideo({request: videoItemForm}));
          playlist.playlist.size += 1; 
          this.videoInPlaylist = [...this.videoInPlaylist, playlist.playlist];
        }
      } 
      else if(this.videoInPlaylist.some(pl => (pl.id === playlist.playlist.id) && (!playlist.checked))) {//remove from playlist
        const indexToRemove = this.videoInPlaylist.findIndex(pl => pl.id === playlist.playlist.id);

        if (indexToRemove !== -1) {
          this.store.dispatch(playlistActions.deleteVideo({request: videoItemForm}));
          playlist.playlist.size -= 1;
          this.videoInPlaylist.splice(indexToRemove, 1);
        }
      }
    });
  }

  /**
   * categories selection update event
   * @param categories
   */
  onCategoriesUpdated(categories: any[]) {
    this.categorySelection = categories;
    this.selectedCategories = [];
    this.categorySelection.forEach((category: any) => {
      if (category.checked) {
        this.selectedCategories.push(category);
      }
    });
  }

  /**
   * get selectable categories
   */
  populateCategories() {
    this.store.dispatch(dashboardActions.getAllCategories());
    // Subscribe to the observable
    this.store.select(selectCategories).subscribe((categories) => {
      this.categorySelection = categories.map((category) => ({
        playlist: { ...category, name: normalizeSelection(category.name) },
        checked: false,
        matchSearch: true,
      }));
    });
  }

  /**
   * populate user playlists
   */
  populateUserPlaylists(videoInPlaylists: PlaylistInterface[]) {
    this.selectedPlaylists = [];
    this.playlistSelection = [];
    this.store.select(selectPlaylists).subscribe({
      next: (playlists) => {
        this.playlistSelection = playlists.map((playlist) => {
          const isChecked = videoInPlaylists.some((pl) => pl.id === playlist.id);
          const plt = {
            playlist: { ...playlist, name: normalizeSelection(playlist.name) },
            checked: isChecked,
            matchSearch: true,
          }
          if(isChecked) {this.selectedPlaylists = [...this.selectedPlaylists, plt];}
          return plt;
        });
      },
    });
  }

  /**
   * populate visibility status list
   */
  populateVisibilityStatus() {
    this.store.select(selectStatus).subscribe({
      next: (statusList) => {
        this.visibility = [];
        if(statusList!.length > 0) {
          this.visibility = statusList!
          .filter((status) => status.statusName !== 'DRAFT')
          .map((status) => {
            if (status.statusName.trim() === 'PRIVATE') {
              let statusItem: ReportTypeInterface = {
                id: status.id,
                type: normalizeSelection(status.statusName),
                description: 'Only you and people who you choose can watch your video',
                isActive: this.video.status!.statusName.toUpperCase() === 'PRIVATE'
              };
              return statusItem;
            } else if (status.statusName.trim() === 'UNLISTED') {
              return {
                id: status.id,
                type: normalizeSelection(status.statusName),
                description: 'Anyone with the video link can watch your video',
                isActive: this.video.status!.statusName.toUpperCase() === 'UNLISTED'
              };
            } else {
              return {  
                id: status.id,
                type: normalizeSelection(status.statusName),
                description: 'Everyone can watch your video',
                isActive: this.video.status!.statusName.toUpperCase() === 'PUBLIC'
              };
            } 
        });
        }
      },
    });
  }

  /**
   * get user playlist containing video
   * @param videoId the video id
   */
  videoInPlaylists(videoId: number): void {
    this.videoInPlaylist = [];
    this.playlistService.getPlaylistsContainingVideo(videoId).subscribe({
      next: (playlists) => {
        this.videoInPlaylist = playlists.data['playlist'];
        this.videoInPlaylist = this.videoInPlaylist.filter((playlist) => playlist.name?.toLowerCase() !== 'history');
        this.populateUserPlaylists(this.videoInPlaylist);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.video?.currentValue) {
      this.videoCopy = JSON.parse(JSON.stringify(this.video));
      this.status = this.videoCopy.status!;

      this.thumbnail = this.videoCopy.videoThumbnails!.length > 0? this.videoCopy.videoThumbnails!.filter(t => t.id === this.videoCopy.thumbnailId)[0] : {id: 0, videoId: 0, thumbnailUrl: ''};
      this.populateVisibilityStatus();
      this.videoInPlaylists(this.videoCopy.id);
    }
  }
}
