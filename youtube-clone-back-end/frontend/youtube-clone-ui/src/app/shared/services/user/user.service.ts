import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import * as resources from '../../../../resources/end-points.json';
import { HttpResponseInterface } from '../../types/httpResponse.interface';
import { UserInterface } from '../../types/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  serverURL: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUser(): Observable<HttpResponseInterface<UserInterface>> {
    return this.http.get<HttpResponseInterface<UserInterface>>(
      this.serverURL + resources.USER_END_POINTS.GET_PROFILE
    );
  }

}
