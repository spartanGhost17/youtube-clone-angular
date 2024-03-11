import { Injectable } from '@angular/core';
import resources from '../../../../../resources/end-points.json'
import { environment } from '../../../../../environments/environment';
import { HttpResponseInterface } from '../../../../shared/types/httpResponse.interface';
import { CategoryInterface } from '../types/category.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { buildURL } from '../../../../shared/utils/sharedUtils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiUrl: string = environment.apiUrl;
  CATEGORY_END_POINTS = resources.CATEGORY_END_POINTS;
  
  constructor(private http: HttpClient) { }

  /**
   * get all selectable categories
   * @returns the list of selected categories
   */
  getAllCategories(): Observable<HttpResponseInterface<CategoryInterface[]>> {
    const url: string = buildURL(this.apiUrl, this.CATEGORY_END_POINTS.GET_ALL);
    return this.http.get<HttpResponseInterface<CategoryInterface[]>>(url);
  }
}
