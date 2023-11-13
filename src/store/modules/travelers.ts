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

const getters = {
  getById: (state: InitialState) => (travelerId: number) => {
    state.items.find(({ id }) => id === travelerId);
  }
}

// actions
const actions = {
  async fetchTravelers({ state, commit }: ActionContext<InitialState, any>, page: number) {
    if (state.items.length > 1) {
      return;
    }

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
  getters,
  actions,
  mutations,
}
