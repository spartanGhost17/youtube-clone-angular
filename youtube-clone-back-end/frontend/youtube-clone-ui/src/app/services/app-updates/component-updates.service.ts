import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ComponentUpdatesService {
  
  sideBarCollapsed : Subject<boolean> = new Subject<boolean>();
  sideBarCurrentWidth:  Subject<string> = new Subject<string>();

  headerAddVideo: Subject<boolean> = new Subject<boolean>();
  
  constructor() { }

  sideBarCollapsedEmit(collapse: boolean) {
    this.sideBarCollapsed.next(collapse);
  }

  sideBarWidthUpdate(width: string) {
    this.sideBarCurrentWidth.next(width);
  }

  headerAddVideoEmit(addVideo: boolean) {
    this.headerAddVideo.next(addVideo);
  }
}
