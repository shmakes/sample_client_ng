import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, takeLast, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Hub as HubModel, HubsClient } from './api.generated.clients';

@Injectable({ providedIn: 'root' })
export class HubService {

  //private apiUrl = 'api/hubs';  // URL to web api
  private apiUrl = 'https://localhost:5001';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET hubs from the server */
  getHubs(): Observable<HubModel[]> {
    let hubs = new HubsClient(this.http, this.apiUrl);
    return hubs.all()
      .pipe(
        tap(_ => this.log('fetched hubs')),
        catchError(this.handleError<HubModel[]>('getHubs', []))
      );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a Hubservice message with the MessageService */
  private log(message: string) {
    this.messageService.add(`Hubservice: ${message}`);
  }
}
