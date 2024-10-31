import { Injectable,  } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env';
import { IResponseData } from '../clientModels/response-data.interface';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  login(username: string, password: string): Observable<IResponseData<{ code: Number, token: string } | null>> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get<IResponseData<{ code: Number, token: string } | null>>(`${this.baseUrl}/accounts`, { params })
      .pipe(map(res => {
        return res; 
      }));
  }
    


}