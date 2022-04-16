import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Meal } from '@models/meal';
import { environment } from '@environments/environment';
import { buildQueryString } from '@shares/common';

const apiUrl = environment.apiUrl + '/api/meal';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  constructor(private http: HttpClient) { }

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Meals')),
        catchError(this.handleError('getMeals', []))
      );
  }

  getMeal(id: any): Observable<Meal> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Meal>(url).pipe(
      tap(_ => console.log(`fetched meal by id=${id}`)),
      catchError(this.handleError<Meal>(`getMeal id=${id}`))
    );
  }

  getMyMeal(req): Observable<Meal> {
    const queryString = buildQueryString(req);
    const url = `${apiUrl}/my-meal?${queryString}`;
    return this.http.get<Meal>(url).pipe(
      tap(_ => console.log(`fetched my meal`)),
      catchError(this.handleError<Meal>(`getMyMeal`))
    );
  }

  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(apiUrl, meal).pipe(
      tap((prod: Meal) => console.log(`added meal id=${meal.id}`)),
      catchError(this.handleError<Meal>('addMeal'))
    );
  }

  updateMeal(id: any, meal: Meal): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, meal).pipe(
      tap(_ => console.log(`updated meal id=${id}`)),
      catchError(this.handleError<any>('updateMeal'))
    );
  }
  
  deleteMeal(id: any): Observable<Meal> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Meal>(url).pipe(
      tap(_ => console.log(`deleted meal id=${id}`)),
      catchError(this.handleError<Meal>('deleteMeal'))
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
