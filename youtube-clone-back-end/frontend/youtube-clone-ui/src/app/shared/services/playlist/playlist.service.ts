import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PlaylistForm } from '../../types/playlistForm.interface';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { PlaylistInterface } from '../../types/playlist.interface';
import { buildURL } from '../../utils/sharedUtils';
import resources from '../../../../resources/end-points.json' 
import { VideoItemFormInterface } from '../../types/videoItemForm.interface';
import { Video } from '../../types/video';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  apiUrl: string = environment.apiUrl;
  PLAYLIST = resources.PLAYLIST_END_POINTS;
  constructor(private http: HttpClient) { }

  /**
   * create a playlist
   * @param {PlaylistForm} playlistForm the playlist creation form 
   * @returns response
   */
  createPlaylist(playlistForm: PlaylistForm): Observable<HttpResponseInterface<PlaylistInterface>> {
    const url: string = buildURL(this.apiUrl, this.PLAYLIST.CREATE);
    return this.http.post<HttpResponseInterface<PlaylistInterface>>(url, playlistForm);
  }

  /**
   * get the user's playlists
   * @param {number} userId the user id
   * @returns {HttpResponseInterface<PlaylistInterface>} the user's playlists
   */
  getUserPlaylists(userId: number): Observable<HttpResponseInterface<PlaylistInterface>> {
    const url: string = buildURL(this.apiUrl, this.PLAYLIST.GET_BY_USER);
    const params = new HttpParams()
                  .append('userId', userId);
    
    return this.http.get<HttpResponseInterface<PlaylistInterface>>(url, {params});
  }

  /**
   * get playlist containing video
   * @param {number} videoId the video id 
   * @returns {HttpResponseInterface<PlaylistInterface[]>} the response
   */
  getPlaylistsContainingVideo(videoId: number): Observable<HttpResponseInterface<PlaylistInterface[]>> {
    const url: string = buildURL(this.apiUrl, this.PLAYLIST.GET_PLAYLIST_CONTAINING_VIDEO);
    const params = new HttpParams()
                        .append("videoId", videoId);
    return this.http.get<HttpResponseInterface<PlaylistInterface[]>>(url, {params});
  }

  /**
   * add a video to the playlist
   * @param {VideoItemFormInterface} VideoItemForm 
   * @returns response
   */
  addVideo(VideoItemForm: VideoItemFormInterface): Observable<HttpResponseInterface<Video>> {
    const url: string = buildURL(this.apiUrl, this.PLAYLIST.ADD_VIDEO);
    return this.http.post<HttpResponseInterface<Video>>(url, VideoItemForm);
  }

  /**
   * delete a video from the playlist
   * @param {VideoItemFormInterface} videoItemForm the video id 
   * @returns {HttpResponseInterface<Video>} the response
   */
  deleteVideo(videoItemForm: VideoItemFormInterface): Observable<HttpResponseInterface<Video>> {
    const url: string = buildURL(this.apiUrl, this.PLAYLIST.DELETE_VIDEO);
    const params = new HttpParams().append('videoId', videoItemForm.videoId)
                                  .append('playlistId', videoItemForm.playlistId);

    return this.http.delete<HttpResponseInterface<Video>>(url, {params});
  }
}
