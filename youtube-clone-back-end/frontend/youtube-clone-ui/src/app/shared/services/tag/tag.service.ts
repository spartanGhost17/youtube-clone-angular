import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { Observable } from 'rxjs';
import { Tag } from '../../../models/tag';
import { buildURL } from '../../utils/sharedUtils';
import { CreateTagForm } from '../../types/createTagForm.interface';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  apiUrl: string = environment.apiUrl;
  Tag = resources.TAG_END_POINTS;

  constructor(private http: HttpClient) { }

  /**
   * create tag for video id
   * @param {CreateTagForm} createTagForm
   * @returns {HttpResponseInterface<Tag[]>} the response
   */
  createTag(createTagForm: CreateTagForm): Observable<HttpResponseInterface<Tag[]>> {
    const url = buildURL(this.apiUrl, this.Tag.CREATE);
    return this.http.post<HttpResponseInterface<Tag[]>>(url, createTagForm);
  }

  /**
   * get tags by video id
   * @param videoId 
   * @returns {HttpResponseInterface<Tag[]>} the response
   */
  getByVideoId(videoId: number): Observable<HttpResponseInterface<Tag[]>> {
    const url = buildURL(this.apiUrl, this.Tag.GET_BY_VIDEO_ID);
    const params = new HttpParams().append('videoId', videoId);
    return this.http.get<HttpResponseInterface<Tag[]>>(url, {params});
  }

  /**
   * get tags by name
   * @param {string} name 
   * @returns {HttpResponseInterface<Tag[]>}
   */
  getByName(name: string): Observable<HttpResponseInterface<Tag[]>> {
    const url = buildURL(this.apiUrl, this.Tag.GET_BY_NAME);
    const params: HttpParams = new HttpParams().append("name", name);
    return this.http.get<HttpResponseInterface<Tag[]>>(url, {params}); 
  }
  
  /**
   * delete single video tag by tag id
   * @param {number} videoId 
   * @param {number} tagId 
   * @returns {HttpResponseInterface<Tag[]>} the response
   */
  deleteTagById(videoId: number, tagId: number): Observable<HttpResponseInterface<Tag[]>> {
    const url = buildURL(this.apiUrl, this.Tag.DELETE_BY_TAG_ID);
    const params = new HttpParams()
                        .append("id", videoId.toString())
                        .append("tagId", tagId.toString());
    
    return this.http.delete<HttpResponseInterface<Tag[]>>(url, {params}); 
  }
}
