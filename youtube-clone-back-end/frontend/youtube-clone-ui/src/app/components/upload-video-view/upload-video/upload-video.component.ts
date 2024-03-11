import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonSize, NzButtonModule } from 'ng-zorro-antd/button';
import { VideoService } from '../../../shared/services/video/video.service';
import { Observable } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, NgxFileDropModule } from 'ngx-file-drop';
import { Video } from '../../../shared/types/video'
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NgFor } from '@angular/common';


@Component({
    selector: 'app-upload-video',
    templateUrl: './upload-video.component.html',
    styleUrls: ['./upload-video.component.scss'],
    standalone: true,
    imports: [NgxFileDropModule, NgFor, NzButtonModule, NzWaveModule, NzIconModule]
})
export class UploadVideoComponent implements OnInit {
  //msg: NzMessageService = new NzMessageService();
  uploadBtnSize: NzButtonSize = 'large';
  fileUpload: boolean = false;
  file: NzUploadFile | undefined;
  fileEntry: FileSystemFileEntry | undefined;
  fileEntryList: FileSystemFileEntry[] = [];
  uploading: boolean = false;
  fileName: string;
  isLoading: boolean = false;
  videoUploadResponse: Video = {
    id: 0,
    title: "",
    status: {id: 0, statusName:""},
  }
  @Output() videoUploadedSucces: EventEmitter<Object> = new EventEmitter<Object>();


  constructor(private videoService : VideoService) {}

  ngOnInit(): void {}

  files: NgxFileDropEntry[] = [];
  fileUploaded: boolean = false;
  
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log("Dropped ",droppedFile.relativePath, file);
          this.fileName = droppedFile.relativePath;
          this.fileUploaded = true;
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }
  /*beforeUpload = (file: NzUploadFile): boolean => {
    console.log(file);
    this.file = file;
    this.fileList = this.fileList.concat(file);
    return false;
  }*/

  /*handleChange({ file, fileList }: NzUploadChangeParam): void {
    this.file = file;
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
      console.log('uploading');
    }
    if (status === 'done') {
      console.log(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      //say something error
      console.log(`${file.name} file uploaded failed :(.`);
    }
  }*/

  uploadVideo() { 
    if(this.fileEntry){
      this.fileEntry.file(file => {
        console.log(file);
        this.isLoading = true;
        this.videoService.uploadVideo(file).subscribe({
          next: (data) => {
            this.isLoading = false;
            this.videoUploadResponse = data.data;
            console.log("success !", data.id), 
            this.uploadSuccess()
          },
          error: (err) => {
            this.isLoading = false;
            console.log(err);
          }
        });
      });
    }
  }

  /**
   * emits file upload success and file name on file successfully uploaded
   */
  uploadSuccess() {
    this.videoUploadedSucces.emit(
      {
        uploadStatus: this.fileUploaded,
        fileName: this.fileName,
        videoUploadResponse: this.videoUploadResponse
      }
    );
  } 

}
