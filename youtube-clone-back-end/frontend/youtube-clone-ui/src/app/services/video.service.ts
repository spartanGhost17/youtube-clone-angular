import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import end_points  from "../../resources/end-points.json"
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, catchError } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}
  httpOptions = {
    headers : new HttpHeaders({
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Authorization': ''
    })
  };
  /**
   * upload video to server
   * @param file video file to upload
   * @returns videoDto object containing video id and video url
   */
  uploadVideo(file: File): Observable<Video> {
    /*const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Authorization': ''
      })
    };*/
    const formData = new FormData();
    //console.log(file);
    formData.append('file', file, file.name);
    //console.log("in service ",formData);
    return this.httpClient.post<Video>(end_points.VIDEO_END_POINTS.UPLOAD_VIDEO, formData, this.httpOptions);
  }

  uploadVideoMetadata(Video: Video): Observable<String> {
    return this.httpClient.post<String>(end_points.VIDEO_END_POINTS.UPDATE_VIDEO_METADATA, Video, this.httpOptions);
  }
}
