import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { UserReadingInfo, Book } from '@models/_index';

const apiUrl = environment.apiUrl + '/api/user';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  userInfo: any = {};
  loggedInStatus = false;
  redirectUrl: string;


  constructor(private http: HttpClient) { }

  getMyBookReadingInfo(): Observable<UserReadingInfo> {
    const url = `${apiUrl}`;
    return this.http.get<UserReadingInfo>(url).pipe(
      tap(_ => console.log(`fetched myBookReadingInfo`)),
      catchError(this.handleError<UserReadingInfo>(`getMyBookReadingInfo with my ID`))
    );
  }

  updateUserReadingInfo(id: any, jsonString: UserReadingInfo): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, jsonString).pipe(
      tap(_ => console.log(`updated myBookReadingInfo`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }


  getMyBooks(id): Observable<Book> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      tap(_ => console.log(`fetched user by id=${id}`)),
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  addBook(tdtd: Book): Observable<Book> {
    return this.http.post<Book>(apiUrl, tdtd).pipe(
      tap((prod: Book) => console.log(`added user id=${tdtd.id}`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook(id: any, tdtd: Book): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, tdtd).pipe(
      tap(_ => console.log(`updated tdtd id=${id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  deleteBook(id: any): Observable<Book> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Book>(url).pipe(
      tap(_ => console.log(`deleted tdtd id=${id}`)),
      catchError(this.handleError<Book>('deleteBook'))
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
