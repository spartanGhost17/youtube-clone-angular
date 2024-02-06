import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-description',
  templateUrl: './video-description.component.html',
  styleUrls: ['./video-description.component.scss']
})
export class VideoDescriptionComponent {
  @ViewChild('content') content : ElementRef<any>;
  text: string = `Video description is here so here is a link https://www.youtube.com/ \n 
  Here is a second link: http://www.youtube.com/watch \n 
  Some text linking to History:  http://localhost:4200/home/feed/history  \n`;
  MAX_CONTENT_HEIGHT : string = '400px';
  MIN_CONTENT_HEIGHT : string = '50px';
  SHOW_MORE: string = '...more';

  isShowMore: boolean = false;
  isShowLess: boolean = false;
  constructor() {}


  showMore() {
    console.log(`show more: ${this.isShowMore}`);
    this.isShowMore = !this.isShowMore;
    console.log(`show more after: ${this.isShowMore}`);
    if(this.isShowMore) {
      this.content.nativeElement.style.height = this.MAX_CONTENT_HEIGHT;
      this.SHOW_MORE  = 'Show less';
      this.isShowLess = false;//!this.isShowLess;
    }
  }

  showLess() {
    console.log(`show less: ${this.isShowLess}`);
    this.isShowLess = !this.isShowLess;
    console.log(`show less after: ${this.isShowLess}`);
    if(this.isShowLess) {
      this.content.nativeElement.style.height = this.MIN_CONTENT_HEIGHT;
      this.SHOW_MORE  = '...more';
      this.isShowMore = false;//!this.isShowMore;
    }
  }
}
