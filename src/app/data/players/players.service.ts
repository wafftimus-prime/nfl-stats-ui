import { inject, Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, filter, firstValueFrom, map, Subscription } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { NflApiService } from '../services/nfl-api.service';
import { createUUID, isNullOrUndefined } from '../utils';
import { NflPlayerModel } from './players.model';

@Injectable({ providedIn: 'root' })
export class PlayersService {
  dbTable = '';
  storage_type: 'local' | 'aws' = 'local'

  lss = inject(LocalStorageService)
  nfl_api = inject(NflApiService)

  constructor() {
    // super([S3Client, AthenaClient, PinpointEmailClient, DynamoDBClient], config);
    // this.lss.setData('nfl-players', { last_update: null, data: [] })
  }

  async getNflPlayers(api_key: string) {
    switch (this.storage_type) {
      case 'aws': return null
        break;
      case 'local': {
        const players$: BehaviorSubject<any> = new BehaviorSubject(null)

        const players: any = this.lss.getDatabase('nfl-players')

        console.log(players)

        if (!players.data || !players.data.length) {
          const response = await firstValueFrom(this.nfl_api.fetchPlayerList(api_key))
          players.data = response.body.map((i: NflPlayerModel) => {
            i.id = createUUID()
            return i
          });
          players.last_update = moment().toISOString();
          this.lss.databases['nfl-players'].next(players)
        }

        players$.next(players.data)

        return new Promise((resolve, reject) => {
          let sub!: Subscription
          sub = players$
            .pipe(
              map(s => {
                if (isNullOrUndefined(s)) return players
                else return s
              }),
              filter(s => !isNullOrUndefined(s))
            )
            .subscribe({
              next: (player) => {
                resolve(player); // Resolve the promise with the value from the BehaviorSubject
                sub?.unsubscribe(); // Unsubscribe to prevent memory leaks
              },
              error: (error) => {
                reject(error); // Reject the promise if there's an error
              }
            });
        });
      }
      default: return null
    }
  }
}
