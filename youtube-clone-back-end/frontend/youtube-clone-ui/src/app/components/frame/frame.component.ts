import { Component, Input } from '@angular/core';
import { ComponentUpdatesService } from '../../services/app-updates/component-updates.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {
  sidebarOpen = false;
  sidebarType: string;
  @Input() sideMenuOptions: any[] = [];
  @Input() user: any;
  
  constructor(private componentUpdatesService: ComponentUpdatesService) { 
  }

  ngOnInit(): void {
    console.log('SHOULD NGONINIT');
  }

  ngAfterViewInit(): void {
    this.componentUpdatesService.sideBarType$.subscribe((sidebarType) => {
      this.sidebarType = sidebarType;
      console.log(`console log ==========> ${sidebarType}`)
    });
    console.log(`logging type here ${this.sidebarType}`);
  }

  toggleSidebar(event: any): void {
    this.sidebarOpen = event;
    console.log("side bar:  ", this.sidebarOpen);
    //this.componentUpdatesService.sideBarCollapsedEmit(this.sidebarOpen); sideBarTypeUpdate
  }
}
