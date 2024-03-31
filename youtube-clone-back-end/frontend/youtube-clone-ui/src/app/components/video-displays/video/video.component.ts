import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { Icons } from 'src/app/models/icons';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';

import { animate, AnimationEvent, keyframes, style, transition, trigger } from '@angular/animations';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import Vibrant from 'node-vibrant'; // stable version node-vibrant@3.1.6
import { TooltipDirective } from '../../../directives/tooltip/tooltip.directive';
import { VideoService } from '../../../shared/services/video/video.service';
import { formatDuration } from '../../../shared/utils/sharedUtils';
import { StandardDropdownComponent } from '../../dropdown/standard-dropdown/standard-dropdown.component';
import { SwitchComponent } from '../../switch/switch.component';
//import { playIconAnimation } from '../../../shared/utils/animations';
//import * as shaka from 'shaka-player';

export let shaka = require('../../../../../node_modules/shaka-player/dist/shaka-player.compiled');
//export const shaka = require('../../../../../node_modules/shaka-player/dist/shaka-player.ui.debug')
//export const shaka = require('../../../../../node_modules/shaka-player/dist/shaka-player.compiled.d.ts')

//for shaka player to work either delete all *.d.ts or downgrade to v3
//https://stackoverflow.com/questions/74672369/how-to-import-shaka-player-with-typescript
@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    standalone: true,
    imports: [NgClass, TooltipDirective, SwitchComponent, StandardDropdownComponent, NgStyle, NgIf],
    animations: [
      trigger('playIconAnimation', [
        transition(':enter', [
          animate('.7s', keyframes([
            style({ transform: 'scale(.6)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1)', opacity: 1, offset: 0.5 }),
            style({ transform: 'scale(1.4)', offset: 0.75 }),
            style({ transform: 'scale(2)', opacity: 0, offset: 1 })
          ]))
        ])
      ])
    ]
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
  isLoop: boolean = false;

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

  mediaSource: MediaSource;
  sourceBuffer: SourceBuffer;
  contentLength: number;
  contentRange: number;
  url: string;
  startByte = 0;
  endByte = 1000 * 1024;//1024 * 1024; // Fetch 1MB at a time
  videoElement: HTMLVideoElement;

  player: any; //shaka-player
  animationState: 'start' | 'void' = 'void'; // Set initial state to 'void'

  //imports
  icons: Icons = new Icons();
  subtitles: string = this.icons.iconsPaths['subtitles'];

  @ViewChild('video') video: ElementRef<any>;
  @ViewChild('videoContainer') videoContainer: ElementRef<any>;
  @ViewChild('volumeSlider') volumeSlider: ElementRef<any>;
  @ViewChild('previewImg') previewImg: ElementRef<any>;
  @ViewChild('thumbnailImg') thumbnailIm: ElementRef<any>;
  @ViewChild('timelineContainer') timelineContainer: ElementRef<any>;
  @ViewChild('buffering') bufferingIcon: ElementRef<any>;
  @ViewChild('bigPlay') bigPlay: ElementRef<any>;

  @Input() videoURL: string = 'http://localhost:8080/api/v1/video/watch/52532f11-0414-4982-8381-b9c6545d7212'
  @Input() manifestMpdUrl: string;
  @Input() manifestHlsUrl: string;
  constructor(private componentUpdatesService: ComponentUpdatesService, private videoService: VideoService, private renderer: Renderer2) {}
  
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
        {isSelect: true, text: '480p', value: '480p', isSelected: false},
        {isSelect: true, text: '240p', value: '240p', isSelected: false},
        {isSelect: true, text: 'Auto', value: 'Auto', isSelected: true},
      ], action: () => {}},
    ];
  }

  /**
   * pause video by default 
  */
  ngAfterViewInit() {
    this.paused ? this.video.nativeElement.pause() : this.video.nativeElement.play();
    //this.renderer.selectRootElement(this.video.nativeElement).focus();
    this.video.nativeElement.addEventListener("keydown", (event: any) => {
      console.log("event keydown ", event);
      this.handleKeyboardEvent(event);
    })

    this.initShackaApp();
    
    setInterval(() => {
      this.updateBufferData();
    }, 10);
    //this.initMediaSource();
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
   * on animation event triggered
   * @param { AnimationEvent } event 
  */
  onAnimationEvent(event: AnimationEvent) {
    if (event.phaseName === 'start') {
      // Animation started
      this.onAnimationStart();
    } else if (event.phaseName === 'done') {
      // Animation ended
      this.onAnimationEnd();
    }  
  }

  /**
   * on animation start event 
  */
  onAnimationStart() {
    this.bigPlay.nativeElement.style.display = 'flex';
    this.bigPlay.nativeElement.style.justifyContent = 'center';
    this.bigPlay.nativeElement.style.alignItems = 'center';
  }

  /**
   * on animation end event 
  */
  onAnimationEnd() {
    this.animationState = 'void'
    this.bigPlay.nativeElement.style.display = 'none';
  }

  /**
   * toggle big play button animation 
  */
  toggleAnimation() {
    console.log("the animation state ", this.animationState);
    this.animationState = this.animationState === 'start' ? 'void' : 'start'; // Toggle animation state
  }

  /**
   * keyboard events for keyboard shortcuts bindings
   */
  //@HostListener('document:keydown', ['$event'])
  //@HostListener('keydown', ['$event'])
  handleKeyboardEvent(event: any) { //KeyboardEvent) {
    console.log("handleKeyboardEvent", event)
    //const tagName = document.activeElement?.tagName.toLocaleLowerCase();
    const tagName = (event.target as HTMLElement)?.tagName?.toLowerCase();
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
   * initialize shaka app and check browser support
  */
  private initShackaApp() {
    // Install built-in polyfills to patch browser incompatibilities.
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs.
    if (shaka.Player.isBrowserSupported()) {
      this.videoElement = this.video.nativeElement;
      
      this.initPlayer();
    } else {
      // This browser does not have the minimum set of APIs we need.
      // use MSE byte range based API
      console.error('Browser not supported! ');
    }
  }

  /**
   * initialize shaka player and pass either mpd manifest or hls manifest 
  */
  private initPlayer() {
    this.player = new shaka.Player(this.videoElement);

    // Attach player to the window to make it easy to access in the JS console.
    // window.player = player;

    // Listen for error events.
    this.player.addEventListener('error', this.onErrorEvent);
    this.player.addEventListener('buffering', (event: any) => {
      this.onBuffering(event);
    })
    // Try to load a manifest.
    // This is an asynchronous process.
    
    //player.configure({playRangeStart: 10, playRangeEnd: 30});
    //player.seekRange()
    //player.seek(desiredStartTimeInSeconds);

    this.player.load(this.manifestMpdUrl).then(() => {
      //this.togglePlay();
      // This runs if the asynchronous load is successful.
    }).catch((error: any) => {
      this.onError(error);
      console.log("Not an EME supported Browser? Remove the player.");
      this.player.unload().then(this.manifestHlsUrl);//for Apple support
    });// onError is executed if the asynchronous load fails.
  }

  /**
   * on any error event 
   * @param event 
  */
  private onErrorEvent(event: any) {
    // Extract the shaka.util.Error object from the event.
    this.onError(event.detail);
  }

  /**
   * handle error event 
   * @param error 
  */
  private onError(error: any) {
    // Log the error.
    console.error('Error code', error.code, 'object', error);
  }

  /**
   * video buffering 
   * @param event 
   */
  private onBuffering(event: any) {
    if(event.buffering) {
      this.bufferingIcon.nativeElement.style.display = 'block'; // Show the icon
    } else {
      this.bufferingIcon.nativeElement.style.display = 'none'; // Hide the icon
    }
  }

  /**
   * handle change bit-rate for shaka player
   * @param selectedOption the selection option
   * @param idx the selected index
   */
  selectShakaABRSettings(selectedOption: any, idx: number) {
    if (selectedOption.text.toLowerCase() === 'auto') {
      // Enable automatic ABR (Adaptive Bitrate) selection
      this.player.configure({
        abr: {
          enabled: true,
        },
      });
    } else {

      this.player.configure({
        abr: {
          enabled: false,
        },
      });
      this.player.selectVariantTrack(this.player.getVariantTracks()[idx]);
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
    //this.captionText.mode = 'hidden';
    this.videoDurationMillisec = this.video.nativeElement.duration;
    this.videoDuration = formatDuration(this.videoDurationMillisec);
    //this.videoDuration = this.formatDuration(this.video.nativeElement.duration);
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
    } else if(listItem.text === 'Quality') {
      this.changeVideoBitRate(listItem)
    }
  } 

  /**
   * change the video bit rate based on what quality was selected
   * @param listItem 
   */
  changeVideoBitRate(listItem: any) {
    listItem.subMenu.forEach((subMenuItem: any, idx: any) => {
      if(subMenuItem.isSelected) {
        this.selectShakaABRSettings(subMenuItem, idx);
      }
    });
  }

  //this will come from the modal pop up in the future
  /**
   * update playback speed in .25 increments 
  */
  changePlaybackSpeed(playbackSpeed: any) {
    this.video.nativeElement.playbackRate = playbackSpeed;
  }

  /**
   * skip through video duration backwards or forwards
   * @param duration either -5 or 5 seconds
  */
  skip(duration: number) {
    this.video.nativeElement.currentTime += duration;
  }

  /**
   * Update the download progress bar 
   * 
  */
  updateBufferData() {
    if (this.video.nativeElement.buffered.length > 0) {
      // Get the start and end time of the first buffered range
      const startTime = this.video.nativeElement.buffered.start(0);
      const endTime = this.video.nativeElement.buffered.end(0);
      this.timelineContainer.nativeElement.style.setProperty("--download-percentage", (endTime - startTime)/100);
      //console.log("Buffered range: " + startTime + " - " + endTime);
    }
  }

  /**
   * updates UI with the current time of the video element
   * @param video video element target
  */
  async timeUpdated(video: HTMLVideoElement) {
    this.videoCurrentTime = formatDuration(video.currentTime);
    const percentage = video.currentTime / this.videoDurationMillisec;
    this.timelineContainer.nativeElement.style.setProperty("--progress-position", percentage);
    this.loop();
    //await this.captureColors();
    
    //const vibrantPrimaryColor =   (await this.captureColors()).subscribe((color) => {
    //  console.log("SUBSCRIBING TO COLOR: ", color);
    //  this.componentUpdatesService.videoPrimaryColorUpdate(color);
    //});
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
   * toggle video play state
  */
  togglePlay() {
    this.paused = !this.paused;
    this.toggleAnimation();
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


  /**
   * restart video
   */
  restartVideo() {
    this.video.nativeElement.currentTime = 0;
  }

  onVideoEnded() {
    //console.log("video ended??", this.video.nativeElement.currentTime)
    //this.video.nativeElement.pause()
    // Video ended, you can handle looping logic here
    //this.restartVideo();
  }

  /**
   * initialize media source
   */
  initMediaSource() {
    this.mediaSource = new MediaSource();
    const mimeType: string = 'video/mp4; codecs="avc1.64001e, mp4a.40.2"';//'video/mp4; codecs="avc1.4D4028, mp4a.40.2"';//, mp4a.40.2"';    

    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(mimeType);      
      this.loadVideoSegments()
    });
    //Assign the MediaSource URL to the video element
    this.video.nativeElement.src = URL.createObjectURL(this.mediaSource);
  }

  /**
   *  load video segments for media source
  */
  loadVideoSegments() {
    const fetchSegment = () => {
      this.videoService.streamVideo(this.videoURL, this.startByte, this.endByte).subscribe({
        next: ({ data, contentRange }) => {
          this.contentRange = Number(contentRange.split(",")[0].split("/")[1]);
          
          const rngHeader = contentRange.split(",")[0].split("/")
          const percentage = Number(rngHeader[0].split('-')[1]) / Number(rngHeader[rngHeader.length - 1]);
          
          this.timelineContainer.nativeElement.style.setProperty("--download-percentage", percentage);
          if (!this.mediaSource || this.mediaSource.readyState !== 'open') {
            return;
          }
          const array = new Uint8Array(data);
          this.sourceBuffer.appendBuffer(array);
          
          this.startByte = this.endByte + 1;
          this.endByte += 1000 * 1024 //100KB Fetch next 1MB segment

          if(this.startByte < this.contentRange) {
            setTimeout(() => fetchSegment(), 1000);
            //setTimeout(this.newSubFn.bind(this), 1000);
          }
          
        },
        error: (err) => {
          console.error("Error fetching video segment:", err);
          // Handle errors gracefully
        }
      });
    }
    fetchSegment();
  }

  /**
   * loop video
  */
  loop() {    
    const cl = formatDuration(this.video.nativeElement.currentTime);
    if(this.compareTimes(cl, this.videoDuration) >= 0 && this.isLoop) {
      this.restartVideo();
    }
  }

  /**
   * on destroy lifecycle hook 
  */
  ngOnDestroy() {
    console.log("destroying...");
    if (this.mediaSource) {
      if(this.mediaSource.readyState === 'open') {
        this.mediaSource.endOfStream();
      }
    }
  }

  /**
   * compare times
   * @param {string} time1 
   * @param {string} time2 
   * @returns {Number} the comparison
   */
  compareTimes(time1: string, time2: string) {
    const timeSplit1 = time1.split(':').map(Number);
    const timeSplit2 = time2.split(':').map(Number);

    const date1 = new Date();
    const date2 = new Date();
    const seconds1 = (timeSplit1.length >= 1)? date1.setSeconds(timeSplit1[timeSplit1.length -1]) : 0;
    const minutes1 = (timeSplit1.length >= 2)? date1.setMinutes(timeSplit1[timeSplit1.length -2]) : 0;
    const hours1 = (timeSplit1.length >= 3)? date1.setHours(timeSplit1[timeSplit1.length -3]) : 0;

    const seconds2 = (timeSplit2.length >= 1)? date2.setSeconds(timeSplit2[timeSplit2.length -1]) : 0;
    const minutes2 = (timeSplit2.length >= 2)? date2.setMinutes(timeSplit2[timeSplit2.length -2]) : 0;
    const hours2 = (timeSplit2.length >= 3)? date2.setHours(timeSplit2[timeSplit2.length -3]) : 0;

    if (date1 < date2) {
      return -1;
    } else if (date1 > date2) {
      return 1;
    } else {
      return 0;
    }
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
