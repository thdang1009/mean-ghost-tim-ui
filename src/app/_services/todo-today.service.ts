import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TodoToday } from '@app/_models/todo-today';
import { environment } from '@environments/environment';
import { buildQueryString } from '@app/_shares/common';

const apiUrl = environment.apiUrl + '/api/todotoday/';

@Injectable({
  providedIn: 'root'
})
export class TodoTodayService {

  constructor(private http: HttpClient) { }

  getTodoTodays(): Observable<TodoToday[]> {
    return this.http.get<TodoToday[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Todo Todays')),
        catchError(this.handleError('getTodoTodays', []))
      );
  }

  getTodoToday(id: any): Observable<TodoToday> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<TodoToday>(url).pipe(
      tap(_ => console.log(`fetched tdtd by id=${id}`)),
      catchError(this.handleError<TodoToday>(`getTodoToday id=${id}`))
    );
  }

  getMyTodoToday(req): Observable<TodoToday> {
    const queryString = buildQueryString(req);
    const url = `${apiUrl}/my-tdtd/${queryString}`;
    return this.http.get<TodoToday>(url).pipe(
      tap(_ => console.log(`fetched my tdtd`)),
      catchError(this.handleError<TodoToday>(`getMyTodoToday`))
    );
  }

  addTodoToday(tdtd: TodoToday): Observable<TodoToday> {
    return this.http.post<TodoToday>(apiUrl, tdtd).pipe(
      tap((prod: TodoToday) => console.log(`added tdtd id=${tdtd.id}`)),
      catchError(this.handleError<TodoToday>('addTodoToday'))
    );
  }

  updateTodoToday(id: any, tdtd: TodoToday): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, tdtd).pipe(
      tap(_ => console.log(`updated tdtd id=${id}`)),
      catchError(this.handleError<any>('updateTodoToday'))
    );
  }

  deleteTodoToday(id: any): Observable<TodoToday> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<TodoToday>(url).pipe(
      tap(_ => console.log(`deleted tdtd id=${id}`)),
      catchError(this.handleError<TodoToday>('deleteTodoToday'))
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
