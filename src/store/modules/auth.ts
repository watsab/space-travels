import type { ActionContext } from 'vuex';

interface InitialState {
  user: null | {};
}

const initialState = {
  user: null
}

const state = (): InitialState => (initialState)

const mutations = {
  setUserData(state: InitialState, data: {}) {
    state.user = data;
    localStorage.setItem('user', JSON.stringify(data))
  },
  clearUserData(state: InitialState) {
    state.user = null;
    localStorage.removeItem('user')
  }
}

const actions = {
  register: async ({ commit }: ActionContext, credentials: {email: string; password: string}) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    commit('setUserData', await response.json());
  },
  login: async ({ commit }, credentials: {email: string; password: string}) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    commit('setUserData', await response.json());
  },
  logout: ({ commit }) => {
    commit('clearUserData');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
