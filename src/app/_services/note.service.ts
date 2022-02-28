import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Note } from '@app/_models/note';
import { environment } from '@environments/environment';
import { buildQueryString } from '@app/_shares/common';

const apiUrl = environment.apiUrl + '/api/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Note')),
        catchError(this.handleError('getNote', []))
      );
  }

  getNote(id: any): Observable<Note> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Note>(url).pipe(
      tap(_ => console.log(`fetched note by id=${id}`)),
      catchError(this.handleError<Note>(`getNote id=${id}`))
    );
  }

  getMyNote(req): Observable<Note> {
    const queryString = buildQueryString(req);
    const url = `${apiUrl}/my-note?${queryString}`;
    return this.http.get<Note>(url).pipe(
      tap(_ => console.log(`fetched my note`)),
      catchError(this.handleError<Note>(`getMyNote`))
    );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(apiUrl, note).pipe(
      tap((prod: Note) => console.log(`added note id=${note.id}`)),
      catchError(this.handleError<Note>('addNote'))
    );
  }

  updateNote(id: any, note: Note): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, note).pipe(
      tap(_ => console.log(`updated note id=${id}`)),
      catchError(this.handleError<any>('updateNote'))
    );
  }

  deleteNote(id: any): Observable<Note> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Note>(url).pipe(
      tap(_ => console.log(`deleted note id=${id}`)),
      catchError(this.handleError<Note>('deleteNote'))
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
