import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import end_points  from "../../resources/end-points.json"
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private httpClient: HttpClient) {}

  //url: string, title: string, description: string
  //       "Content-Type": "multipart/form-data",
  postVideo(file: File): Observable<any> {
    const httpOptions = {
      headers : new HttpHeaders({
        'Access-Control-Allow-Credentials' : 'true',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
        'Authorization': ''
      })
    };
    const formData = new FormData();
    //console.log(file);
    formData.append('file', file, file.name);
    //console.log("in service ",formData);
    return this.httpClient.post(end_points.VIDEO_END_POINTS.UPLOAD_VIDEO, formData, httpOptions);
  }
}
