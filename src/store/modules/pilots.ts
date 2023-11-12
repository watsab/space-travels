import { getAll } from '@/services/pilotsManager';
import type { Pilot } from '@/models/Pilot';
import type { ActionContext } from 'vuex';


export interface InitialState {
  items: Pilot[]
}

// initial state
const initialState = {
  items: [],
};

const state = (): InitialState => (initialState)

// actions
const actions = {
  fetchPilots({ commit }: ActionContext<InitialState, any>) {
    const pilots = getAll();
    commit('setPilots', pilots);
  }
}

// mutations
const mutations = {
  setPilots(state: InitialState, pilots: Pilot[]) {
    state.items = pilots;
  },
  addPilot(state: InitialState, pilot: Pilot) {
    state.items.push(pilot);
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
