import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json'
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { Status } from '../../types/status.interface';
import { Observable } from 'rxjs';
import { buildURL } from '../../utils/sharedUtils';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  apiUrl: string = environment.apiUrl;
  STATUS = resources.STATUS_END_POINTS;

  constructor(private http: HttpClient) { }

  /**
   * get all visibility status types 
   * @returns {HttpResponseInterface<Status[]>}
   */
  getAll(): Observable<HttpResponseInterface<Status[]>> {
    const url = buildURL(this.apiUrl, this.STATUS.GET_ALL);
    return this.http.get<HttpResponseInterface<Status[]>>(url);
  }

  /**
   * Update video status
   * @param {number} videoId the video id
   * @param {number} statusId the status id 
   * @returns {HttpResponseInterface<Status>} the response
   */
  updateVideoStatus(videoId: number, statusId: number): Observable<HttpResponseInterface<Status>> {
    const url = buildURL(this.apiUrl, this.STATUS.UPDATE_VIDEO_STATUS);
    const params = new HttpParams()
                        .append('videoId', videoId)
                        .append('statusId', statusId);

    return this.http.post<HttpResponseInterface<Status>>(url, params);
  }

  /**
   * update playlist status
   * @param {number} playlistId the playlist id 
   * @param {number} statusId the status id 
   * @returns {HttpResponseInterface<Status>} the response
   */
  updatePlaylistStatus(playlistId: number, statusId: number): Observable<HttpResponseInterface<Status>> {
    const url = buildURL(this.apiUrl, this.STATUS.UPDATE_PLAYLIST_STATUS);
    const params = new HttpParams()
                        .append('playlistId', playlistId)
                        .append('statusId', statusId);

    return this.http.post<HttpResponseInterface<Status>>(url, params);
  }
}
