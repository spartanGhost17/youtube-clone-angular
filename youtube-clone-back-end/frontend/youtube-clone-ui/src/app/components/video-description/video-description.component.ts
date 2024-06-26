import { DatePipe, NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LinkifyPipe } from '../../pipes/linkify/linkify.pipe';
import { NewlineToBrPipe } from '../../pipes/newline-to-br/newline-to-br.pipe';
import { Video } from '../../shared/types/video';
import { style } from '@angular/animations';
import { DatecstmPipe } from '../../pipes/datecstm/datecstm.pipe';

@Component({
    selector: 'app-video-description',
    templateUrl: './video-description.component.html',
    styleUrls: ['./video-description.component.scss'],
    standalone: true,
    imports: [LinkifyPipe, NewlineToBrPipe, NgIf, DatePipe, DatecstmPipe]
})
export class VideoDescriptionComponent {
  @ViewChild('content') content : ElementRef<any>;
  @Input() metadata: Video;

  MAX_CONTENT_HEIGHT : string = '500px';
  MIN_CONTENT_HEIGHT : string = '44px';
  SHOW_MORE: string = '...more';

  isShowMore: boolean = false;
  isShowLess: boolean = false;
  constructor() {}


  showMore() {
    this.isShowMore = !this.isShowMore;
    if(this.isShowMore) {
      this.content.nativeElement.style.height = this.MAX_CONTENT_HEIGHT;
      this.content.nativeElement.style.overflowY = 'scroll';
      this.SHOW_MORE  = 'Show less';
      this.isShowLess = false;
    }
  }

  showLess() {
    this.isShowLess = !this.isShowLess;
    if(this.isShowLess) {
      this.content.nativeElement.style.height = this.MIN_CONTENT_HEIGHT;
      this.content.nativeElement.style.overflowY = 'hidden';
      this.SHOW_MORE  = '...more';
      this.isShowMore = false;
    }
  }
}
