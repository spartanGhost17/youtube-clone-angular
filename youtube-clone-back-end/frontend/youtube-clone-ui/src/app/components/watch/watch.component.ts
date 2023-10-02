import { Component, ElementRef, ViewChild } from '@angular/core';
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

  @ViewChild('watchContainer') watchContainer: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('recommendationContainer') recommendationContainer: ElementRef<any>;
  @ViewChild('interactionContainer') interactionContainer: ElementRef<any>;
  @ViewChild('bgColorBlur') bgColorBlur: ElementRef<any>;

  constructor(private componentUpdatesService : ComponentUpdatesService) {}
  
  ngOnInit() {
    this.componentUpdatesService.sideBarTypeUpdate(this.sideBarType);
  }

  ngAfterViewInit() : void {
    //this.resizeBlurBg();
    this.componentUpdatesService.sideBarCollapsed$.subscribe((isSideBarCollapsed) => {
      console.log('Sidebar Collapsed///////// ', isSideBarCollapsed)
      this.isSibeBarCollapsed = isSideBarCollapsed;
      //this.onVideoContainerExpanded();
      this.onSideBarCollapsed();
      this.resizeBlurBg("side bar collapsed", !this.isSibeBarCollapsed);
      if(this.primaryColorVideoFrame) {
        this.updateBackgroundGradient(this.primaryColorVideoFrame);
      }

    });

    this.componentUpdatesService.videoTheaterMode$.subscribe((isTheaterMode) => {
      this.isCinemaMode = isTheaterMode;
      this.onVideoContainerExpanded();
      this.onSideBarCollapsed();
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
    const widthIncrement = 100;
    const heightIncrement = 150;
    let width: number;
    let height: number; 
    if(shouldIncrease) {
      width = rect.width + widthIncrement;
      height = rect.height + heightIncrement;
    }
    else {
      width = rect.width - widthIncrement;
      height = rect.height - heightIncrement;
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
      if(this.isSibeBarCollapsed) {
        this.interactionContainer.nativeElement.style.top = '700px'//'600px';
      }
      else {
        this.interactionContainer.nativeElement.style.top = '650px'//'600px';
      }

    }
    else {
      this.interactionContainer.nativeElement.style.top = '700px';//'650px';///'600px';
      this.recommendationContainer.nativeElement.style.top = '700px';//'650px';//'600px';
      if(this.isSibeBarCollapsed) {
        this.recommendationContainer.nativeElement.style.top = '700px';//650px';
      }
    }
  }

  onSideBarCollapsed() {
    if(!this.isSibeBarCollapsed) {
      this.interactionContainer.nativeElement.style.top = '600px';
    }
    else {
      this.interactionContainer.nativeElement.style.top = '650px';
    }
  }


  //adding background color using video frame maybe make this a directive ?
/*const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

video.addEventListener('play', function() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  setInterval(function() {
    ctx.drawImage(video, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    let red = 0;
    let green = 0;
    let blue = 0;

    for (let i = 0; i < data.length; i += 4) {
      red += data[i];
      green += data[i + 1];
      blue += data[i + 2];
    }

    red /= data.length / 4;
    green /= data.length / 4;
    blue /= data.length / 4;

    console.log(`Primary colors: rgb(${red}, ${green}, ${blue})`);
  }, 1000 / 30);
});

This code listens for the play event on a video element with an ID of video. 
It then sets up a canvas element with an ID of canvas and gets its context. 
The code then sets up an interval that runs every 1000 / 30 milliseconds (30 frames per second). 
Inside the interval, it draws the current frame of the video onto the canvas using drawImage(). 
It then gets the pixel data of the current frame using getImageData() and calculates the average red, green, and blue values of all pixels in the frame. Finally, it logs the primary colors to the console.


*/



}
