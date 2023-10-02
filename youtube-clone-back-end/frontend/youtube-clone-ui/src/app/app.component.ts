import { Component } from '@angular/core';
import { ComponentUpdatesService } from './services/app-updates/component-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  sidebarType: string = 'side'//'side'

  constructor(private componentUpdatesService: ComponentUpdatesService) {
    console.log('sending side bar type ', this.sidebarType)
    this.componentUpdatesService.sideBarTypeUpdate(this.sidebarType);
  }

  //ngOninit() {
    
  //}
}
