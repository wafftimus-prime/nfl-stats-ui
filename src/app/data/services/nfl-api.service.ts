import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NflApiService {
  private _httpClient = inject(HttpClient);


  fetchTeams(api_key: string): Observable<any> {
    // Throw error, if the user is already logged in
    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams';

    return this._httpClient.get(url, {
      headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
      }
    }).pipe(
      switchMap((response: any) => {
        console.log(response)
        // Return a new observable with the response
        return of(response);
      })
    );
  }

  fetchPlayerList(api_key: string): Observable<any> {
    // Throw error, if the user is already logged in
    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLPlayerList';

    return this._httpClient.get(url, {
      headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
      }
    }).pipe(
      switchMap((response: any) => {
        console.log(response)
        // Return a new observable with the response
        return of(response);
      })
    );
  }




}
