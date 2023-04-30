import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Icons } from 'src/app/models/icons';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  VOLUME_HIGH: string = 'high';
  VOLUME_LOW: string = 'low';
  VOLUME_MUTED: string = 'muted'; 

  paused: boolean = true;
  videoWasPaused: boolean = false;
  fullScreenMode: boolean = false;
  miniMode: boolean = false;
  theaterMode: boolean = false;
  captions: boolean = false;
  isScrubbing: boolean = false;
  currentVolume: number = 1;
  videoDuration: string = '00:00';
  videoCurrentTime: string = '00:00';
  videoDurationMillisec: any;


  volumeLevel: string = 'high';
  volumeDefault: string = 'high';
  captionText: any;

  playbackRate: any;
  
  //imports
  icons: Icons = new Icons();
  subtitles: string = this.icons.iconsPaths['subtitles'];

  @ViewChild('video') video: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('volumeSlider') volumeSlider: ElementRef<any>;
  @ViewChild('previewImg') previewImg: ElementRef<any>;
  @ViewChild('thumbnailImg') thumbnailIm: ElementRef<any>;
  @ViewChild('timelineContainer') timelineContainer: ElementRef<any>;

  constructor() {}

  /**
   * pause video by default 
  */
  ngAfterViewInit() {
    this.paused ? this.video.nativeElement.pause() : this.video.nativeElement.play();
  }

  /**
   * if scrubbing on continue scrubbing outside timeline container
   * @param event mouseup event
   */
  @HostListener('document:mouseup', ['$event']) 
  handleMouseUpEvent(event: MouseEvent){
    if(this.isScrubbing) {
      this.toggleScrubbing(event);
    }
  }

  /**
   * if user was scrubbing and still has mouse down in document
   * continue scrubbing
   * @param event mousemove event
  */
  @HostListener('document:mousemove', ['$event']) 
  handleMousemoveEvent(event: MouseEvent){
    if(this.isScrubbing) {
      this.handleTimelineUpdate(event);
    }
  }


  /**
   * keyboard events for keyboard shortcuts bindings
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const tagName = document.activeElement?.tagName.toLocaleLowerCase();
    if (tagName === 'input') return;//not want to trigger these on an input field
    switch(event.key.toLocaleLowerCase()) {
      case ' ':
        if(tagName === 'button') return;//return 
        this.togglePlay();
        break;
      case 'k':
        this.togglePlay();
        break;
      case 'f':
        this.toggleFullScreenMode();
        break;
      case 't':
        this.toggleTheaterMode();
        break;
      case 'arrowleft':
        case 'j':
          this.skip(-5);
          break;
      case 'arrowright':
        case 'l':
          this.skip(5);
          break;
      case 'i':
        this.toggleMiniMode();
        break;
      case 'm':
        this.toggleMute();
        break;
      case 'c':
        this.toggleCaptions();//needs more implementation
        break;
    }
  }

  /**
   *  On mouse move compute the percentage of the video being hovered 
   *  assign percentage timeline seek preview
   * 
   * this function will implement preview imaages later
   * 
   * @param event mousemove event
  */
  handleTimelineUpdate(event : any) {
    const rect = this.timelineContainer.nativeElement.getBoundingClientRect();
    //x = event.x - rect.x => x of mouse - x of timelineContainer
    const percentage = Math.min(Math.max(0, event.x - rect.x), rect.width) / rect.width;
    
    //take a value between 1 and max amount of pics
    const previewImg = Math.max(1, Math.floor((percentage * this.videoDurationMillisec)/10));
    
    //use previewImg to determine the value of the thumbnail to using previewImg index
    //will be implemented
    
    this.timelineContainer.nativeElement.style.setProperty("--preview-position", percentage);

    if(this.isScrubbing) {
      console.log("handleTimelineUpdate scrubbing ? ", this.isScrubbing)
      event.preventDefault();//prevent default behavior
      //thumbnail.src = previewImg;
      this.timelineContainer.nativeElement.style.setProperty("--progress-position", percentage);
    }
  }

  /**
   * on mouse down on timeline start scrubbing
   * @param event 
  */
  startScrubbing(event: any) {
    this.isScrubbing = true;
    this.toggleScrubbing(event);
  }

  /**
   * on mouse up stop scrubbing
   * @param event 
  */
  stopScrubbing(event: any) {
    this.isScrubbing = false;
    this.toggleScrubbing(event);
  }

  /**
   * On metadata loaded
  */
  onLoadedMetadata() {
    console.log('metadata loaded');
    this.captionText = this.video.nativeElement.textTracks[0];
    this.captionText.mode = 'hidden';
    this.videoDurationMillisec = this.video.nativeElement.duration;
    this.videoDuration = this.formatDuration(this.video.nativeElement.duration);
  }

  //this will come from the modal pop up in the future
  /**
   * update playback speed in .25 increments 
  */
  changePlaybackSpeed() {
    this.playbackRate = this.video.nativeElement.playbackRate + 0.25;
    if(this.playbackRate > 2) this.playbackRate = 0.25;
    this.video.nativeElement.playbackRate = this.playbackRate;
  }

  /**
   * skip through video duration backwards or forwards
   * @param duration either -5 or 5 seconds
  */
  skip(duration: number) {
    this.video.nativeElement.currentTime += duration;
  }

  /**
   * updates UI with the current time of the video element
   * @param video video element target
  */
  timeUpdated(video: HTMLVideoElement) {

    this.videoCurrentTime = this.formatDuration(video.currentTime);
    const percentage = video.currentTime / this.videoDurationMillisec;

    this.timelineContainer.nativeElement.style.setProperty("--progress-position", percentage);
  }

  /**
   * formats string time by removing leading zeroes in certains instances
   * @param time string milliseconds
   * @returns return string formatted
  */
  formatDuration(time: any): string {
    let date: string = new Date(time * 1000).toISOString().substring(11, 11 + 8);
    let currentTime: string;
    //const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if(hours === 0) {
      if(minutes < 10){
        currentTime = date.substring(4, date.length);
      }
      currentTime = date.substring(3, date.length);
    }
    else if (hours > 0 && hours < 10) {
      currentTime = date.substring(1, date.length);
    }
    else {
      currentTime = date;
    }

    return currentTime;
  }

  /**
   * on input slider volume value change
   * @param event 
  */
  onVolumeChange(event : any) {
    //console.log('slider volume changed ', event.target.value);
    this.video.nativeElement.volume = event.target.value;
    this.currentVolume = event.target.value;
    if(event.target.value == 0) {
      this.volumeLevel = this.VOLUME_MUTED;
    } 
    else if(this.video.nativeElement.volume >= .5) {
      this.volumeLevel = this.VOLUME_HIGH;
    }
    else {
      this.volumeLevel = this.VOLUME_LOW;
    }
  }

  videoVolumeChange(event: any) {
    console.log("volume video -> ", event);
  }


  /**
   * Toggle mute & set video volume level
  */
  toggleMute() {
    //console.log('toggle mute before : ', this.volumeLevel);
    if(this.volumeLevel !== 'muted') {
      this.volumeSlider.nativeElement.value = 0;
      this.volumeLevel = this.VOLUME_MUTED;//'muted';
      this.video.nativeElement.muted = true;
    }
    else {

      this.volumeLevel = this.currentVolume < 0.5 ? this.VOLUME_LOW : this.VOLUME_HIGH;
      this.video.nativeElement.muted = false;
      this.volumeSlider.nativeElement.value = this.currentVolume < 0.2 ? 0.3 : this.currentVolume;
      this.video.nativeElement.volume = this.volumeSlider.nativeElement.value;
    }
  }

  /**
   * tuggle play
  */
  togglePlay() {
    this.paused = !this.paused;
    this.paused ? this.video.nativeElement.pause() : this.video.nativeElement.play();
  }


  /**
   * request full screen for video element
   *
  */
  toggleFullScreenMode() {
    if(document.fullscreenElement == null) {
      this.videoContainer.nativeElement.requestFullscreen();
      console.log('REQUEST FULLSCREEN');
    }
    else {
      document.exitFullscreen();
      console.log("exit full screen");
    }
    this.fullScreenMode = !this.fullScreenMode;
    console.log("FULL SCREEN ", this.fullScreenMode);
  }

  toggleTheaterMode() {
    this.theaterMode = !this.theaterMode;
  }

  /**
   * Toggle mini Mode
   * still not supported by firefox
  */
  toggleMiniMode(){
    this.miniMode = !this.miniMode;

    if(this.videoContainer.nativeElement.classList.contains('mini-player-button')) { //if true mini-player-button class is present
      document.exitPictureInPicture();
      console.log('exit picture in picture mode');
    }
    else {
      this.video.nativeElement.requestPictureInPicture();
      console.log('request picture in picture');
    }
  }

  /**
   * toggle captions (off by default)
  */
  toggleCaptions() {
    this.captions = !this.captions;
    const isHiden = this.captionText === 'hidden';
    this.captionText = isHiden ? 'showing' : 'hidden';
  }

  /**
   * seek to specific point on timeline if scrubbing
   * else play video & update video current Time
   * @param event mousemove event
  */
  toggleScrubbing(event: any) {
    const rect = this.timelineContainer.nativeElement.getBoundingClientRect();
    //x = event.x - rect.x => x of mouse - x of timelineContainer
    const percentage = Math.min(Math.max(0, event.x - rect.x), rect.width) / rect.width;
    this.isScrubbing = (event.buttons) === 1;
    console.log("scrubbing ", this.isScrubbing); 
    if(this.isScrubbing) {
      event.preventDefault();//prevent default behavior
      this.videoWasPaused = this.video.nativeElement.paused;
      this.paused = true;
      this.video.nativeElement.pause();
    }
    else {
      console.log("seeking ended ", this.isScrubbing);
      this.video.nativeElement.currentTime = percentage * this.videoDurationMillisec;
      if(!this.videoWasPaused){//if video was not paused when scrubbing started
        console.log("video was NOT paused when scrubbing started");
        this.paused = false;
        this.video.nativeElement.play();
      }
      /*else {
        console.log("video was paused when scrubbing started");
        this.paused = false;
        this.video.nativeElement.currentTime = percentage * this.videoDurationMillisec;
        this.video.nativeElement.play();
      }*/
    }
  }

  /*detectLeftButton(event: any): boolean {
    //event = event || window.event;
    if ("buttons" in event) {
        return event.buttons == 1;
    }
    var button = evt.which || evt.button;
    return button == 1;
  }*/
}
