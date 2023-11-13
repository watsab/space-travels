import { getAll } from '@/services/shipsManager';
import type { Ship } from '@/models/Ship';
import type { ActionContext } from 'vuex';

export interface InitialState {
  items: Ship[]
}

// initial state
const initialState = {
  items: [],
};

const state = (): InitialState => (initialState)

// getters
const getters = {
  getAllWithPilots: (state: InitialState) => {
    return state.items.filter(({ pilot }) => pilot);
  },
  getBySlug: (state: InitialState) => (shipSlug: string): Ship | undefined => {
    return state.items.find(({ slug }) => slug === shipSlug);
  }
}

// actions
const actions = {
  fetchShips({ state, commit, dispatch }: ActionContext<InitialState, any>) {
    if (state.items.length > 1) {
      return;
    }

    dispatch('pilots/fetchPilots', null, { root: true });

    const Ships = getAll();
    commit('setShips', Ships);
  }
}

// mutations
const mutations = {
  setShips(state: InitialState, Ships: Ship[]) {
    state.items = Ships;
  },
  addShip(state: InitialState, Ship: Ship) {
    state.items.push(Ship);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
