import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { Video } from '../../types/video';
import { VideoMetadataForm } from '../../types/videoMetadataForm.interface';
import { buildURL, getFormData } from '../../utils/sharedUtils';

@Injectable({
  providedIn: 'root',
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
  uploadVideo(file: File): Observable<number | HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.UPLOAD_VIDEO);
    const formData: FormData = getFormData(file, 'video');
    // Create a new Observable to report upload progress
    return new Observable<number | HttpResponseInterface<Video>>((observer) => {
      // Perform the HTTP POST request
      const req = this.http
        .post<HttpResponseInterface<Video>>(url, formData, {
          reportProgress: true, // Enable progress reporting
          observe: 'events', // Report all events, including progress events
        })
        .subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress) {
              // Calculate and report the upload percentage
              const percentDone = Math.round(
                (100 * event.loaded) / event.total!
              );
              console.log('Upload progress: ', percentDone);
              observer.next(percentDone);
            } else if (event instanceof HttpResponse) {
              // If the upload is complete and the response body is not null, emit the response
              if (event.body !== null) {
                observer.next(event.body);
              }
              observer.complete(); // Complete the Observable
            }
          },
          error: (error) => {
            // If there's an error, report it and complete the Observable
            observer.error(error);
            observer.complete();
          },
        });

      // Return a teardown function to unsubscribe when the Observable is unsubscribed
      return () => req.unsubscribe();
    });
  }

  /**
   *
   * @param metadataForm
   * @returns
   */
  updateVideoMetadata(
    metadataForm: VideoMetadataForm
  ): Observable<HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.UPDATE_VIDEO_METADATA);
    return this.http.patch<HttpResponseInterface<Video>>(url, metadataForm);
  }

  /**
   * delete video
   * @param {number} videoId
   * @returns {HttpResponseInterface<Video>} response
   */
  deleteVideo(videoId: number): Observable<HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.DELETE);
    const params = new HttpParams().append('id', videoId);
    return this.http.delete<HttpResponseInterface<Video>>(url, { params });
  }

  /**
   * get user's videos metadata
   * @param pageSize the page size
   * @param offset the offset
   * @returns {HttpResponseInterface<Video>} the response
   */
  getUserVideos(
    userId: number,
    pageSize: number,
    offset: number
  ): Observable<HttpResponseInterface<Video>> {
    const url = buildURL(this.serverUrl, this.VIDEO.GET_USER_VIDEOS_PAGE);
    const params = new HttpParams()
      .append('userId', userId)
      .append('pageSize', pageSize)
      .append('offset', offset);

    return this.http.get<HttpResponseInterface<Video>>(url, { params });
  }

  streamVideo(url: string, start: number, end: number): Observable<{ data: ArrayBuffer, contentRange: string }> {
    const headers = new HttpHeaders()
                    .set('Range', `bytes=${start}-${end}`);
                    
    return this.http.get(url, {
      headers,
      observe: 'response',
      responseType: 'arraybuffer' //'blob'//'arraybuffer' as 'json'
    }).pipe(
      map((response) => {
        const contentRange = response.headers.get('Content-Range') ?? '';
        return { data: response.body!, contentRange: contentRange };
      })
    );
  }

  /**
   * get the video metadata by video id
   * @param { number } id the video id
   * @returns the response
  */
  getVideoById(id: number): Observable<HttpResponseInterface<Video>> {
    const params = new HttpParams().append('id', id);
    const url = buildURL(this.serverUrl, this.VIDEO.GET_BY_ID);
    return this.http.get<HttpResponseInterface<Video>>(url, {params});
  }

  // Function to convert Base64 to Blob
  private base64ToBlob(base64: string): Blob {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes]);
  }
}
