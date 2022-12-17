import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GuestMessage } from '@models/_index';
import { environment } from '@environments/environment';
import { buildQueryString } from '@shares/common';

const apiUrl = environment.apiUrl + '/v1/guest-message';

@Injectable({
  providedIn: 'root'
})
export class GuestMessageService {

  constructor(private http: HttpClient) { }


  getGuestMessage(id: any): Observable<GuestMessage> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<GuestMessage>(url).pipe(
      tap(_ => console.log(`fetched guest-message by id=${id}`)),
      catchError(this.handleError<GuestMessage>(`getGuestMessage id=${id}`))
    );
  }

  getGuestMessages(req): Observable<GuestMessage> {
    const queryString = buildQueryString(req);
    const hasParams = queryString.length;
    const url = `${apiUrl}${hasParams ? ('?' + queryString) : ''}`;
    return this.http.get<GuestMessage>(url).pipe(
      // tap(_ => console.log(`fetched my guest-message`)),
      catchError(this.handleError<GuestMessage>(`getMyGuestMessage`))
    );
  }

  addGuestMessage(guestMessage: GuestMessage): Observable<GuestMessage> {
    return this.http.post<GuestMessage>(apiUrl, guestMessage).pipe(
      tap((prod: GuestMessage) => console.log(`added guest-message id=${guestMessage.id}`)),
      catchError(this.handleError<GuestMessage>('addGuestMessage'))
    );
  }

  updateGuestMessage(id: any, guestMessage: GuestMessage): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, guestMessage).pipe(
      tap(_ => console.log(`updated guest-message id=${id}`)),
      catchError(this.handleError<any>('updateGuestMessage'))
    );
  }

  deleteGuestMessage(id: any): Observable<GuestMessage> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<GuestMessage>(url).pipe(
      tap(_ => console.log(`deleted guest-message id=${id}`)),
      catchError(this.handleError<GuestMessage>('deleteGuestMessage'))
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
