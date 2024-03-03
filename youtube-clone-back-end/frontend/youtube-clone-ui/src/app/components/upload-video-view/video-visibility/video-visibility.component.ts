import { Component, ViewChildren, QueryList, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioGroupComponent } from '../../radio-group/radio-group.component';
import { ReportTypeInterface } from '../../../shared/types/reportType.interface';

@Component({
    selector: 'app-video-visibility',
    templateUrl: './video-visibility.component.html',
    styleUrls: ['./video-visibility.component.scss'],
    standalone: true,
    imports: [FormsModule, RadioGroupComponent]
})
export class VideoVisibilityComponent {
  selection: ReportTypeInterface[];
  
  constructor() {}

  ngOnInit(): void {
    this.selection = [
      {id: 1, type: 'PUBLIC', description: 'Everyone can watch your video'},
      {id: 1, type: 'PRIVATE', description: 'Only you and people who you choose can watch your video'},
      {id: 1, type: 'UNLISTED', description: 'Anyone with the video link can watch your video'}
    ];
  }

  onRadioBtnClicked(event: any) { 
    console.log(`selected radio button`, event)
  }

}
