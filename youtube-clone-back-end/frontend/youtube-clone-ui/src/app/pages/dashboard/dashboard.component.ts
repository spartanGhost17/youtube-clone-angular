import { Component } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isVisible: boolean = false;
  isConfirmLoading: boolean = false;
  videoUploaded: boolean = false;
  showVideoDetailSteps: boolean = true;
  videoTitle: string = "Upload video";
  
  current = 0;

  constructor() {}

  /**
   * show upload video process if upload video button is clicked on header
   * @param value 
   */
  showModal(value: boolean): void {
    console.log('showModal');
    this.isVisible = value;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }
  /** hide video upload modal on view closed */
  handleCancel(): void {
    this.isVisible = false;
  }

  /**
   * Show video details steps view and hide video upload component when 
   * video was successfully uploaded
   * @param event 
   */
  videoUploadedSucces(event: boolean){
    if(event){
      //this.videoUploaded = true;//set to true if successfully uploaded video
      //this.showVideoDetailSteps = true;
    };
  }

  videoTitleChanged(event: string): void {
    this.videoTitle = event;
    if(this.videoTitle=="")
      this.videoTitle = "Upload video"; 
    //console.log("null ",this.videoTitle=="");
    console.log("video: " +this.videoTitle);
  }

  pre(): void {
    this.current -= 1;
    //this.changeContent();
  }

  next(): void {
    this.current += 1;
    //this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  /*changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      case 3: {
        this.index = 'fourth-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }*/

}
