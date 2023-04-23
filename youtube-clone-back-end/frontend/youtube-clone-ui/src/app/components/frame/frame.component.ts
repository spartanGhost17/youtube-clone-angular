import { Component } from '@angular/core';
import { ComponentUpdatesService } from '../../services/app-updates/component-updates.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {
  sidebarOpen = false;
  
  constructor(private componentUpdatesService: ComponentUpdatesService) { 
  }

  ngOnInit(): void {
    console.log('SHOULD NGONINIT');
  }

  toggleSidebar(event: any): void {
    this.sidebarOpen = event;
    console.log("side bar:  ", this.sidebarOpen);
    //this.componentUpdatesService.sideBarCollapsedEmit(this.sidebarOpen);
  }
}
