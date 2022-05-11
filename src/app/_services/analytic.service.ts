//analytic
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AccessLog } from '@app/_models/accesslog';

const apiUrl = environment.apiUrl + '/api/analytic';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  constructor(private http: HttpClient) { }

  logAccess(): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.post<AccessLog>(apiUrl, {
        clientTime: new Date,
        // còn lại thì mai viết nha
    }).pipe(
        tap((prod: AccessLog) => console.log(`Log Access!`)),
        catchError(this.handleError<AccessLog>('Log Access!'))
      );
  }

  getTotalAccess(): Observable<any> {
    const url = `${apiUrl}/access/count`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`getTotalAccess`)),
      catchError(this.handleError<any>(`getMgetTotalAccessyMeal`))
    );
  }

  getStoragedSpace(): Observable<any> {
    const url = `${apiUrl}/db/storaged-space`;
    return this.http.get<any>(url).pipe(
      tap(_ => console.log(`getStoragedSpace`)),
      catchError(this.handleError<any>(`getStoragedSpace`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
