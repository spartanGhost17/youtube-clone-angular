import { Component } from '@angular/core';
import { VideoCardComponent } from '../video-displays/video-card/video-card.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-history-view',
    templateUrl: './history-view.component.html',
    styleUrls: ['./history-view.component.scss'],
    standalone: true,
    imports: [NgFor, VideoCardComponent]
})
export class HistoryViewComponent {
  watchedVideos: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.watchedVideos = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21'];
  }
}
