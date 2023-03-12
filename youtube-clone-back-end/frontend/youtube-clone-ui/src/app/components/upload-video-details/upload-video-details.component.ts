import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-upload-video-details',
  templateUrl: './upload-video-details.component.html',
  styleUrls: ['./upload-video-details.component.scss']
})
export class UploadVideoDetailsComponent {
  titleValue: string | null = null;
  textValue: string | null = null;
  @Output() videoTitleChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(){}

  getTitleValue(){
    return this.titleValue;
  }

  setTitleValue(value: string | null){
    this.titleValue = value;
    this.videoTitleChanged.emit(this.titleValue!);
  }
}
