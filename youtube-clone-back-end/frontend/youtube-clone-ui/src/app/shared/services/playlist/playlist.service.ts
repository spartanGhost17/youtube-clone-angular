import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PlaylistForm } from '../../types/playlistForm.interface';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { PlaylistInterface } from '../../types/playlist.interface';
import { buildURL } from '../../utils/sharedUtils';
import resources from '../../../../resources/end-points.json' 

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
}
