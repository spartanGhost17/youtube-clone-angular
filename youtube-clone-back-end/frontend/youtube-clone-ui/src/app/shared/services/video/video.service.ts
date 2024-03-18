import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { Video } from '../../types/video';
import { buildURL, getFormData } from '../../utils/sharedUtils';
import resources from '../../../../resources/end-points.json'

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  serverUrl: string = environment.apiUrl;
  VIDEO = resources.VIDEO_END_POINTS;

  constructor(private http: HttpClient) {}
  
  /**
   * upload video to server
   * @param file video file to upload
   * @returns videoDto object containing video id and video url
   */
  uploadVideo(file: File): Observable<HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.UPLOAD_VIDEO);
    const formData: FormData = getFormData(file, 'video');
    return this.http.post<HttpResponseInterface<Video>>(url, formData)
  }

  uploadVideoMetadata(Video: Video) {
    
  }

  /**
   * delete video 
   * @param {number} videoId 
   * @returns {HttpResponseInterface<Video>} response
   */
  deleteVideo(videoId: number): Observable<HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.DELETE);
    const params = new HttpParams().append('id', videoId);
    return this.http.delete<HttpResponseInterface<Video>>(url, {params});
  }

  /**
   * get user's videos metadata
   * @param pageSize the page size
   * @param offset the offset
   * @returns {HttpResponseInterface<Video>} the response
   */
  getUserVideos(pageSize: number, offset: number): Observable<HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.GET_USER_VIDEOS_PAGE)
    const params = new HttpParams()
                        .append('pageSize', pageSize)
                        .append('offset', offset);

    return this.http.get<HttpResponseInterface<Video>>(url, {params});
  }
}
