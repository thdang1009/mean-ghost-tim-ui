// analytic
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ghostLog, handleError } from '@shares/common';
import { AccessLog } from '@models/_index';

const apiUrl = environment.apiUrl + '/v1/analytic';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(private http: HttpClient) { }

  logAccess(): Observable<any> {
    return this.http.post<AccessLog>(apiUrl, {
      clientTime: new Date,
      // còn lại thì mai viết nha
    }).pipe(
      tap((prod: AccessLog) => ghostLog(`Log Access!`)),
      catchError(handleError<AccessLog>('Log Access!'))
    );
  }

  getTotalAccess(): Observable<any> {
    const url = `${apiUrl}/access/count`;
    return this.http.get<any>(url).pipe(
      tap(_ => ghostLog(`getTotalAccess`)),
      catchError(handleError<any>(`getMgetTotalAccessyMeal`))
    );
  }

  getStoragedSpace(): Observable<any> {
    const url = `${apiUrl}/db/storaged-space`;
    return this.http.get<any>(url).pipe(
      tap(_ => ghostLog(`getStoragedSpace`)),
      catchError(handleError<any>(`getStoragedSpace`))
    );
  }
}
