import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { VideoService } from '../../../shared/services/video/video.service';
import { Video } from '../../../shared/types/video';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [NgIf, DatePipe, NgFor]
})
export class ContentComponent {
  pageSize: number = 20;
  offset: number = 0;
  videos: Video[];
  
  constructor(private videoService: VideoService) {}

  /**
   * lifecycle hook
   */
  ngOnInit(): void {
    this.videoService.getUserVideos(this.pageSize, this.offset).subscribe({
      next: (response) => {
        this.videos = response.data['video'];
        console.log("videos ", response.data['video']);
        console.log("videos assigned ", this.videos)
      }      
    })
  }
}
