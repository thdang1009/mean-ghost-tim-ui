import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Post } from '@models/_index';
import { environment } from '@environments/environment';
import { buildQueryString } from '@shares/common';

const apiUrl = environment.apiUrl + '/v1/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // lấy hết list post cho khách, nếu là admin thì thấy bài viết ẩn của bản thân
  getPublicPosts(req?): Observable<Post[]> {
    const hasKeys = !!Object.keys(req).length;
    const queryString = hasKeys && ('?' + buildQueryString(req)) || '';
    const url = `${apiUrl}/public${req && queryString || ''}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched public post`)),
      catchError(this.handleError<Post>(`getPublicPost`))
    );
  }

  // khách xem post
  getPost(ref: String): Observable<Post> {
    const url = `${apiUrl}/ref/${ref}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched post by ref=${ref}`)),
      catchError(this.handleError<Post>(`getPost ref=${ref}`))
    );
  }

  // admin xem và edit post
  getPostAsAdmin(id: any): Observable<Post> {
    const url = `${apiUrl}/get-as-member/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched post by id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  // lấy danh sách tất cả post
  getAllPost(req): Observable<Post> {
    const queryString = buildQueryString(req);
    const url = `${apiUrl}?${queryString}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched my post`)),
      catchError(this.handleError<Post>(`getAllPost`))
    );
  }

  // lấy danh sách post tôi có thể xem được
  // getMyPost(req): Observable<Post> {
  //   const queryString = buildQueryString(req);
  //   const url = `${apiUrl}/my-post?${queryString}`;
  //   return this.http.get<Post>(url).pipe(
  //     tap(_ => this.log(`fetched my post`)),
  //     catchError(this.handleError<Post>(`getMyPost`))
  //   );
  // }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(apiUrl, post).pipe(
      tap((prod: Post) => this.log(`added post id=${post.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  clapPost(post: Post, num: Number): Observable<Post> {
    return this.http.put<Post>(`${apiUrl}/clap-post/${post.id}`, { numIncrease: num })
      .pipe(
        tap((prod: Post) => this.log(`clap post id=${post.id}`)),
        catchError(this.handleError<Post>('clap post'))
      );
  }

  updatePost(id: any, post: Post): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, post).pipe(
      tap(_ => this.log(`updated post id=${id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }

  deletePost(id: any): Observable<Post> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Post>(url).pipe(
      tap(_ => this.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
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
