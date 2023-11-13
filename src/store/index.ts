import { createStore, createLogger, Store, useStore as baseUseStore } from 'vuex';
import pilots, { type InitialState as PilotInitialState } from '@/store/modules/pilots';
import travelers, { type InitialState as TravelersInitialState } from '@/store/modules/travelers';
import ships, { type InitialState as ShipsInitialState } from '@/store/modules/ships';
import type { InjectionKey } from 'vue';

const debug = process.env.NODE_ENV !== 'production'

export interface State {
  pilots: PilotInitialState;
  travelers: TravelersInitialState;
  ships: ShipsInitialState;
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store= createStore<State>({
  modules: {
    pilots,
    travelers,
    ships
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export function useStore () {
  return baseUseStore(key)
}
