import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.scss']
})
export class WatchComponent {
  isCinemaMode: boolean = false;
  isSibeBarCollapsed: boolean = false;
  primaryColorVideoFrame: string;
  sideBarType: string = 'hover';
  channelName: string = 'AlJordan';
  SORT_BUTTON_TEXT: string = 'Sort by';
  videos: any[] = [];
  sortOptions: any[] = [];

  @ViewChild('watchContainer') watchContainer: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('recommendationContainer') recommendationContainer: ElementRef<any>;
  @ViewChild('interactionContainer') interactionContainer: ElementRef<any>;
  @ViewChild('bgColorBlur') bgColorBlur: ElementRef<any>;

  constructor(private componentUpdatesService : ComponentUpdatesService, private router: Router) {}
  
  ngOnInit() {
    this.componentUpdatesService.sideBarTypeUpdate(this.sideBarType);
    this.videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.sortOptions = [{text: 'Top comments'}, {text: 'Newest first'}];
  }

  ngAfterViewInit() : void {

    this.componentUpdatesService.videoTheaterMode$.subscribe((isTheaterMode) => {
      this.isCinemaMode = isTheaterMode;
      this.onVideoContainerExpanded();
      //this.onSideBarCollapsed();
      this.resizeBlurBg("theater mode", this.isCinemaMode);
      if(this.primaryColorVideoFrame) {
        this.updateBackgroundGradient(this.primaryColorVideoFrame);
      }
      
    });
    
    //subscribes to video primary hex colors signal
    this.componentUpdatesService.videoPrimaryColor$.subscribe((primaryColor) => {
      this.primaryColorVideoFrame = primaryColor;
      this.updateBackgroundGradient(primaryColor);
    });
  }

  resizeBlurBg(loc: string, shouldIncrease: boolean) {
    console.log("resizeBlurBg location "+ loc);
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
    this.bgColorBlur.nativeElement.style.width = `${width}` + 'px';
    this.bgColorBlur.nativeElement.style.height = `${height}` + 'px';
    
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
    //console.log('Primary Color ======> ', primaryColor);

    //console.log('Center X ======> ', centerX, 'Center Y ======> ', centerY, " left : ", rect.left, " top: ", rect.top);
    if(primaryColor) {
      this.bgColorBlur.nativeElement.style.backgroundImage = `radial-gradient(circle at ${Math.floor(centerX)}px ${Math.floor(centerY)}px, ${primaryColor}, rgba(255,255,255,0) 80%)`;
      this.bgColorBlur.nativeElement.style.filter = 'blur(100px)';
    }
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
   * @param isExpended 
  */
  onVideoContainerExpanded(): void {
    console.log('HERE ', this.isSibeBarCollapsed)
    if(!this.isCinemaMode) {      
      console.log("display default");
      this.recommendationContainer.nativeElement.style.top = '0';
      this.interactionContainer.nativeElement.style.top = '72vh';//'660px';
      this.videoContainer.nativeElement.style.width = '75%';
    }
    else {
      this.interactionContainer.nativeElement.style.top = '75vh';//'740px';
      this.recommendationContainer.nativeElement.style.top = '75vh';//'740px';
      this.videoContainer.nativeElement.style.width = '100%';
    }
  }

  /**
   * on channel icon click navigate to channel view 
  */
  onChannelIconClicked(): void {
    console.log("onChannelIconClicked");
    this.componentUpdatesService.sideBarTypeUpdate('hover');
    //this.router.navigate(['channel']);
    this.router.navigate([`home/@${this.channelName}`]);
  }
}
