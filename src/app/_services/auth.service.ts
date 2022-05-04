import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANT } from '@shares/constant';
import { LoginResponse } from '@shares/common';

const apiUrl = environment.apiUrl + '/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  userInfo: any = {};
  loggedInStatus = false;
  redirectUrl: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.loggedInStatus = this.isLogin();
    if (this.loggedInStatus) {
      this.userInfo = JSON.parse(localStorage.getItem(CONSTANT.USER_INFO));
    }
  }

  isLogin() {
    return !!localStorage.getItem(CONSTANT.USER_INFO);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'login', data)
      .pipe(
        tap((resp: LoginResponse) => {
          this.loggedInStatus = true;
          this.userInfo = resp.data;
          this.isLoggedIn.emit(true);
          this.saveUserLoginInfo(resp.data);
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        }),
        catchError(this.handleError('login', []))
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(apiUrl + 'logout', {})
      .pipe(
        tap(_ => {
          this.isLoggedIn.emit(false);
          this.loggedInStatus = false;
          this.clearUserInfo();
          setTimeout(_ => {
            this.router.navigate(['/']);
          }, 1000);
        }),
        catchError(this.handleError('logout', []))
      );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + 'register', data)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }

  confirmEmail(code) {
    return this.http.get<any>(apiUrl + `confirm/${code}`)
    .pipe(
      tap(_ => this.log('confirm email')),
      catchError(this.handleError('confirm email', []))
    );
  }

  getUserInfo() {
    return this.userInfo;
  }

  isGrandAdmin() {
    const arr = [CONSTANT.PERMISSION.GRAND_ADMIN];
    return this.userInfo && arr.includes(this.userInfo.permission);
  }

  isAdmin() {
    const arr = [CONSTANT.PERMISSION.GRAND_ADMIN, CONSTANT.PERMISSION.ADMIN];
    console.log('permission=', this.userInfo.permission);
    return this.userInfo && arr.includes(this.userInfo.permission);
  }

  isMember() {
    const arr = [CONSTANT.PERMISSION.GRAND_ADMIN, CONSTANT.PERMISSION.ADMIN, CONSTANT.PERMISSION.MEMBER];
    return this.userInfo && arr.includes(this.userInfo.permission);
  }

  isGuest() {
    return true;
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

  private saveUserLoginInfo(userInfo) {
    localStorage.setItem(CONSTANT.USER_INFO, JSON.stringify(userInfo));
  }
  private clearUserInfo() {
    localStorage.removeItem(CONSTANT.USER_INFO);
    localStorage.removeItem(CONSTANT.TOKEN);
  }
}
