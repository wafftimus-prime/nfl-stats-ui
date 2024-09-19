import { inject } from '@angular/core';
import { patchState, signalStore, type, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { NflTeamModel } from './teams.model';
import { TeamsService } from './teams.service';

interface TeamsState {
  selected_team: any,
  loaded: boolean,
};

const initialState: TeamsState = {
  selected_team: null,
  loaded: false,
};

export const TeamsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities({ entity: type<NflTeamModel>(), collection: 'teams' }),
  withMethods((store: any) => {
    const teamService = inject(TeamsService);

    return {
      getTeams(): NflTeamModel[] {
        return Object.values(store.teamsEntityMap())
      },

      async loadTeams(api_key: string) {
        const teams = await teamService.getNflTeams(api_key)

        console.log("teams")

        const entities: any = setAllEntities(<any>teams, { collection: 'teams' })
        patchState(
          store,
          {
            ...entities(),
            loaded: true
          }
        );
      },

      selectUser(user: string) {
        patchState(store, { selected_user: user })
      },

      clearUserSelection() {
        patchState(store, { selected_user: null })
      },
    };
  }),
);
