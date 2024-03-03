import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { ReportTypeInterface } from '../../types/reportType.interface';
import { HttpClient } from '@angular/common/http';
import { buildURL } from '../../utils/sharedUtils';
import { environment } from '../../../../environments/environment';
import resource from '../../../../resources/end-points.json';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private serverUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * get all report types
   * @returns {HttpResponseInterface<ReportTypeInterface[]>} the report list
  */
  getAllReportTypes(): Observable<HttpResponseInterface<ReportTypeInterface[]>> {
    const url = buildURL(this.serverUrl, resource.REPORT_END_POINTS.GET_REPORT_TYPES)
    return this.http.get<HttpResponseInterface<ReportTypeInterface[]>>(url);
  }
}
