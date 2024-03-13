import { AsyncPipe, NgIf } from '@angular/common';
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
import { VideoService } from '../../../shared/services/video/video.service';
import { selectPlaylists } from '../../../shared/store/playlist/reducers';
import { StatusActions } from '../../../shared/store/status/actions';
import { selectStatus } from '../../../shared/store/status/reducers';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { ReportTypeInterface } from '../../../shared/types/reportType.interface';
import { CurrentUserStateInterface } from '../../../shared/types/state/currentUserState.interface';
import { Video } from '../../../shared/types/video';
import { VideoMetadataForm } from '../../../shared/types/videoMetadataForm.interface';
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
import { Status } from '../../../shared/types/status.interface';
import { VideoThumbnail } from '../../../shared/types/videoThumbnail.interface';

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
  showVideoDetailSteps: boolean = true;
  videoMetadataForm: VideoMetadataForm;
  status: Status;
  thumbnail: VideoThumbnail;
  //videoTitle: string = 'Upload video';
  staticTitle: string = 'Ultra Instinct ｜ Dragon Ball Super.mp4'; //"";

  playlists: PlaylistInterface[]; // = [];
  playlistSelection: any[]; // = [];
  categories: CategoryInterface[] = []; //PlaylistInterface[] = [];
  categorySelection: any[] = [];

  selectedCategories: any[] = [];
  selectedPlaylists: any[]; // = [];

  data$: Observable<{
    currentUser: CurrentUserInterface | null | undefined;
    playlists: PlaylistInterface[];
  }>;
  videoCopy: Video;

  current = 0;
  totalSteps: number = 3;
  nextBtnText: string = 'NEXT';

  @Input() isShowModal: boolean = false;
  @Input() video: Video;
  @Output() modalVisibility: EventEmitter<boolean> = new EventEmitter();
  @ViewChildren('stepTemplate') stepsTemplateRefs: QueryList<TemplateRef<any>>;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private videoService: VideoService,
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
        }
      }
    });


    if (!this.playlistSelection) {
      this.populateUserPlaylists();
    }
    this.getVideo();
    this.populateCategories();
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
  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
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
    console.log(data.uploadStatus, ' name ', data.fileName);

    if (data) {
      //this.videoTitle = data.fileName;
      this.staticTitle = data.fileName;
      this.showVideoDetailSteps = true; //set to true if successfully uploaded video
      //this.videoId = data.videoUploadResponse.id;
      this.video.title = data.fileName;
      this.video.id = data.videoUploadResponse.id;
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
      //UPLOAD THE METADATA
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
    console.log('visisbility selected ->', event);
    this.populateVisibilityStatus();
  }

  /**
   * on metadata updated
   * @param metadata 
   */
  onMetadataUpdated(metadata: Video): void {
    console.log("original metadata ", this.videoCopy);
    console.log("current metadata", metadata);
    
    this.videoMetadataForm = {
      userId: this.currentUser.id,
      videoId: this.videoCopy.id,
      title: this.videoCopy.title,
      commentEnabled: this.videoCopy.commentEnabled!
    };

    if(this.videoCopy.description !== metadata.description) {
      this.videoMetadataForm.description = metadata.description;
    }

    if(this.videoCopy.location !== metadata.location) {
      this.videoMetadataForm.location = metadata.location;
    }

  }

  /**
   * playlist selection update event
   * @param playlists
   */
  onPlaylistUpdated(playlists: any[]) {
    this.playlistSelection = playlists;
    this.selectedPlaylists = [];
    this.playlistSelection.forEach((playlist: any) => {
      if (playlist.checked) {
        this.selectedPlaylists.push(playlist);
      }
    });
    console.log('playlists i have selected ', this.selectedPlaylists);
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
    console.log('category i have selected ', this.selectedCategories);
  }

  //from backend
  getVideo() {
    this.video = {
      id: 0,
      title: '',
      description: '',
      tags: [],
      status: { id: 0, statusName: 'PUBLIC' },
      thumbnailUrl: '../../../assets/mr_wick.jpeg',
      videoUrl:
        '../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4',
    };
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
  populateUserPlaylists() {
    this.playlistSelection = [];
    this.store.select(selectPlaylists).subscribe({
      next: (playlists) => {
        console.log("got playlists ", playlists);
        this.playlistSelection = playlists.map((playlist) => ({
          playlist: { ...playlist, name: normalizeSelection(playlist.name) },
          checked: false,
          matchSearch: true,
        }));
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
            if (status.statusName.trim() == 'PRIVATE') {
              let statusItem: ReportTypeInterface = {
                id: status.id,
                type: normalizeSelection(status.statusName),
                description: 'Only you and people who you choose can watch your video',
                isActive: this.video.status!.statusName.toUpperCase() === 'PRIVATE'
              };
              return statusItem;
            } else if (status.statusName.trim() == 'UNLISTED') {
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

  ngOnChanges(changes: SimpleChanges) {
    if(changes.video?.currentValue){
      this.videoCopy = JSON.parse(JSON.stringify(this.video));
      this.status = this.videoCopy.status!;
      this.thumbnail = this.videoCopy.videoThumbnails!.filter(t => t.id === this.videoCopy.thumbnailId)[0];
      this.populateVisibilityStatus();
    }
  }
}
