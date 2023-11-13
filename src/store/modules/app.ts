import type { ActionContext } from 'vuex';

export interface InitialState {
  flashMessage: string | null
}

// initial state
const initialState = {
  flashMessage: null
};

const state = (): InitialState => (initialState)

// mutations
const mutations = {
  setFlashMessage(state: InitialState, message: string) {
    state.flashMessage = message;
  },
}

const actions = {
  resetFlashMessage({ commit }: ActionContext<InitialState, any>) {
    commit('setFlashMessage', null);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
