import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { VideoService } from '../../services/video.service';
import { Observable } from 'rxjs';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  //msg: NzMessageService = new NzMessageService();
  uploadBtnSize: NzButtonSize = 'large';
  fileUpload: boolean = false;
  file: NzUploadFile | undefined;
  fileEntry: FileSystemFileEntry | undefined;
  fileEntryList: FileSystemFileEntry[] = [];
  uploading: boolean = false;
  @Output() videoUploadedSucces: EventEmitter<boolean> = new EventEmitter<boolean>();


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
          console.log(droppedFile.relativePath, file);
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
        this.videoService.uploadVideo(file).subscribe({
          next: (data) => {console.log("success !", data.id), this.uploadSuccess()},
          error: (err) => {
            console.log(err);
          }
        });
      });
    }
  }

  uploadSuccess() {
    this.videoUploadedSucces.emit(true);
  } 

}
