import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { MyFile } from '@models/_index';

const apiUrl = environment.apiUrl + '/api/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getRawFile(urlGet): Observable<File> {
    const url = `${apiUrl}/id/${urlGet}`;
    return this.http.get<File>(url).pipe(
      tap(_ => console.log(`fetched raw file by link`)),
      catchError(this.handleError<File>(`getRawFile`))
    );
  }

  getFile(id): Observable<MyFile[]> {
    const url = `${apiUrl}/id/${id}`;
    return this.http.get<MyFile[]>(url).pipe(
      tap(_ => console.log(`fetched my file`)),
      catchError(this.handleError<MyFile[]>(`getMyFile`))
    );
  }

  getMyFile(): Observable<MyFile[]> {
    const url = `${apiUrl}/my-file`;
    return this.http.get<MyFile[]>(url).pipe(
      tap(_ => console.log(`fetched my file`)),
      catchError(this.handleError<MyFile[]>(`getMyFile`))
    );
  }

  addFile(item: MyFile): Observable<MyFile> {
    return this.http.post<MyFile>(apiUrl, item).pipe(
      tap((prod: MyFile) => console.log(`added file`)),
      catchError(this.handleError<MyFile>('addFile'))
    );
  }

  updateFile(id: any, item: MyFile): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, item).pipe(
      tap(_ => console.log(`updated item id=${id}`)),
      catchError(this.handleError<any>('updateFile'))
    );
  }

  deleteFile(id: any): Observable<MyFile> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<MyFile>(url).pipe(
      tap(_ => console.log(`deleted item id=${id}`)),
      catchError(this.handleError<MyFile>('deleteFile'))
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
