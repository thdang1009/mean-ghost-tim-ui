import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { BookReadingInfo, Book } from '@models/_index';

const apiUrl = environment.apiUrl + '/v1/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookInfo: any = {};
  loggedInStatus = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  getMyBookReadingInfo(): Observable<BookReadingInfo> {
    const url = `${apiUrl}/reading-info`;
    return this.http.get<BookReadingInfo>(url).pipe(
      tap(_ => console.log(`fetched myBookReadingInfo`)),
      catchError(this.handleError<BookReadingInfo>(`getMyBookReadingInfo with my ID`))
    );
  }

  updatebookReadingInfo(id: any, jsonString: BookReadingInfo): Observable<any> {
    const url = `${apiUrl}/reading-info/${id}`;
    return this.http.put(url, jsonString).pipe(
      tap(_ => console.log(`updated myBookReadingInfo`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }
  getBook(id): Observable<Book[]> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log(`fetched my book`)),
      catchError(this.handleError<Book[]>(`getMyBook`))
    );
  }

  getBooks(): Observable<Book[]> {
    const url = `${apiUrl}`;
    return this.http.get<Book[]>(url).pipe(
      tap(_ => console.log(`fetched my book`)),
      catchError(this.handleError<Book[]>(`getMyBook`))
    );
  }

  addBook(item: Book): Observable<Book> {
    return this.http.post<Book>(apiUrl, item).pipe(
      tap((prod: Book) => console.log(`added book`)),
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook(id: any, item: Book): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, item).pipe(
      tap(_ => console.log(`updated item id=${id}`)),
      catchError(this.handleError<any>('updateBook'))
    );
  }

  deleteBook(id: any): Observable<Book> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Book>(url).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
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
