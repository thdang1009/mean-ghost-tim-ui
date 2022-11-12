import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { MyFile } from '@models/_index';
import { buildQueryString } from '@app/_shares/common';
import { CONSTANT } from '@app/_shares/constant';

const apiUrl = environment.apiUrl + '/v1/file';

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

  getMyFile(req = {}): Observable<MyFile[]> {
    const queryString = buildQueryString(req);
    const url = `${apiUrl}/my-file?${queryString}`;
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

  uploadFile(formData): Observable<MyFile> {
    return this.http.post<MyFile>(apiUrl + '/upload', formData).pipe(
      tap((prod: MyFile) => console.log(`upload file`)),
      catchError(this.handleError<MyFile>('upload file'))
    );
  }

  createObservableUploadFile(formData, callbackReset = () => { }): Observable<HttpEvent<Object>> {
    const upload$ = this.http.post(apiUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      finalize(callbackReset)
    );
    return upload$;
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
