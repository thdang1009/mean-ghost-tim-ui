import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TodoLabel } from '@models/_index';
import { environment } from '@environments/environment';
import { ghostLog, handleError } from '@app/_shares/common';

const apiUrl = environment.apiUrl + '/v1/todo-label';

@Injectable({
  providedIn: 'root'
})
export class TodoLabelService {

  constructor(private http: HttpClient) { }

  getTodoLabels(name?): Observable<TodoLabel[]> {
    const url = `${apiUrl}` + (name ? `?name=${name}` : '');
    return this.http.get<any>(url).pipe(
      tap(_ => ghostLog(`fetched todoLabel`)),
      catchError(handleError<TodoLabel>(`getTodoLabel`))
    );
  }

  getTodoLabel(id: any): Observable<TodoLabel> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<TodoLabel>(url).pipe(
      tap(_ => ghostLog(`fetched todoLabel by id=${id}`),),
      catchError(handleError<TodoLabel>(`getTodoLabel id=${id}`))
    );
  }

  createTodoLabelWithName(name): Observable<any> {
    const newItem: TodoLabel = {
      name: name,
      description: null,
      imgUrl: null,
      autoDetectKeywords: null
    }
    return this.addTodoLabel.call(this, newItem);
  }

  addTodoLabel(todoLabel: TodoLabel): Observable<TodoLabel> {
    ghostLog(todoLabel);
    return this.http.post<TodoLabel>(apiUrl, todoLabel).pipe(
      tap((prod: TodoLabel) => ghostLog(`added todoLabel id=${prod.id}`)),
      catchError(handleError<TodoLabel>('addTodoLabel'))
    );
  }

  updateTodoLabel(id: any, todoLabel: TodoLabel): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, todoLabel).pipe(
      tap(_ => ghostLog(`updated todoLabel id=${id}`)),
      catchError(handleError<any>('updateTodoLabel'))
    );
  }

  deleteTodoLabel(id: any): Observable<TodoLabel> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<TodoLabel>(url).pipe(
      tap(_ => ghostLog(`deleted todoLabel id=${id}`)),
      catchError(handleError<TodoLabel>('deleteTodoLabel'))
    );
  }

}
