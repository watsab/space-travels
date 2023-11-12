import { createStore, createLogger } from 'vuex';
import pilots, { type InitialState as PilotInitialState } from '@/store/modules/pilots';

const debug = process.env.NODE_ENV !== 'production'

export interface State {
  pilots: PilotInitialState;
}

export default createStore<State>({
  modules: {
    pilots,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
