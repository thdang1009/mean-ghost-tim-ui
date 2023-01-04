import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ReadingInfo } from '@models/_index';
import { ghostLog, handleError } from '@app/_shares/common';
import { PDF_OBJ } from '@app/_shares/constant';

const apiUrl = environment.apiUrl + '/v1/reading-info';

@Injectable({
  providedIn: 'root'
})
export class ReadingInfoService {

  readingInfoInfo: any = {};
  loggedInStatus = false;
  redirectUrl: string;

  constructor(private http: HttpClient) { }


  getMyReadingInfo(): Observable<ReadingInfo> {
    const url = `${apiUrl}`;
    return this.http.get<ReadingInfo>(url).pipe(
      tap(_ => ghostLog(`fetched myReadingInfo`)),
      catchError(handleError<ReadingInfo>(`getMyReadingInfo`))
    );
  }

  updateReadingInfo(readingInfo: ReadingInfo): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.put(url, readingInfo).pipe(
      tap(_ => ghostLog(`updated myReadingInfo`)),
      catchError(handleError<any>('updateBook'))
    );
  }


}

export function makeReadingInfoFromLocalStorage() {
  const rawInfo = Object.entries(localStorage).filter(([key, _]) => key.includes(PDF_OBJ));

  
}
