import { inject } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService, NflPlayerModel, NflTeamModel, PlayersStore, TeamsStore } from '../data';

export class UiBaseClass {
  auth = inject(AuthService)
  ts = inject(TeamsStore)
  ps = inject(PlayersStore)

  get api_key(): string {
    return this.auth.api_key
  }

  _unsubscribeAll: Subject<any> = new Subject<any>();

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  get teams(): Array<NflTeamModel> {
    return Object.values(this.ts.teamsEntityMap())
  }

  get players(): Array<NflPlayerModel> {
    return Object.values(this.ps.playersEntityMap())
  }

  get free_agents(): Array<NflPlayerModel> {
    return Object.values(this.ps.playersEntityMap())
      .filter(p => p.isFreeAgent === "True")
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
