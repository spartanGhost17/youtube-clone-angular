import { Component } from '@angular/core';
import { ComponentUpdatesService } from '../../shared/services/app-updates/component-updates.service';
import { FeedService } from '../../shared/services/feed/feed.service';
import { ProgressBarService } from '../../shared/services/progress-bar/progress-bar.service';
import { HttpResponseInterface } from '../../shared/types/httpResponse.interface';
import { UserInterface } from '../../shared/types/user.interface';
import { VideosExplorerComponent } from '../videos-explorer/videos-explorer.component';

@Component({
  selector: 'app-home-explorer-view',
  templateUrl: './home-explorer-view.component.html',
  styleUrls: ['./home-explorer-view.component.scss'],
  standalone: true,
  imports: [VideosExplorerComponent],
})
export class HomeExplorerViewComponent {
  feedMetadata: UserInterface[] = [];
  loadingVideos: boolean;
  defaultSize = 10;
  pageSize: number = 20;
  offset: number = 0;

  constructor(
    private feedService: FeedService,
    private progressBarService: ProgressBarService,
    private componentUpdatesService: ComponentUpdatesService
  ) {}

  ngOnInit(): void {
    this.componentUpdatesService.sideBarTypeUpdate('side');
    this.componentUpdatesService.sideBarCollapsedEmit(false);

    this.feedMetadata = new Array(this.defaultSize).fill(null);
    this.getVideos();
  }

  getVideos() {
    this.progressBarService.startLoading();
    this.loadingVideos = true;
    setTimeout(() => {
      this.feedService.getDefaultFeed(this.pageSize, this.offset).subscribe({
        next: (response: HttpResponseInterface<UserInterface>) => {

          if (response.data) {
            this.progressBarService.completeLoading();
            
            this.feedMetadata = [
              ...this.feedMetadata.filter((video) => video !== null),
            ]; //remove place holder entries
            this.feedMetadata = [...this.feedMetadata, ...response.data.feed]; //replace them

            this.loadingVideos = false;
            this.offset += this.pageSize;
          }
        },
      });
    }, 2000);
  }
}
