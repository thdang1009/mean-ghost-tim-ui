import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ghostLog, handleError } from '@app/_shares/common';

const apiUrl = environment.apiUrl + '/v1/system';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient) { }

  restartServer(): Observable<any> {
    const url = `${apiUrl}/restart`;
    return this.http.put(url, {}).pipe(
      tap(_ => ghostLog(` Server restarted!`)),
      catchError(handleError<any>('restartServer'))
    );
  }
}
