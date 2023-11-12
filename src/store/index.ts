import { createStore, createLogger } from 'vuex';
import pilots, { type InitialState as PilotInitialState } from '@/store/modules/pilots';
import travelers, { type InitialState as TravelersInitialState } from '@/store/modules/travelers';

const debug = process.env.NODE_ENV !== 'production'

export interface State {
  pilots: PilotInitialState;
  travelers: TravelersInitialState
}

export default createStore<State>({
  modules: {
    pilots,
    travelers
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
