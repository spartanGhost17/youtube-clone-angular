import { Component, enableProdMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { ComponentUpdatesService } from './shared/services/app-updates/component-updates.service';
import { ProgressBarService } from './shared/services/progress-bar/progress-bar.service';
import { NgProgress, NgProgressModule } from 'ngx-progressbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NgProgressModule],
})
export class AppComponent {
  isCollapsed = false;
  sidebarType: string = 'side'; //'side'

  constructor(
    private componentUpdatesService: ComponentUpdatesService,
    private progressBar: NgProgress,
    public progressBarService: ProgressBarService
  ) {

    this.componentUpdatesService.sideBarTypeUpdate(this.sidebarType);
    if (environment.production) {
      enableProdMode();
    }
  }

  ngOnInit() {
    this.progressBarService.progressRef = this.progressBar.ref('myProgress');
  }
}
