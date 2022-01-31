import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Toornament } from './toornaments';

@Injectable({
  providedIn: 'root',
})
export class ToornamentService {
  private REST_API_SERVER =
    'https://toornamentapi.azurewebsites.net/api/addTournament';

  constructor(private httpClient: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(): Observable<HttpResponse<Toornament[]>> {
    return this.httpClient
      .get<Toornament[]>(this.REST_API_SERVER, { observe: 'response' })
      .pipe(retry(3), catchError(this.handleError));
  }
}
