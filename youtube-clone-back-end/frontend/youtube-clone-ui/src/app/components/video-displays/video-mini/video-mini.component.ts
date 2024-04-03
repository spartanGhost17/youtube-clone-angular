import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';
import { VideoService } from '../../../shared/services/video/video.service';
import { Video } from '../../../shared/types/video';
import { formatDuration } from '../../../shared/utils/sharedUtils';

@Component({
  selector: 'app-video-mini',
  templateUrl: './video-mini.component.html',
  styleUrls: ['./video-mini.component.scss'],
  standalone: true,
})
export class VideoMiniComponent {
  mediaSource: MediaSource;
  sourceBuffer: SourceBuffer;
  startByte: number = 0;
  endByte: number = 1000 * 1024;
  contentLength: number;
  contentRange: number;
  url: string;
  videoElement: HTMLVideoElement;
  isLoop: boolean = true;
  videoDurationSec: number;
  videoDuration: string = '00:00';

  @Input() ThumbnailURL: string;
  @Input() videoURL: string;
  @Input() videoMetadata: Video;

  @ViewChild('video') video: ElementRef<any>;
  play: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private videoService: VideoService
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.video.nativeElement.addEventListener('timeUpdate', () => {
      console.log("Time update ", this.video.nativeElement.currentTime);
    });

    this.video.nativeElement.muted = true; //mute video

    const video = this.elementRef.nativeElement.querySelector('video');
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    //console.log('isFirefox', isFirefox);

    video.addEventListener('loadedmetadata', () => {
      //once video is loaded
      if (isFirefox) {
        const pipButton = video.querySelector(
          'button[title="Picture-in-Picture"]'
        );
        console.log('pipButton ', pipButton);
        if (pipButton) {
          this.renderer.removeChild(video, pipButton);
        }
      }
    });

    
  }

  onMouseEnter() {
    this.play = true;
    this.initMediaSource();
    
    this.video.nativeElement.play();
  }

  onMouseLeave() {
    this.play = false;
    this.startByte = 0;
    this.endByte = 1000 * 1024;
    this.video.nativeElement.pause();
  }

  clearSourceBuffer(sourceBuffer: SourceBuffer) {
    try {
        if (!sourceBuffer.updating) {
            // Remove all media segments from the start to the end of the buffer
            sourceBuffer.remove(0, Infinity);
            console.log("Source buffer cleared successfully.");
        } else {
            console.error("Source buffer is currently updating. Cannot clear.");
        }
    } catch (error) {
        console.error("Error clearing source buffer:", error);
    }
  }

  /**
   * initialize media source
   */
  initMediaSource() {
    this.mediaSource = new MediaSource();
    const mimeType: string = 'video/mp4; codecs="avc1.64001e"'; //'video/mp4; codecs="avc1.4D4028, mp4a.40.2"';//, mp4a.40.2"';

    this.mediaSource.addEventListener('sourceopen', () => {
      this.sourceBuffer = this.mediaSource.addSourceBuffer(mimeType);
      this.loadVideoSegments();
    });
    //Assign the MediaSource URL to the video element
    this.video.nativeElement.src = URL.createObjectURL(this.mediaSource);
  }

  /**
   *  load video segments for media source
   */
  loadVideoSegments() {
    const fetchSegment = () => {
      if(this.play) {
        this.videoService
        .streamVideo(this.videoURL, this.startByte, this.endByte)
        .subscribe({
          next: ({ data, contentRange }) => {
            this.contentRange = Number(
              contentRange.split(',')[0].split('/')[1]
            );

            const rngHeader = contentRange.split(',')[0].split('/');
            const percentage =
              Number(rngHeader[0].split('-')[1]) /
              Number(rngHeader[rngHeader.length - 1]);
            
            console.log("Loading video content range ", contentRange)
            //this.timelineContainer.nativeElement.style.setProperty(
            //  '--download-percentage',
            //  percentage
            //);
            
            if (!this.mediaSource || this.mediaSource.readyState !== 'open') {
              return;
            }
            const array = new Uint8Array(data);
            this.sourceBuffer.appendBuffer(array);

            this.startByte = this.endByte + 1;
            this.endByte += 100 * 1024; //10KB Fetch next 1MB segment

            if ((this.startByte < this.contentRange) && this.play) {
              setTimeout(() => fetchSegment(), 1000);
              //setTimeout(this.newSubFn.bind(this), 1000);
            }
          },
          error: (err) => {
            console.error('Error fetching video segment:', err);
            // Handle errors gracefully
          },
        });
      }

    };
    fetchSegment();
  }

  /**
  * restart video
  */
  restartVideo() {
    this.video.nativeElement.currentTime = 0;
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

  onLoadedMetadata() {
    //this.captionText = this.video.nativeElement.textTracks[0];
    //this.captionText.mode = 'hidden';

    this.videoDurationSec = 2.9;
    this.videoDuration = formatDuration(this.videoDurationSec);
  }

  timeToSeconds(timeString: any) {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);

    return hours * 3600 + minutes * 60 + seconds;
  }

  onTimeUpdate() {
    this.loop();
  }

}
