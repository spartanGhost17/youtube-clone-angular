import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Playlist } from '../../models/playlist';
import end_points  from "../../../resources/end-points.json"


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Authorization': ''
    })
  };

  createPlaylist(playlist: Playlist) : Observable<Playlist> {
    return this.httpClient.put<Playlist>(end_points.PLAYLIST_END_POINTS.CREATE_PLAYLIST, playlist, this.httpOptions)
  }
}
