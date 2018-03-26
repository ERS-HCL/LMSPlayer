import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {catchError, retry} from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class HttphandlerService {

  constructor(private http: HttpClient) {}


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  get(url: string, success, failure) {
    this.http.get(url)
      .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
      ).subscribe(data => {
        console.log('HttphandlerService: get - subscribe - =>', this);
        success(data);
      }, error => {
        failure(error);
      }
      );
  }

  getMultiple(urls: Array<string>, success, failure) {
    const requests = [];
    for (let i = 0; i < urls.length; i++) {
      requests.push(this.http.get(urls[i]));
    }
    Observable.forkJoin(requests).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    ).subscribe(
      data => {
        console.log('HttphandlerService: getMultiple - subscribe - =>', this);
        success(data);
      }, error => {
        failure(error);
      }
      );
  }

}
