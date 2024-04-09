import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ComponentUpdatesService {
  
  sideBarCollapsed$ : Subject<boolean> = new Subject<boolean>();
  sideBarType$ : Subject<string> = new BehaviorSubject<string>('side');
  sideBarCurrentWidth$:  Subject<string> = new Subject<string>();

  headerAddVideo$: Subject<boolean> = new Subject<boolean>();

  videoTheaterMode$: Subject<boolean> = new Subject<boolean>();
  videoPrimaryColor$: Subject<string> = new Subject<string>();//updated every 30 frames

  reportModal$: Subject<{show: boolean, type: string}> = new BehaviorSubject<{show: boolean, type: string}>({show: false, type: ''});
  
  constructor() { }

  sideBarCollapsedEmit(collapse: boolean) {
    this.sideBarCollapsed$.next(collapse);
  }

  /**
   * Update side bar type either hover or side
   * @param type 
  */
  sideBarTypeUpdate(type: string) {
    console.log(`sideBarTypeUpdate IN SERVICE:${type}`);
    console.log(`len :${type.length}`);
    this.sideBarType$.next(type);
  }

  sideBarWidthUpdate(width: string) {
    this.sideBarCurrentWidth$.next(width);
  }

  headerAddVideoEmit(addVideo: boolean) {
    this.headerAddVideo$.next(addVideo);
  }

  toggleVideoTheaterMode(isCinemaMode: boolean) {
    this.videoTheaterMode$.next(isCinemaMode);
  }

  videoPrimaryColorUpdate(color: string) {
    this.videoPrimaryColor$.next(color);
  }

  /**
   * show report modal 
   * @param {boolean} showModal
   * @param {string} type the report type  
  */
  toggleReportModal(showModal: boolean, type: string) {
    this.reportModal$.next({show: showModal, type: type});
  }
}
