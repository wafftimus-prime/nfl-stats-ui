import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, Observable, of, switchMap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);

  constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set api_key(token: string) {
    localStorage.setItem('nfl-api-key', token);
  }

  get api_key(): string {
    return localStorage.getItem('nfl-api-key') ?? '';
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  async verifyAPIKey(api_key: string) {
    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      if (response.status === 200) {
        this._authenticated = true;

      }
      console.log(response.status); // --> used to check if valid key, if not 200 then not a valid key.
      // const result = await response.text();
      // console.log(result);
    } catch (error) {
      console.error(error);
    }

  }

  /**
   * In order to simulate signing in we will fetch the nfl teams data.
   *
   * @param credentials
   */
  signIn(api_key: string): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('API Key has already been validated!');
    }




    const url = 'https://tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com/getNFLTeams';

    return this._httpClient.get(url, {
      headers: {
        'x-rapidapi-key': api_key,
        'x-rapidapi-host': 'tank01-nfl-live-in-game-real-time-statistics-nfl.p.rapidapi.com'
      }
    }).pipe(
      switchMap((response: any) => {
        console.log(response)

        // Store the access token in the local storage
        this.api_key = api_key;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        // this._userService.user = response.user;

        // Return a new observable with the response
        return of(response);
      })
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    this._authenticated = false
    localStorage.removeItem('nfl-api-key');

    return of(true);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    return from(this.currentAuthenticatedUser());
  }

  async currentAuthenticatedUser(): Promise<boolean> {
    try {
      if (!!this.api_key) {
        this._authenticated = true;
        return true;
      } else {
        this._authenticated = false;
        return false;
      }
    } catch (err: any) {
      console.log(JSON.stringify(err));
      return false;
    }
  }

}
