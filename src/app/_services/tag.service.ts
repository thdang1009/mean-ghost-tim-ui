import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tag } from '@models/_index';
import { environment } from '@environments/environment';
import { buildQueryString } from '@shares/common';

const apiUrl = environment.apiUrl + '/api/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
    const url = `${apiUrl}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched tag`)),
      catchError(this.handleError<Tag>(`getTag`))
    );
  }

  getTag(id: any): Observable<Tag> {
    const url = `${apiUrl}/id/${id}`;
    return this.http.get<Tag>(url).pipe(
      tap(_ => this.log(`fetched tag by id=${id}`)),
      catchError(this.handleError<Tag>(`getTag id=${id}`))
    );
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(apiUrl, tag).pipe(
      tap((prod: Tag) => this.log(`added tag id=${tag.id}`)),
      catchError(this.handleError<Tag>('addTag'))
    );
  }

  updateTag(id: any, tag: Tag): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, tag).pipe(
      tap(_ => this.log(`updated tag id=${id}`)),
      catchError(this.handleError<any>('updateTag'))
    );
  }

  deleteTag(id: any): Observable<Tag> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Tag>(url).pipe(
      tap(_ => this.log(`deleted tag id=${id}`)),
      catchError(this.handleError<Tag>('deleteTag'))
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