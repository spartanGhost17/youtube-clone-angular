import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class ComponentUpdatesService {
  
  sideBarCollapsed : Subject<boolean> = new Subject<boolean>();
  sideBarCurrentWidth:  Subject<string> = new Subject<string>();
  
  constructor() { }

  sideBarCollapsedEmit(collapse: boolean) {
    this.sideBarCollapsed.next(collapse);
  }

  sideBarWidthUpdate(width: string) {
    this.sideBarCurrentWidth.next(width);
  }  
}
