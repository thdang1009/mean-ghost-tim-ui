import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ghostLog, handleError } from '@shares/common';

const apiUrl = environment.apiUrl + '/v1/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  runJobManually(req, date: Date): Observable<any> {
    const url = `${apiUrl}/run`;
    return this.http.put(url, { ...req, date: date }).pipe(
      tap(_ => ghostLog(`runJobManually!`)),
      catchError(handleError<any>('runJobManually'))
    );
  }
}
