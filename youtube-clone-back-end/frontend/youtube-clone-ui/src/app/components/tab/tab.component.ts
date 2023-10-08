import { Component, ElementRef, Input, ViewChild, NgZone, HostListener  } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  shouldHidePrev: boolean = true;
  withThreshold = 1200; // Replace with your desired width in pixels

  @Input() tabs: any[] = [];
  @ViewChild('container') container: ElementRef;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.shouldHideNavButtons();
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.shouldHideNavButtons();
  }

  /**
   *  scroll to next by 100 with transition animations 
  */
  scrollToNext() {
    const containerElement = this.container.nativeElement as HTMLElement;
    containerElement.scrollBy({
      left: 160, // Adjust this value as needed
      behavior: 'smooth', // Use smooth scrolling behavior
    });
  }

  /**
   * scroll to previous by 100 with transition animations
  */
  scrollToPrevious() {
    const containerElement = this.container.nativeElement as HTMLElement;
    containerElement.scrollBy({
      left: -160, // Adjust this value as needed
      behavior: 'smooth', // Use smooth scrolling behavior
    });
  }

  /**
   * should hide all navigation buttons
  */
  shouldHideNavButtons() {
    if (this.container.nativeElement.offsetWidth < this.withThreshold) {
      this.shouldHidePrev = true;
    } 
    else {
      this.shouldHidePrev = false;
    }
  }

  /**
   * On tab clicked 
   * @param clickedTab 
  */
  onTabClicked(clickedTab: any) {

    let idx = this.tabs.indexOf(clickedTab)
    console.log("index ",idx)

    for(const tab of this.tabs) {
      if (tab.active){
        tab.active = false;
        break;
      }
    }

    this.tabs[idx].active = true;
  }


}
