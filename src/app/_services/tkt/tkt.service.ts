import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ghostLog, handleError } from '@shares/common';
import { CONSTANT } from '@shares/constant';

const apiUrl = environment.apiUrl + '/v1/tkt';

@Injectable({
  providedIn: 'root'
})
export class TKTService {

  constructor(private http: HttpClient) { }

  runTKTManually(data, list): Observable<any> {
    const url = `${apiUrl}/run`;
    const socketId = localStorage.getItem(CONSTANT.SOCKET_ID);;
    return this.http.put(url, { clientId: socketId, ...data, list: list }).pipe(
      tap(_ => ghostLog(`runTKTManually!`)),
      catchError(handleError<any>('runTKTManually'))
    );
  }
  runCancel(): Observable<any> {
    const url = `${apiUrl}/cancel`;
    const socketId = localStorage.getItem(CONSTANT.SOCKET_ID);;
    return this.http.put(url, { clientId: socketId }).pipe(
      tap(_ => ghostLog(`runCancel!`)),
      catchError(handleError<any>('runCancel'))
    );
  }
}
