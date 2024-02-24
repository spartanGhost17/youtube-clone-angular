import { Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from '../../services/app-updates/component-updates.service';
import { Comment } from '../../models/comment';
import { CommentsHolderComponent } from '../comments/comments-holder/comments-holder.component';
import { StandardDropdownComponent } from '../dropdown/standard-dropdown/standard-dropdown.component';
import { VideoDescriptionComponent } from '../video-description/video-description.component';
import { TooltipDirective } from '../../directives/tooltip/tooltip.directive';
import { VideoCardComponent } from '../video-displays/video-card/video-card.component';
import { VideoComponent } from '../video-displays/video/video.component';
import { NgClass, NgFor, NgStyle } from '@angular/common';

@Component({
    selector: 'app-watch',
    templateUrl: './watch.component.html',
    styleUrls: ['./watch.component.scss'],
    standalone: true,
    imports: [NgClass, VideoComponent, NgFor, VideoCardComponent, NgStyle, TooltipDirective, VideoDescriptionComponent, StandardDropdownComponent, CommentsHolderComponent]
})
export class WatchComponent implements OnInit {
  private resizeListener: () => void;
  isCinemaMode: boolean = false;
  isSibeBarCollapsed: boolean = false;
  primaryColorVideoFrame: string;
  sideBarType: string = 'hover';
  channelName: string = 'AlJordan';
  SORT_BUTTON_TEXT: string = 'Sort by';
  videos: any[] = [];
  sortOptions: any[] = [];
  videoCardSize: string = 'small';
  
  
  comment: Comment = {};
  
  test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  comments: Comment[];//erase this test
  //string: string = 'SOME TEST TEXT'

  videoContainerWidth: string = '71%';
  


  @ViewChild('watchContainer') watchContainer: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('recommendationContainer') recommendationContainer: ElementRef<any>;
  @ViewChild('interactionContainer') interactionContainer: ElementRef<any>;
  @ViewChild('bgColorBlur') bgColorBlur: ElementRef<any>;

  constructor(private componentUpdatesService : ComponentUpdatesService, private router: Router, private renderer: Renderer2) {}
  
  /**
   * life cycle function 
  */
  ngOnInit() {
    this.componentUpdatesService.sideBarTypeUpdate(this.sideBarType);

    this.comment = {
      id: '1',
      commentText: `I’m upset Rey didn’t get to finish certain questions. I get the comedic aspect of the interview but let’s hear Rey’s answers more so than Kevin’s outburst.`,
      imageURL: '../../../assets/batman_and_superman_detective_comics.jpg',
      userId: 'dannychan4803',
      postTime: '1 hour',
      likeCount: 10,
      dislikeCount: 0,
      replyCount: 64,
      subComments: [
        {
          id: '2',
          iconURL: '../../../assets/light-yagami.png',
          userId: 'louisBlaster',
          postTime: '10 minutes',
          text: `My brother, in Terminator 2. Wasn't the terminator more human than us??  👍 🔥`,
          to: 'AceTempo',
          likeCount: 30,
          dislikeCount: 0,
        },
        {
          id: '3',
          iconURL: '../../../assets/goku_god_mode.jpg',
          userId: 'MonsterHunter2099',
          postTime: '4 hours',
          text: `The best terminator day are way behind us dude`,
          to: 'taylorMacarrena267',
          likeCount: 12,
          dislikeCount: 0,
        }
      ]
      
    }

    this.comments = [this.comment, this.comment];

    console.log("COMMENT IN PARENT", this.comment)
    console.log("COMMENT IN PARENT TEST", this.test)
    
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
  ngAfterViewInit() : void {

    //subscribe to theater mode signal
    this.componentUpdatesService.videoTheaterMode$.subscribe((isTheaterMode) => {
      this.isCinemaMode = isTheaterMode;

      this.resetWatchContainerPadding();

      this.resizeBlurBg(this.isCinemaMode);
      if(this.primaryColorVideoFrame) {
        this.updateBackgroundGradient(this.primaryColorVideoFrame);
      }
    });
    
    //subscribes to video primary hex colors signal
    this.componentUpdatesService.videoPrimaryColor$.subscribe((primaryColor) => {
      this.primaryColorVideoFrame = primaryColor;
      this.updateBackgroundGradient(primaryColor);
    });

    this.onVideoContainerExpanded();
    //this.onVideoContainerChange();
  }


  /**
   * lifecycle method
  */
  ngOnDestroy(): void {
    // Remove the window resize event listener when the component is destroyed
    if (this.resizeListener) {
      this.resizeListener();//????
    }
  }


  /*resetInteractionsContainerWidth(): void {
    console.log("\n\n");
    const videoContainerWidth = this.getVideoContainerWidth();
    const recommendationContainerWidth = this.getRecommendationContainerWidth();  
    console.log("current INTERACTION container width: " + this.videoContainerWidth + "\n");
    console.log("get current video container width ", videoContainerWidth);
    console.log("get current interaction container width ", recommendationContainerWidth);

    if(!this.isCinemaMode) {
      this.videoContainerWidth = `${videoContainerWidth}px`;
    }
    else {
      this.videoContainerWidth = `${videoContainerWidth - recommendationContainerWidth}px`;
    }

    console.log("RESET INTERACTION container to width: " + this.videoContainerWidth + "\n");
    console.log("\n\n");
  }*/

  /**
   * If view port changes size change the padding accordingly 
  */
  resetWatchContainerPadding(): void {
    let viewport = window.innerWidth;

    console.log("view port SIZE ====> ", viewport);

    if(viewport >= 2500) {
      if(!this.isCinemaMode) {
        this.watchContainer.nativeElement.style.paddingLeft = '340px';
        this.watchContainer.nativeElement.style.paddingRight = '340px';

        this.watchContainer.nativeElement.style.paddingTop = '20px';
      }
      else {
        this.watchContainer.nativeElement.style.paddingLeft = '0px';
        this.watchContainer.nativeElement.style.paddingRight = '0px';
        this.watchContainer.nativeElement.style.paddingTop = '0px';        
      }      
    }
    else {
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
      {text: 'Top comments', action: () => {console.log("sort by top comments")}}, 
      {text: 'Newest first', action: () => {console.log("sort by newest first")}},];
  }

  /**
   * Resize the blur background 
   * @param shouldIncrease 
  */
  resizeBlurBg(shouldIncrease: boolean) {
    const rect = this.videoContainer.nativeElement.getBoundingClientRect();
    const widthIncrement = 150;//100;
    const heightIncrement = 300;//150;
    let width: number;
    let height: number; 
    if(shouldIncrease) {
      width = rect.width + widthIncrement;
      height = rect.height + heightIncrement;
    }
    else {
      width = rect.width - widthIncrement;
      height = (rect.height - heightIncrement) + 300;
    }
    this.bgColorBlur.nativeElement.style.width = `${width + 10}px`;
    this.bgColorBlur.nativeElement.style.height = `${height + 10}px`;
    
    console.log("new size width", width, " new size height ", height);
  }

  /**
   * update backgroundImage with video primary color every 30 frames.
   * @param primaryColor 
   */
  updateBackgroundGradient(primaryColor: string) {
    const rect = this.videoContainer.nativeElement.getBoundingClientRect();

    const centerX = (rect.width / 2);
    const centerY = (rect.height / 2); 
    console.log('Primary Color ======> ', primaryColor);

    if(primaryColor) {

      const rgbColor = this.hexToRgb(primaryColor)!;
      const rgbColorWtOpacity = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, .6)`;

      this.bgColorBlur.nativeElement.style.backgroundImage = `radial-gradient(circle at ${Math.floor(centerX)}px ${Math.floor(centerY)}px, ${rgbColorWtOpacity}, rgba(255,255,255,0) 80%)`;
      this.bgColorBlur.nativeElement.style.filter = 'blur(90px)';
      //this.bgColorBlur.nativeElement.style.backdropFilter = `blur(100px)`;
    }
  }

  /**
   * convert Hexadecimal string to RGB color
   * @param {string} hex string
   * @returns {number, number, number} red, green, blue color
  */
  hexToRgb(hex: string): { r: number, g: number, b: number } | null {
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
  resetWatchContainersHeight() : void {
    this.watchContainer.nativeElement.style.height = "auto";
    let newHeight = this.watchContainer.nativeElement.offsetHeight - this.videoContainer.nativeElement.offsetHeight;
    this.watchContainer.nativeElement.offsetHeight = newHeight;
    console.log('resetContainersHeight ', this.watchContainer.nativeElement.offsetHeight, ' calc ', newHeight);
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
      
      if(!this.isCinemaMode) {      
        this.recommendationContainer.nativeElement.style.top = '0';
        this.interactionContainer.nativeElement.style.width = `${newWidth}px`;

        this.videoContainer.nativeElement.style.width = '70%';
        this.videoContainer.nativeElement.style.maxWidth = '1280px';

        this.bgColorBlur.nativeElement.style.width = `${newWidth}px`;
      }
      else {
        this.videoContainer.nativeElement.style.maxWidth = '100%';
        this.recommendationContainer.nativeElement.style.top = `${newHeight + 20}px`;
        this.interactionContainer.nativeElement.style.width = `${newWidth - this.getRecommendationContainerWidth()}px`;

        this.videoContainer.nativeElement.style.width = '100%';
        this.bgColorBlur.nativeElement.style.width = `${newWidth}px`;
      }
    });

    // Start observing the videoContainer element
    resizeObserver.observe(this.videoContainer.nativeElement);
  }

  /**
   * change column layout if video request more space for theaterMode, else use default layout
   * @param isExpended 
  */
  /*onVideoContainerExpanded(): void {
    console.log('HERE ', this.isSibeBarCollapsed)
    if(!this.isCinemaMode) {      
      console.log("display default");
      //this.recommendationContainer.nativeElement.style.top = '0';
      //->this.interactionContainer.nativeElement.style.top = '72vh';//'660px';
      this.videoContainer.nativeElement.style.width = '70%';

      this.videoContainer.nativeElement.style.maxWidth = '1280px';
    }
    else {
      this.videoContainer.nativeElement.style.maxWidth = '100%';
      //this.videoContainer.nativeElement.style.maxHeight = '100%';
      //this.videoContainer.nativeElement.style.height = '75vh';

      //->this.interactionContainer.nativeElement.style.top = '75vh';//'740px';
      //->this.recommendationContainer.nativeElement.style.top = '75vh';//'740px';
      this.videoContainer.nativeElement.style.width = '100%';
    }
  }*/

  /**
   * on channel icon click navigate to channel view 
  */
  onChannelIconClicked(): void {
    console.log("onChannelIconClicked");
    this.componentUpdatesService.sideBarTypeUpdate('hover');
    this.router.navigate([`home/@${this.channelName}`]);
  }

  /**
   * get video of width container
   * @returns {number} width of video container 
  */
  getVideoContainerWidth(): number {
    const element = this.videoContainer.nativeElement as HTMLElement;
    const width = element.getBoundingClientRect().width;
    this.videoContainerWidth = `${width}px`
    console.log("width of video container ", this.videoContainerWidth);
    return width;
  }

  /**
   * 
   * @returns 
  */
  //getVideoContainerHeight(): number {
  //  const element = this.videoContainer.nativeElement as HTMLElement;
  //  const height = element.getBoundingClientRect().height;

  //  console.log("height of video container =====================> ", height);
  //  return height;
  //}

  /**
   * get width of recommendation container
   * @returns {number} width of recommendation container
  */
  getRecommendationContainerWidth(): number {
    const element = this.recommendationContainer.nativeElement as HTMLElement;
    const width = element.getBoundingClientRect().width;
    const wd = window.innerWidth;

    console.log("INNER WIDTH OF VIEWPORT ", wd);
    return width;
  }
}
