import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      token: null,
      bearer: null,
      refreshToken: null,
      expdate: null
    }
  },
  mutations: {
    doLogin (state, userdata) {
      store.commit('setToken', userdata.accessToken)
      state.refreshToken = userdata.refreshToken
      localStorage.setItem('refreshtoken', state.refreshToken)
      state.expdate = userdata.accessTokenExpiresln
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    logout (state) {
      state.token = null
      localStorage.removeItem('token')
    }
  },
  actions: {},
  getters: {
    getToken (state) {
      return state.token
    }
  }
})

const savedToken = localStorage.getItem('token')
if (savedToken !== null) {
  store.commit('setToken', savedToken)
}

export default store
