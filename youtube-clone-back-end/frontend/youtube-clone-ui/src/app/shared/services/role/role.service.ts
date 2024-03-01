import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { Role } from '../../types/Role';
import { environment } from '../../../../environments/environment';
import resources  from '../../../../resources/end-points.json'
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl: string = environment.apiUrl;
  ROLE_RESOURCES = resources.ROLE_END_POINTS;
  constructor(private http: HttpClient) { }

  /**
   * get all roles 
   * @returns the roles 
  */
  getRoles(): Observable<HttpResponseInterface<Role>> {
    const baseUrl = this.apiUrl;
    const url = new URL(
      this.apiUrl + this.ROLE_RESOURCES.GET_ALL,
      baseUrl
    );    
    
    return this.http.get<HttpResponseInterface<Role>>(url.toString());
  } 
}
