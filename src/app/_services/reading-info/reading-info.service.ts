import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { ReadingInfo } from '@models/_index';
import { ghostLog, handleError, showNoti } from '@app/_shares/common';
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


  getReadingInfo() {
    this._getReadingInfo()
      .subscribe((res: ReadingInfo) => {
        const jsonObject = res.info;
        Object.entries(jsonObject).forEach(([key, value]) => {
          if (key.includes(PDF_OBJ))
            localStorage.setItem(key, value);
        });
      }, err => {
        showNoti(`Error when get Reading Info: ${err}`, 'danger');
      });
  }

  updateReadingInfo() {
    const newReadingInfo = new ReadingInfo();
    const jsonObject = localStorage;
    Object.entries(jsonObject).forEach(([key, value]) => {
      if (key.includes(PDF_OBJ))
        newReadingInfo[key] = value;
    });
    alert(newReadingInfo);
    this._updateReadingInfo(newReadingInfo)
      .subscribe((_: ReadingInfo) => {

      }, err => {
        showNoti(`Error when update Reading Info: ${err}`, 'danger');
      });
  }

  private _getReadingInfo(): Observable<ReadingInfo> {
    const url = `${apiUrl}`;
    return this.http.get<ReadingInfo>(url).pipe(
      tap(_ => ghostLog(`fetched myReadingInfo`)),
      catchError(handleError<ReadingInfo>(`getMyReadingInfo`))
    );
  }

  private _updateReadingInfo(readingInfo: ReadingInfo): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.put(url, readingInfo).pipe(
      tap(_ => ghostLog(`updated myReadingInfo`)),
      catchError(handleError<any>('updateBook'))
    );
  }
}
