import { Component, enableProdMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ComponentUpdatesService } from './shared/services/app-updates/component-updates.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  isCollapsed = false;
  sidebarType: string = 'side'; //'side'

  constructor(private componentUpdatesService: ComponentUpdatesService) {
    console.log('sending side bar type ', this.sidebarType);
    this.componentUpdatesService.sideBarTypeUpdate(this.sidebarType);
    if (environment.production) {
      enableProdMode();
    }
    console.log(`CURRENT API URL: ${environment.apiUrl}`);
  }
}
