import { inject, Injectable } from '@angular/core';
import moment from 'moment';
import { BehaviorSubject, filter, firstValueFrom, map, Subscription } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { NflApiService } from '../services/nfl-api.service';
import { createUUID, isNullOrUndefined } from '../utils';
import { NflTeamModel } from './teams.model';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  dbTable = '';
  storage_type: 'local' | 'aws' = 'local'

  lss = inject(LocalStorageService)
  nfl_api = inject(NflApiService)

  constructor() {
    // super([S3Client, AthenaClient, PinpointEmailClient, DynamoDBClient], config);
    // this.lss.setData('nfl-teams', { last_update: null, data: [] })
  }

  async getNflTeams(api_key: string) {
    switch (this.storage_type) {
      case 'aws': return null
        break;
      case 'local': {
        const teams$: BehaviorSubject<any> = new BehaviorSubject(null)

        const teams: any = this.lss.getDatabase('nfl-teams')

        console.log(teams)

        if (!teams.data || !teams.data.length) {
          const response = await firstValueFrom(this.nfl_api.fetchTeams(api_key))
          teams.data = response.body.map((i: NflTeamModel) => {
            i.id = createUUID()
            return i
          });
          teams.last_update = moment().toISOString();
          this.lss.databases['nfl-teams'].next(teams)
        }

        teams$.next(teams.data)

        return new Promise((resolve, reject) => {
          let sub!: Subscription
          sub = teams$
            .pipe(
              map(s => {
                if (isNullOrUndefined(s)) return teams
                else return s
              }),
              filter(s => !isNullOrUndefined(s))
            )
            .subscribe({
              next: (team) => {
                resolve(team); // Resolve the promise with the value from the BehaviorSubject
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
