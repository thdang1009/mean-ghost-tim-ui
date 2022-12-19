import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tag } from '@models/_index';
import { environment } from '@environments/environment';

const apiUrl = environment.apiUrl + '/v1/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(name?): Observable<Tag[]> {
    const url = `${apiUrl}` + (name ? `?name=${name}` : '');
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched tag`)),
      catchError(this.handleError<Tag>(`getTag`))
    );
  }

  getTag(id: any): Observable<Tag> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Tag>(url).pipe(
      tap(_ => this.log(`fetched tag by id=${id}`)),
      catchError(this.handleError<Tag>(`getTag id=${id}`))
    );
  }

  createTagWithName(name): Observable<any> {
    const newItem: Tag = {
      name: name,
      description: null,
      imgUrl: null,
      content: null
    }
    return this.addTag.call(this, newItem);
  }

  addTag(tag: Tag): Observable<Tag> {
    console.log(tag);
    return this.http.post<Tag>(apiUrl, tag).pipe(
      tap((prod: Tag) => this.log(`added tag id=${prod.id}`)),
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
