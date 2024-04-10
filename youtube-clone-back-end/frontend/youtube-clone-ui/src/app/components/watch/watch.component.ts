import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { SpinnerDirective } from '../../directives/spinner/spinner.directive';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { Comment } from '../../models/comment';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';
import { CommentService } from '../../shared/services/comment/comment.service';
import { LikeService } from '../../shared/services/like/like.service';
import { UserService } from '../../shared/services/user/user.service';
import { VideoService } from '../../shared/services/video/video.service';
import { selectCurrentUser } from '../../shared/store/user/reducers';
import { CommentRequestForm } from '../../shared/types/commentReqForm.interface';
import { CurrentUserInterface } from '../../shared/types/currentUser.interface';
import { ReportTypeInterface } from '../../shared/types/reportType.interface';
import { UserInterface } from '../../shared/types/user.interface';
import { Video } from '../../shared/types/video';
import { CommentsHolderComponent } from '../comments/comments-holder/comments-holder.component';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { ModalComponent } from '../modal/modal.component';
import { ReportComponent } from '../report/report/report.component';
import { VideoDescriptionComponent } from '../video-description/video-description.component';
import { VideoCardComponent } from '../video-displays/video-card/video-card.component';
import { VideoComponent } from '../video-displays/video/video.component';
import { EmbeddedPlaylistComponent } from '../watch-view/embedded-playlist/embedded-playlist.component';
import { ReportType } from '../../models/enum/reportType.enum';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss'],
  standalone: true,
  imports: [
    NgClass,
    VideoComponent,
    NgFor,
    NgIf,
    VideoCardComponent,
    NgStyle,
    TooltipDirective,
    VideoDescriptionComponent,
    StandardDropdownComponent,
    CommentsHolderComponent,
    EmbeddedPlaylistComponent,
    ModalComponent,
    ReportComponent,
    SpinnerDirective,
    StandardDropdownComponent
  ],
})
export class WatchComponent implements OnInit {
  private resizeListener: () => void;
  isCinemaMode: boolean = false;
  isSibeBarCollapsed: boolean = false;
  primaryColorVideoFrame: string;
  sideBarType: string = 'hover';//TODO: DELETE
  
  //channelName: string = 'AlJordan';//TODO: DELETE
  
  SORT_BUTTON_TEXT: string = 'Sort by';
  videos: any[] = [];
  sortOptions: any[] = [];
  videoCardSize: string = 'small';
  
  isReportModalVisible: boolean = false;
  selectedReportType: ReportTypeInterface | null;
  canShowNext: boolean = false;
  reportStep: number = 0;
  index: number = 0;
  
  comment: Comment;

  //test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  comments: Comment[]; //erase this test
  //string: string = 'SOME TEST TEXT'

  startColor: string = '#a8a8a8'//'0f0f0f';
  endColor: string = '';
  currentColor: string = '';

  videoContainerWidth: string = '71%';
  manifestHlsUrl: string;
  manifestMpdUrl: string;
  loadingMetadata: boolean;
  loadingUserInfo: boolean;
  videoId: any;
  metadata: Video;
  user: UserInterface;
  currentUser: CurrentUserInterface;
  subscriptionActions: any;
  subscriptionState: string = 'Subscribed';
  isSubscribed: boolean;
  isSubscribedLoading: boolean;
  isNotUser: boolean = true;
  commentPageSize: number = 100;
  commentOffset: number = 0;
  commentsCount: number = 0;
  reportType: string = ReportType.VIDEO;
  videoCurrentTime: any;
  playlistName: string;
  plOwner: number;

  @ViewChild('watchContainer') watchContainer: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('recommendationContainer')
  recommendationContainer: ElementRef<any>;
  @ViewChild('interactionContainer') interactionContainer: ElementRef<any>;
  @ViewChild('bgColorBlur') bgColorBlur: ElementRef<any>;

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private videoService: VideoService,
    private userService: UserService,
    private store: Store,
    private likeService: LikeService,
    private commentService: CommentService
  ) {}

  /**
   * life cycle function
   */
  ngOnInit() {
    this.componentUpdatesService.sideBarCollapsedEmit(true);
    this.componentUpdatesService.sideBarTypeUpdate(this.sideBarType);
    this.getCurrentUser();
    this.populateSubscriptionActions();
    
    this.componentUpdatesService.reportModal$.subscribe({
      next: ({show, type}) => {
        if(show) {
          this.reportType = type;
          this.isReportModalVisible = true;
        }
      }
    });

    this.buildManifestUris();

    this.videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.populateSortOptions();

    // Add window resize event listener
    this.resizeListener = this.renderer.listen('window', 'resize', () => {
      this.resetWatchContainerPadding();
      this.videoContainerWidth = `${this.getVideoContainerWidth()}px`;
    });
  }

  /**
   * After view init life cycle function
   */
  ngAfterViewInit(): void {
    //subscribe to theater mode signal
    this.componentUpdatesService.videoTheaterMode$.subscribe(
      (isTheaterMode) => {
        this.isCinemaMode = isTheaterMode;

        this.resetWatchContainerPadding();

        this.resizeBlurBg(this.isCinemaMode);
        if (this.primaryColorVideoFrame) {
          this.updateBackgroundGradient(this.primaryColorVideoFrame);
        }
      }
    );

    //subscribes to video primary hex colors signal
    this.componentUpdatesService.videoPrimaryColor$.subscribe(
      (primaryColor) => {
        this.primaryColorVideoFrame = primaryColor;
        this.updateBackgroundGradient(primaryColor);
      }
    );

    this.onVideoContainerExpanded();
    //this.onVideoContainerChange();
  }

  /**
   * build manifest paths for ABR (adaptive bitrate streaming)
   */
  buildManifestUris() {
    this.activedRoute.queryParams.subscribe((params) => {
      this.manifestMpdUrl = `${environment.apiUrl}/api/v1/video/watch/${params.v}/adaptive.mpd`;
      this.manifestHlsUrl = `${environment.apiUrl}/api/v1/video/watch/${params.v}/adaptive.m3u8`;
      
      this.loadingMetadata = true;
      this.loadingUserInfo = true;
      
      this.videoId = Number(params.i);
      if(params.list){
        this.playlistName = params.list;
        this.plOwner = params.o;
      }

      if(params.index) {
        this.index = params.index;
      }

      this.videoService.getVideoById(this.videoId).subscribe({
        next: (response: any) => {
          this.loadingMetadata = false;
          this.metadata = response.data.video;
          this.getUserInfo(this.metadata.userId!);
          this.getCommentPage();
        }
      });
    });
  }

  /**
   * get video owner user info 
   * @param userId 
  */
  getUserInfo(userId: number) {
    this.userService.getUserByUserId(userId).subscribe({
      next: (response: any) => {
        this.user = response.data.user;
        if(this.user) {
          this.isUserSubscribed(this.metadata.userId!, this.currentUser.id);
        } 
        this.loadingUserInfo = false;
      }
    });
  }

  /**
   * lifecycle method
   */
  ngOnDestroy(): void {
    //this.componentUpdatesService.sideBarTypeUpdate('side');

    // Remove the window resize event listener when the component is destroyed
    if (this.resizeListener) {
      this.resizeListener(); //????
    }
  }

  /**
   * get current user from state
   */
  getCurrentUser() {
    this.store.select(selectCurrentUser).subscribe({
      next: (user) => {
        if(user) {
          this.currentUser = user;
        }
      }
    })
  }

  populateSubscriptionActions() {
    this.subscriptionActions = [
      { icon: 'notifications_active', text: 'All',  action: () => this.onSubscribe() },
      { icon: 'notifications', text: 'Personalised', action: () => {} },
      { icon: 'notifications_off', text: 'None', action: () => {} },
      { icon: 'person_remove', text: 'Unsubscribe', action: () => this.onUnsubscribe() }
    ];
  }

  /**
   * check if user is subscribed
   * @param { number } to id of user to subscribe to
   * @param { number } currentUserId the current user id
   * @returns 
   */
  isUserSubscribed(to: number, currentUserId: number) {
    this.isSubscribedLoading = true;
    if(to === currentUserId) {
      this.isNotUser = false;
      this.isSubscribedLoading = false;
      return; 
    }
    
    this.userService.isSubscribed(to, currentUserId).subscribe({
      next: (data) => {
        if(data.data.user.length > 0) {
          this.isSubscribed = true;        
        }
        this.isSubscribedLoading = false;
      }
    });
  }

  /**
   * on subscribe 
   */
  onSubscribe(): void {
    if(!this.isSubscribed) {
      this.userService.subscribe(this.metadata.userId!).subscribe({
        next: (data) => {
          if(data.data.user) {
            this.isSubscribed = true;
          }
        }
      });
    }
    
  }

  /**
   * on unsubscribe clicked
   */
  onUnsubscribe(): void {
    if(this.isSubscribed) {
      this.userService.unsubscribe(this.metadata.userId!).subscribe({
        next: (data) => {
          this.isSubscribed = false;
        }
      })
    }
  }

  getCommentPage() {
    const commentReqForm: CommentRequestForm = {
      videoId: this.metadata.id,
      pageSize: this.commentPageSize,
      offset: this.commentOffset,
      parentId: 0,
      isSubComment: false
    };
    this.commentService.get(commentReqForm).subscribe({
      next: (response) => {
        this.comments = response.data.comments.map((comment: any) => {
          const commentM: Comment  ={
            id: comment.id,
            userId: comment.userId,
            videoId: comment.videoId,
            commentText: comment.commentText,
            createdAt: comment.createdAt,
            lastUpdated: comment.lastUpdated,
            parentCommentId: comment.parentCommentId,
            likeCount: comment.likeCount,
            replyCount: comment.replyCount,
            imageUrl: comment.imageUrl,
            username: comment.username,
            subComments: [],
            offset: 0,
            pageSize: 20
          };
          return commentM;
        });
        this.commentsCount = response.data.count;
      }
    })
    
  }

  onSaveToPlaylist() {
    //this.videoId;
  }

  /**
   * If view port changes size change the padding accordingly
   */
  resetWatchContainerPadding(): void {
    let viewport = window.innerWidth;

    if (viewport >= 2500) {
      if (!this.isCinemaMode) {
        this.watchContainer.nativeElement.style.paddingLeft = '340px';
        this.watchContainer.nativeElement.style.paddingRight = '340px';

        this.watchContainer.nativeElement.style.paddingTop = '20px';
      } else {
        this.watchContainer.nativeElement.style.paddingLeft = '0px';
        this.watchContainer.nativeElement.style.paddingRight = '0px';
        this.watchContainer.nativeElement.style.paddingTop = '0px';
      }
    } else {
      this.watchContainer.nativeElement.style.paddingLeft = '0px';
      this.watchContainer.nativeElement.style.paddingRight = '0px';
      this.watchContainer.nativeElement.style.paddingTop = '0px';
    }
  }

  /**
   * Create sort options drop down
   */
  populateSortOptions() {
    this.sortOptions = [
      {
        text: 'Top comments',
        action: () => {
        },
      },
      {
        text: 'Newest first',
        action: () => {
        },
      },
    ];
  }

  /**
   * Resize the blur background
   * @param shouldIncrease
   */
  resizeBlurBg(shouldIncrease: boolean) {
    const rect = this.videoContainer.nativeElement.getBoundingClientRect();
    const widthIncrement = 150; //100;
    const heightIncrement = 300; //150;
    let width: number;
    let height: number;
    if (shouldIncrease) {
      width = rect.width + widthIncrement;
      height = rect.height + heightIncrement;
    } else {
      width = rect.width - widthIncrement;
      height = rect.height - heightIncrement + 300;
    }
    this.bgColorBlur.nativeElement.style.width = `${width + 10}px`;
    this.bgColorBlur.nativeElement.style.height = `${height + 10}px`;
  }

  /**
   * update backgroundImage with video primary color every 30 frames.
   * @param primaryColor
   */
  updateBackgroundGradient(primaryColor: string) {
    const rect = this.videoContainer.nativeElement.getBoundingClientRect();



    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    console.log('Primary Color ======> ', primaryColor);

    if (primaryColor) {
      const rgbColor = this.hexToRgb(primaryColor)!;
      const rgbColorWtOpacity = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 1)`;//.6)
      
      //startColor = rgbColorWtOpacity;
      
      this.currentColor = rgbColorWtOpacity;
      setInterval(() => {
        
        this.endColor = this.currentColor;  
        // Set CSS variables
        this.bgColorBlur.nativeElement.style.setProperty('--start-color', this.startColor);
        this.bgColorBlur.nativeElement.style.setProperty('--end-color', this.endColor);
        //this.bgColorBlur.nativeElement.style.backgroundImage = `radial-gradient(circle, ${this.startColor}, ${this.endColor})`  
        this.startColor = this.currentColor;
        
      }, 5500);
      
      //this.videoContainer.nativeElement.style.setProperty('--start-color', this.startColor);
      //this.videoContainer.nativeElement.style.setProperty('--end-color', this.endColor);
        
      
    }
  }

        /*this.bgColorBlur.nativeElement.style.backgroundImage = `radial-gradient(circle at ${Math.floor(
        centerX
      )}px ${Math.floor(
        centerY
      )}px, ${rgbColorWtOpacity}, rgba(255,255,255,0) 80%)`;*/
      //this.bgColorBlur.nativeElement.style.filter = 'blur(90px)';
      //this.bgColorBlur.nativeElement.style.backdropFilter = `blur(100px)`;

  /**
   * convert Hexadecimal string to RGB color
   * @param {string} hex string
   * @returns {number, number, number} red, green, blue color
   */
  hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    // Remove the hash (#) if it's included
    hex = hex.replace(/^#/, '');

    // Parse the hex string to get the RGB values
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Check if the hex string is valid
    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      console.error('Invalid hex color:', hex);
      return null;
    }

    return { r, g, b };
  }

  /**
   * Adjust height of recommendation and interaction containers,
   * based on how much space is available in the watch container.
   */
  resetWatchContainersHeight(): void {
    this.watchContainer.nativeElement.style.height = 'auto';
    let newHeight =
      this.watchContainer.nativeElement.offsetHeight -
      this.videoContainer.nativeElement.offsetHeight;
    this.watchContainer.nativeElement.offsetHeight = newHeight;
    console.log(
      'resetContainersHeight ',
      this.watchContainer.nativeElement.offsetHeight,
      ' calc ',
      newHeight
    );
  }

  /**
   * change column layout if video request more space for theaterMode, else use default layout
   */
  onVideoContainerExpanded(): void {
    // Use ResizeObserver to listen for size changes on the videoContainer
    const resizeObserver = new ResizeObserver(() => {
      // Handle size changes here
      const newWidth = this.videoContainer.nativeElement.offsetWidth;
      const newHeight = this.videoContainer.nativeElement.offsetHeight;
      console.log(`New width: ${newWidth}, New height: ${newHeight}`);
      this.interactionContainer.nativeElement.style.top = `${newHeight + 20}px`;

      if (!this.isCinemaMode) {
        this.recommendationContainer.nativeElement.style.top = '0';
        this.interactionContainer.nativeElement.style.width = `${newWidth}px`;

        this.videoContainer.nativeElement.style.width = '70%';
        this.videoContainer.nativeElement.style.maxWidth = '1280px';

        this.bgColorBlur.nativeElement.style.width = `${newWidth}px`;
      } else {
        this.videoContainer.nativeElement.style.maxWidth = '100%';
        this.recommendationContainer.nativeElement.style.top = `${
          newHeight + 20
        }px`;
        this.interactionContainer.nativeElement.style.width = `${
          newWidth - this.getRecommendationContainerWidth()
        }px`;

        this.videoContainer.nativeElement.style.width = '100%';
        this.bgColorBlur.nativeElement.style.width = `${newWidth}px`;
      }
    });

    // Start observing the videoContainer element
    resizeObserver.observe(this.videoContainer.nativeElement);
  }

  /**
   * video current time updated event
   * @param videoCurrentTime the video current time
   */
  onVideoTimeUpdated(videoCurrentTime: any) {
    this.videoCurrentTime = videoCurrentTime;
  }

  /**
   * on channel icon click navigate to channel view
   */
  onChannelIconClicked(): void {
    this.componentUpdatesService.sideBarTypeUpdate('hover');
    this.router.navigate([`home/@${this.user.username}`]);
  }

  /**
   * get video of width container
   * @returns {number} width of video container
   */
  getVideoContainerWidth(): number {
    const element = this.videoContainer.nativeElement as HTMLElement;
    const width = element.getBoundingClientRect().width;
    this.videoContainerWidth = `${width}px`;
    return width;
  }

  /**
   * get width of recommendation container
   * @returns {number} width of recommendation container
   */
  getRecommendationContainerWidth(): number {
    const element = this.recommendationContainer.nativeElement as HTMLElement;
    const width = element.getBoundingClientRect().width;
    const wd = window.innerWidth;
    return width;
  }

  /**
   * fired when the modal component is closed
   * @param {boolean} event false when modal is closed 
  */
  showReportModalEvent(event: boolean) {
    this.isReportModalVisible = event;
    this.onCancelReporting();
  }

  /**
   * when report icon clicked 
   * @param event 
  */
  report(event: any) {
    this.componentUpdatesService.toggleReportModal(true, ReportType.VIDEO);
    this.isReportModalVisible = true;
  }
  
  /**
   * handles selected report type 
   * @param event 
  */
  onSelectedReportType(event: ReportTypeInterface) {
    this.selectedReportType = event;
    if(this.selectedReportType.type) {
      this.canShowNext = true;
    }
  }

  /**
   * cancel reporting 
  */
  onCancelReporting() {
    this.canShowNext = false;
    this.selectedReportType = null;
    this.reportStep = 0;
    this.isReportModalVisible = false;
    this.componentUpdatesService.toggleReportModal(false, ReportType.VIDEO);
  }

  /**
   * on next button clicked in reporting form 
  */
  onNextClicked() {
    this.reportStep += 1;
    if(this.reportStep > 2) {
      this.reportStep = 2;
    }
  }
}
