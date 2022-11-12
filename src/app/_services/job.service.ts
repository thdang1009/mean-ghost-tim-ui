import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';

const apiUrl = environment.apiUrl + '/v1/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  runJobManually(req, date: Date): Observable<any> {
    const url = `${apiUrl}/run`;
    return this.http.put(url, { ...req, date: date }).pipe(
      tap(_ => console.log(`runJobManually!`)),
      catchError(this.handleError<any>('runJobManually'))
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
