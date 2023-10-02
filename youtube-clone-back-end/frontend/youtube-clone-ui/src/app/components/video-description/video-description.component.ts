import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})
export class VideoDescriptionComponent {
  @ViewChild('content') content : ElementRef<any>;
  MAX_CONTENT_HEIGHT : string = '400px';
  MIN_CONTENT_HEIGHT : string = '50px';
  SHOW_MORE: string = 'Show more';

  isShowMore: boolean = false;
  isShowLess: boolean = false;
  constructor() {}


  showMore() {
    this.isShowMore = !this.isShowMore;
    if(this.isShowMore) {
      this.content.nativeElement.style.height = this.MAX_CONTENT_HEIGHT;
      this.SHOW_MORE  = 'Show less';
      this.isShowLess = !this.isShowLess;
    }
  }

  showLess() {
    this.isShowLess = !this.isShowLess;
    if(this.isShowLess) {
      this.content.nativeElement.style.height = this.MIN_CONTENT_HEIGHT;
      this.SHOW_MORE  = 'Show more';
      this.isShowMore = !this.isShowMore;
    }
  }
}
