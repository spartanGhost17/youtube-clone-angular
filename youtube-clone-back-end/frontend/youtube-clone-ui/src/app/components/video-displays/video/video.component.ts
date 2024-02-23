import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Icons } from 'src/app/models/icons';
import { ComponentUpdatesService } from 'src/app/services/app-updates/component-updates.service';

import Vibrant from 'node-vibrant';// stable version node-vibrant@3.1.6
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  currentFrame = 0;
  interval: any;

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
  isLooping: boolean = true;
  currentVolume: number = 1;
  videoDuration: string = '00:00';
  videoCurrentTime: string = '00:00';
  videoDurationMillisec: any;


  volumeLevel: string = 'high';
  volumeDefault: string = 'high';
  captionText: any;

  playbackRate: any;
  frameCaptureInterval: number = 1000 / 30;
  //
  dropDownSettingsItems: any[] = [];

  //imports
  icons: Icons = new Icons();
  subtitles: string = this.icons.iconsPaths['subtitles'];

  @ViewChild('video') video: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('volumeSlider') volumeSlider: ElementRef<any>;
  @ViewChild('previewImg') previewImg: ElementRef<any>;
  @ViewChild('thumbnailImg') thumbnailIm: ElementRef<any>;
  @ViewChild('timelineContainer') timelineContainer: ElementRef<any>;

  @Input() videoURL: string = '../../../../assets/test-videos/My_Hero_Academia_Opening_2.mp4';//'../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki_720p.mp4';//'../../../assets/test-videos/demon_slayer_opening_4_Kizuna_no_Kiseki.mp4';

  constructor(private componentUpdatesService: ComponentUpdatesService) {}
  
  ngOnInit() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d')!;

    this.dropDownSettingsItems =  [
      {icon: 'subtitles', text: 'Subtitles/CC', action: () => {}},
      {icon: 'slow_motion_video', text: 'Playback speed', subMenu: [
        {isSelect: true, text: '0.25', value: 0.25, isSelected: false},
        {isSelect: true, text: '0.5', value: 0.5, isSelected: false},
        {isSelect: true, text: '0.75', value: 0.75, isSelected: false},
        {isSelect: true, text: 'Normal', value: 1, isSelected: true},
        {isSelect: true, text: '1.25', value: 1.25, isSelected: false},
        {isSelect: true, text: '1.5', value: 1.5, isSelected: false},
        {isSelect: true, text: '1.75', value: 1.75, isSelected: false},
        {isSelect: true, text: '2', value: 2, isSelected: false},
      ], action: () => {}},
      {icon: 'tune', text: 'Quality', subMenu: [
        {isSelect: true, text: '720p', value: '720p', isSelected: false},
        {isSelect: true, text: '360p', value: '360p', isSelected: false},
        {isSelect: true, text: '144p', value: '144p', isSelected: false},
        {isSelect: true, text: 'Auto', value: 'Auto', isSelected: true},
      ], action: () => {}},
    ];
  }

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
  //@HostListener('document:keydown', ['$event'])
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
      //case 'escape':
      //  console.log('escape ')
      //  break;
      
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

  /**
   * Triggered when playback speed is changed
   * @param listItem 
  */
  onSettingsSubMenuUpdated(listItem: any) {
    if(listItem.text === 'Playback speed') {
      listItem.subMenu.forEach((subMenuItem: any, idx: any) => {
        if(subMenuItem.isSelected) {
          this.changePlaybackSpeed(subMenuItem.value);    
        }
      });
    }
  }

  //this will come from the modal pop up in the future
  /**
   * update playback speed in .25 increments 
  */
  changePlaybackSpeed(playbackSpeed: any) {
    ///this.playbackRate = this.video.nativeElement.playbackRate + 0.25;
    //if(this.playbackRate > 2) this.playbackRate = 0.25;
    this.video.nativeElement.playbackRate = playbackSpeed;//this.playbackRate;
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
  async timeUpdated(video: HTMLVideoElement) {

    this.videoCurrentTime = this.formatDuration(video.currentTime);
    const percentage = video.currentTime / this.videoDurationMillisec;

    this.timelineContainer.nativeElement.style.setProperty("--progress-position", percentage);
    await this.captureColors();
    //const vibrantPrimaryColor =   (await this.captureColors()).subscribe((color) => {
    //  console.log("SUBSCRIBING TO COLOR: ", color);
    //  this.componentUpdatesService.videoPrimaryColorUpdate(color);
    //});
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

  /**
   * Toggle is theatre mode
  */
  toggleTheaterMode() {
    this.theaterMode = !this.theaterMode;
    this.componentUpdatesService.toggleVideoTheaterMode(this.theaterMode);
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


  restartVideo() {
    //const video: HTMLVideoElement = this.video.nativeElement;
    //this.video.nativeElement.currentTime = 0;
    //this.togglePlay();
  }

  onVideoEnded() {
    //this.video.nativeElement.pause()
    // Video ended, you can handle looping logic here
    //this.restartVideo();
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

    //adding background color using video frame maybe make this a directive ?
  /*getPrimary() {
    const video1 = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    video1.addEventListener('play', function() {
      const width = video1.videoWidth;
      const height = video1.videoHeight;
      canvas.width = width;
      canvas.height = height;
    
      setInterval(function() {
        ctx.drawImage(video1, 0, 0, width, height);
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
      }, 1000 / 3);
    }
  }*/ 

  /**
   * capture primary color of video every 30 frames 
   * @returns primary vibrant color
  */
  async captureColors() {

    // Only capture colors every 30 frames
    if (this.currentFrame % 30 !== 0) {
      this.currentFrame++;
      return;
    }
  
    const video: HTMLVideoElement = this.video.nativeElement;
    this.canvas.width = video.videoWidth;
    this.canvas.height = video.videoHeight;
    this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
  
    const imageSrc = this.canvas.toDataURL(); // convert canvas to base64-encoded data URL
    const image = new Image();
    image.src = imageSrc;
    //wait
    const vibrant = await Vibrant.from(image).getPalette(); // get the color palette
  
    const primaryColor = vibrant.Vibrant!.hex || '#FFFFFF'; // get the hex code of the Vibrant color or fallback to white
    console.log('primary color: ', primaryColor);
    console.log('VIBRANT OBJECT : ', vibrant);
    this.componentUpdatesService.videoPrimaryColorUpdate(primaryColor);
    this.currentFrame++;
  }
}
