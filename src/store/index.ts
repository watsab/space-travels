import { createStore, createLogger, Store, useStore as baseUseStore } from 'vuex';
import pilots, { type InitialState as PilotInitialState } from '@/store/modules/pilots';
import travelers, { type InitialState as TravelersInitialState } from '@/store/modules/travelers';
import ships, { type InitialState as ShipsInitialState } from '@/store/modules/ships';
import app, { type InitialState as AppInitialState } from '@/store/modules/app';
import auth, { type InitialState as AuthInitialState } from '@/store/modules/auth';
import type { InjectionKey } from 'vue';

const debug = process.env.NODE_ENV !== 'production'

export interface State {
  app: AppInitialState,
  pilots: PilotInitialState;
  travelers: TravelersInitialState;
  ships: ShipsInitialState;
  auth: AuthInitialState;
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store= createStore<State>({
  modules: {
    app,
    pilots,
    travelers,
    ships,
    auth
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function useStore () {
  return baseUseStore(key)
}
