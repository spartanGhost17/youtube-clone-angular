import { Injectable } from '@angular/core';
import resources from '../../../../resources/end-points.json';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { buildURL } from '../../utils/sharedUtils';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { UserInterface } from '../../types/user.interface';
@Injectable({
  providedIn: 'root'
})
export class FeedService {
  serverUrl: string = environment.apiUrl;
  FEED = resources.FEED_END_POINTS;
  
  constructor(private http: HttpClient) { }

  /**
   * get default videos feed
   * @param { number } pageSize the page size
   * @param { number } offset the offset
   */
  getDefaultFeed(pageSize: number, offset: number): Observable<HttpResponseInterface<UserInterface>> {
    const url = buildURL(this.serverUrl, this.FEED.GET_DEFAULT);
    const params = new HttpParams().append('pageSize', pageSize).append('offset', offset);
    return this.http.get<HttpResponseInterface<UserInterface>>(url, {params});
  }
}
