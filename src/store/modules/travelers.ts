import { getAll } from '@/services/travelersManager';
import type { ActionContext } from 'vuex';
import type { Traveler } from '@/models/Traveler';


export interface InitialState {
  items: Traveler[]
}

// initial state
const initialState = {
  items: [],
};

const state = (): InitialState => (initialState)

// actions
const actions = {
  async fetchTravelers({ commit }: ActionContext<InitialState, any>, page: number) {
    const travelers= await getAll(page);
    commit('setTravelers', travelers);
  }
}

// mutations
const mutations = {
  setTravelers(state: InitialState, travelers: Traveler[]) {
    state.items = travelers;
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
