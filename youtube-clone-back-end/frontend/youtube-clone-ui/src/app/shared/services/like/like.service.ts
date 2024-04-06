import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { LikeForm } from '../../types/likeForm.interface';
import { buildURL } from '../../utils/sharedUtils';
@Injectable({
  providedIn: 'root'
})
export class LikeService {
  serverUrl: string = environment.apiUrl;
  LIKE = resources.LIKE;
  
  constructor(private http: HttpClient) { }

  /**
   * add like to video or comment 
   * @param { LikeForm } likeForm the like form
   * @returns { Observable<HttpResponseInterface<null>> } the response
   */
  like(likeForm: LikeForm): Observable<HttpResponseInterface<null>> {
    const url: string = buildURL(this.serverUrl, this.LIKE.LIKE);
    return this.http.post<HttpResponseInterface<null>>(url, likeForm);
  }

  /**
   * remove like from video or comment
   * @param { LikeForm } likeForm the like form
   * @returns { Observable<HttpResponseInterface<null>> } the response
   */
  removeLike(likeForm: LikeForm): Observable<HttpResponseInterface<null>> {
    const url: string = buildURL(this.serverUrl, this.LIKE.LIKE);
    return this.http.delete<HttpResponseInterface<null>>(url, {body: likeForm});
  }
}
