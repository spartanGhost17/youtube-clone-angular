import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { VideoService } from '../../../shared/services/video/video.service';
import { selectStatus } from '../../../shared/store/status/reducers';
import { selectCurrentUser } from '../../../shared/store/user/reducers';
import { CurrentUserStateInterface } from '../../../shared/types/state/currentUserState.interface';
import { StatusState } from '../../../shared/types/state/statusState.interface';
import { Status } from '../../../shared/types/status.interface';
import { Video } from '../../../shared/types/video';
import { ModalComponent } from '../../modal/modal.component';
import { MetadataModalComponent } from '../metadata-modal/metadata-modal.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe, NgFor, MetadataModalComponent, ModalComponent]
})
export class ContentComponent {

  pageSize: number = 10;
  offset: number = 0;
  videos: Video[];
  selectedVideo: Video;
  showModal: boolean = false;
  visibility: Status[];
  showDeleteModal: boolean = false;
  videoToDelete: Video | undefined;
  deleteMessage: string;
  
  constructor(private videoService: VideoService, private store: Store<{status: StatusState, user: CurrentUserStateInterface}>) {}

  /**
   * lifecycle hook
   */
  ngOnInit(): void {

    this.store.select(selectCurrentUser).subscribe({
      next: (data) => {
        if(data) {
          //get a page of user videos
          this.videoService.getUserVideos(data.id, this.pageSize, this.offset).subscribe({
            next: (response) => {
              this.videos = response.data['video'];
            }      
          });
        }
      }
    })
    

    //select status
    this.store.select(selectStatus).subscribe({
      next: (statusList) => {
        if(statusList?.length! > 0) {
          this.visibility = statusList!;
        }
      }
    })
  }

  /**
   * open metadata modal
   * @param video 
   */
  showMetadataModal(video: Video) {
    this.showModal = true;
    this.selectedVideo = video;
  }

  /**
   * called when modal is closed
   * @param event 
   */
  modalVisibility(event: boolean): void {
    this.showModal = event;
  }

  /**
   * delete video 
   * @param video 
   */
  deleteVideo(video: Video) {
    this.showDeleteModal = true;
    this.videoToDelete = video;
  }

  /**
   * event fired when video delete modal is closed
   * @param event 
   */
  hideDeleteModal(event: boolean) {
    this.showDeleteModal = event
  }

  /**
   * on cancel delete modal
   */
  onCancelDelete() {
    this.showDeleteModal = false;
    this.videoToDelete = undefined;
  }

  /**
   * on delete video
   */
  onDelete() {
    this.videoService.deleteVideo(this.videoToDelete!.id).subscribe({
      next: (data) => {
        this.deleteMessage = data.message;
        this.videos = this.videos.filter(video => video.id !== this.videoToDelete!.id);
      }
    });
  
  }
}
