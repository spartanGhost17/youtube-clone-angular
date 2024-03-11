import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
  ViewChildren,
} from '@angular/core';
import { Video } from '../../../shared/types/video';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { PlaylistInterface } from '../../../shared/types/playlist.interface';
import { VideoVisibilityComponent } from '../../upload-video-view/video-visibility/video-visibility.component';
import { VideoChecksComponent } from '../../upload-video-view/video-checks/video-checks.component';
import { VideoElementsComponent } from '../../upload-video-view/video-elements/video-elements.component';
import { UploadVideoMetadataComponent } from '../../upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { UploadVideoComponent } from '../../upload-video-view/upload-video/upload-video.component';
import { StepsComponent } from '../../steps/steps.component';
import { ModalComponent } from '../../modal/modal.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { VideoCategoriesState } from './types/videoCategoryState.interface';
import { dashboardActions } from './store/actions';
import { selectCategories } from './store/reducers';
import { CategoryInterface } from './types/category.interface';
import { normalizeSelection } from '../../../shared/utils/sharedUtils';
import { Observable, combineLatest, map } from 'rxjs';
import { playlistActions } from '../../../shared/store/playlist/actions';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { selectPlaylists } from '../../../shared/store/playlist/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
    AsyncPipe
  ],
})
export class DashboardComponent {
  currentUser: CurrentUserInterface;
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  videoUploaded: boolean = false;
  showVideoDetailSteps: boolean = true;
  videoTitle: string = 'Upload video';
  staticTitle: string = 'Ultra Instinct ｜ Dragon Ball Super.mp4'; //"";

  videoDto: Video = {
    id: 0,
    title: '',
    status: {id: 0, statusName: ''},
  };

  videoId: string = 'https://youtu.be/GMes87zIQ08'; //"";

  current = 0;
  totalSteps: number = 3;
  nextBtnText: string = 'NEXT';

  isShowModal: boolean = false;
  @ViewChildren('stepTemplate') stepsTemplateRefs: QueryList<TemplateRef<any>>;
  video: Video;
  playlists: PlaylistInterface[];// = [];
  playlistSelection: any[];// = [];
  categories: CategoryInterface[] = []; //PlaylistInterface[] = [];
  categorySelection: any[] = [];

  selectedCategories: any[] = [];
  selectedPlaylists: any[]// = [];

  data$: Observable<{
    currentUser: CurrentUserInterface | null | undefined,
    playlists: PlaylistInterface[]
  }>;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private store: Store<{ dashboard: VideoCategoriesState }>
  ) {}

  showModal() {
    console.log('modal before ', this.isShowModal);
    this.isShowModal = !this.isShowModal;
    console.log('modal after ', this.isShowModal);
  }

  ngOnInit(): void {
    console.log('DASHBOARD ON INITIALIZE !!');
    this.data$ = combineLatest({
      currentUser: this.store.select(selectCurrentUser),
      playlists: this.store.select(selectPlaylists)
    });

    this.data$.subscribe({
      next: (data) => {
        this.currentUser = data.currentUser!;

        //console.log('PLAYLIST SELECTION ', JSON.stringify(this.playlistSelection));
        //console.log('DATA PLAYLIST ', JSON.stringify(data.playlists));
        //console.log('PLAYLIST ', JSON.stringify(this.playlists));
        
        //JSON.stringify(this.playlists) !== JSON.stringify(data.playlists) || 
        if(!this.playlistSelection) {
          this.playlists = data.playlists;
          this.populateUserPlaylists();
          console.log('COMPARISON ');
        }
        
        console.log("\n\n")
      }
    });


  }

  ngAfterViewInit() {
    this.componentUpdatesService.headerAddVideo$.subscribe(
      (addVideoClicked) => {
        this.isShowModal = addVideoClicked;
        console.log('addVideoClicked ', addVideoClicked);
      }
    );

    this.getVideo();
    this.populateCategories();
  }

  /**
   * show modal
   * @param event
   */
  showModalUpdateEvent(event: boolean) {
    console.log('  closed modal ====>  ', event);
    this.isShowModal = event;
    this.current = 0;
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
    if (this.current < this.totalSteps) {
      this.nextBtnText = 'NEXT';
    } else if (this.current === this.totalSteps) {
      this.nextBtnText = 'UPLOAD'; //only if public playlist is chosen, if private just Save
    }
  }

  onVisibilitySelected(event: any): void {
    console.log('visisbility selected ->', event);
  }

  /**
   * playlist selection update event
   * @param playlists 
   */
  onPlaylistUpdated(playlists: any[]) {
    this.playlistSelection = playlists;
    this.selectedPlaylists = [];
    this.playlistSelection.forEach((playlist: any) => {
      if(playlist.checked) {
        this.selectedPlaylists.push(playlist);
      }
    });
    console.log("playlists i have selected ", this.selectedPlaylists);
  }

  /**
   * categories selection update event
   * @param categories 
   */
  onCategoriesUpdated(categories: any[]) {
    this.categorySelection = categories;
    this.selectedCategories = [];
    this.categorySelection.forEach((category: any) => {
      if(category.checked) {
        this.selectedCategories.push(category);
      }
    });
    console.log("category i have selected ", this.selectedCategories);
  }

  //from backend
  getVideo() {
    this.video = {
      id: 0,
      title: '',
      description: '',
      tags: [],
      status: {id: 0, statusName:'PUBLIC'},
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
    
    this.categorySelection = categories.map(category => ({
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
    this.store.dispatch(playlistActions.getByUser({request: this.currentUser.id}));

    this.playlistSelection = [];
    this.store.select(selectPlaylists).subscribe({
      next: (playlists) => {
        this.playlistSelection = playlists.map(playlist => ({
          playlist: {...playlist, name: normalizeSelection(playlist.name)},
          checked: false,
          matchSearch: true,
        }))
      }
    });
  }
}
