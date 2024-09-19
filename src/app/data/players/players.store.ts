import { inject } from '@angular/core';
import { patchState, signalStore, type, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { NflPlayerModel } from './players.model';
import { PlayersService } from './players.service';

interface PlayersState {
  selected_player: any,
  loaded: boolean,
};

const initialState: PlayersState = {
  selected_player: null,
  loaded: false,
};

export const PlayersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withEntities({ entity: type<NflPlayerModel>(), collection: 'players' }),
  withMethods((store: any) => {
    const playerService = inject(PlayersService);

    return {
      getPlayers(): NflPlayerModel[] {
        return Object.values(store.playersEntityMap())
      },

      async loadPlayers(api_key: string) {
        const players = await playerService.getNflPlayers(api_key)

        console.log("players")

        const entities: any = setAllEntities(<any>players, { collection: 'players' })
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
