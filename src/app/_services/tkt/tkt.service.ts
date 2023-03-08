import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ghostLog, handleError } from '@app/_shares/common';

const apiUrl = environment.apiUrl + '/v1/tkt';

@Injectable({
  providedIn: 'root'
})
export class TKTService {

  constructor(private http: HttpClient) { }

  runTKTManually(req): Observable<any> {
    const url = `${apiUrl}/run`;
    return this.http.put(url, { ...req }).pipe(
      tap(_ => ghostLog(`runTKTManually!`)),
      catchError(handleError<any>('runTKTManually'))
    );
  }
}
