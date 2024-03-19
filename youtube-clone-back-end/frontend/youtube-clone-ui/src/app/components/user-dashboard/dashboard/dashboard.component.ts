import { AsyncPipe, NgIf } from '@angular/common';
import {
  Component
} from '@angular/core';
import { ComponentUpdatesService } from 'src/app/shared/services/app-updates/component-updates.service';
import { ModalComponent } from '../../modal/modal.component';
import { StepsComponent } from '../../steps/steps.component';
import { UploadVideoMetadataComponent } from '../../upload-video-view/upload-video-metadata/upload-video-metadata.component';
import { UploadVideoComponent } from '../../upload-video-view/upload-video/upload-video.component';
import { VideoChecksComponent } from '../../upload-video-view/video-checks/video-checks.component';
import { VideoElementsComponent } from '../../upload-video-view/video-elements/video-elements.component';
import { VideoVisibilityComponent } from '../../upload-video-view/video-visibility/video-visibility.component';
import { MetadataModalComponent } from '../metadata-modal/metadata-modal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ModalComponent,
    StepsComponent,
    UploadVideoComponent,
    UploadVideoMetadataComponent,
    VideoElementsComponent,
    VideoChecksComponent,
    VideoVisibilityComponent,
    AsyncPipe,
    MetadataModalComponent,
  ],
})
export class DashboardComponent {
  isShowModal: boolean = false;

  constructor(private componentUpdatesService: ComponentUpdatesService) {}

  showModal() {
    this.isShowModal = !this.isShowModal;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.componentUpdatesService.headerAddVideo$.subscribe(
      (addVideoClicked) => {
        this.isShowModal = addVideoClicked;
        console.log('addVideoClicked ', addVideoClicked);
      }
    );
  }

  /**
   * show modal
   * @param event
   */
  showModalUpdateEvent(event: boolean) {
    this.isShowModal = event;
  }
}
