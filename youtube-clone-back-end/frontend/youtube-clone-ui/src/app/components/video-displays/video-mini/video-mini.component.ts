import { Component, ElementRef, Input, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-video-mini',
    templateUrl: './video-mini.component.html',
    styleUrls: ['./video-mini.component.scss'],
    standalone: true
})
export class VideoMiniComponent {
  @Input() ThumbnailURL: string;
  @Input() videoURL: string;
  //@Input() height: string = '50px';//'140px';
  @ViewChild('video') video: ElementRef<any>;
  play: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.video.nativeElement.muted = true;//mute video

    const video = this.elementRef.nativeElement.querySelector('video');
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
    console.log('isFirefox', isFirefox);

    video.addEventListener('loadedmetadata', () => {//once video is loaded
      if (isFirefox) {
        const pipButton = video.querySelector('button[title="Picture-in-Picture"]');
        console.log('pipButton ', pipButton);
        if (pipButton) {
          this.renderer.removeChild(video, pipButton);
        }
      }
    });
  }

  onMouseEnter() {
    this.video.nativeElement.play();
  }

  onMouseLeave() {
    this.video.nativeElement.pause();
  }
}
