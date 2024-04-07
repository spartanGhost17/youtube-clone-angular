import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import resources from '../../../../resources/end-points.json';
import { Comment } from '../../../models/comment';
import { CommentForm } from '../../types/commentForm.interface';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { buildURL } from '../../utils/sharedUtils';
import { CommentRequestForm } from '../../types/commentReqForm.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  serverUrl: string = environment.apiUrl;
  COMMENT = resources.COMMENT_END_POINTS;

  constructor(private http: HttpClient) { }

  /**
   * post a comment
   * @param commentForm 
   * @returns 
   */
  create(commentForm: CommentForm): Observable<HttpResponseInterface<Comment>> {
    const url: string = buildURL(this.serverUrl, this.COMMENT.COMMENT);
    return this.http.post<HttpResponseInterface<Comment>>(url, commentForm);
  }

  /**
   * delete a comment
   * @param { number } id the id of comment to delete
   * @returns { Observable<HttpResponseInterface<Comment>> } the response
   */
  delete(id: number): Observable<HttpResponseInterface<Comment>> {
    const url: string = buildURL(this.serverUrl, this.COMMENT.COMMENT);
    const params: HttpParams = new HttpParams().append('id', id);
    return this.http.delete<HttpResponseInterface<Comment>>(url, { params });
  }

  /**
   * update a comment
   * @param { string } text comment text 
   * @param { number } id id of comment to update
   * @returns { Observable<HttpResponseInterface<Comment>> } the response
   */
  update(text: string, id: number): Observable<HttpResponseInterface<Comment>> {
    const url: string = buildURL(this.serverUrl, this.COMMENT.COMMENT);
    const params: HttpParams = new HttpParams()
                                      .append('text', text)
                                      .append('id', id);
    return this.http.patch<HttpResponseInterface<Comment>>(url, params);
  }

  /**
   * get a list of comments 
   * @param { CommentRequestForm } commentForm the comment form
   * @returns { Observable<HttpResponseInterface<Comment[]>> } the response
   */
  get(commentForm: CommentRequestForm): Observable<HttpResponseInterface<Comment[]>> {
    const url: string = buildURL(this.serverUrl, this.COMMENT.COMMENT);
    const params: HttpParams = new HttpParams()
                                    .append('videoId', commentForm.videoId)
                                    .append('pageSize', commentForm.pageSize)
                                    .append('offset', commentForm.offset)
                                    .append('parentId', commentForm.parentId)
                                    .append('isSubComment', commentForm.isSubComment);
    return this.http.get<HttpResponseInterface<Comment[]>>(url, { params });
  }
}
