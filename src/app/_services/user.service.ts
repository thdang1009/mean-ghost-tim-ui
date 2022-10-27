import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { GuestMessage, User } from '@models/_index';

const apiUrl = environment.apiUrl + '/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cacheUser: any = [];
  loggedInStatus = false;
  redirectUrl: string;


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(apiUrl)
      .pipe(
        tap(_ => {
          this.log('fetched Users');
        }),
        catchError(this.handleError('getUser', []))
      );
  }

  getUser(id: any): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => console.log(`fetched user by id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  addUser(tdtd: User): Observable<User> {
    return this.http.post<User>(apiUrl, tdtd).pipe(
      tap((prod: User) => console.log(`added user id=${tdtd.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  updateUser(id: any, tdtd: User): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, tdtd).pipe(
      tap(_ => console.log(`updated tdtd id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id: any): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<User>(url).pipe(
      tap(_ => console.log(`deleted tdtd id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  sendGuestMessage(message: any): Observable<GuestMessage> {
    return this.http.post<GuestMessage>(apiUrl + '/guest-message', message).pipe(
      tap((_message: GuestMessage) => console.log(`add guest message= ${_message.id}`)),
      catchError(this.handleError<GuestMessage>('add guest message'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private initCacheUser() {
    this.getUsers().subscribe(users => {
      this.cacheUser = users;
    });
  }

  mapUserName(id) {
    if (!this.cacheUser || this.cacheUser.length === 0) {
      this.initCacheUser();
    }
    const get = (this.cacheUser.filter(user => user.id === id)[0] || {});
    return get.fullName || '';
  }

  private log(message: string) {
    console.log(message);
  }
}
