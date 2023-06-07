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
    clearstate (state) {
      state.token = null
      state.bearer = null
      state.refreshToken = null
      state.expdate = null
    },
    setToken (state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    logout () {
      store.commit('clearstate')
      localStorage.clear()
    }
  },
  actions: {
    doLogin (state, userdata) {
      store.commit('setToken', userdata.accessToken)
      state.refreshToken = userdata.refreshToken
      localStorage.setItem('refreshtoken', state.refreshToken)
      state.expdate = userdata.accessTokenExpiresIn
      localStorage.setItem('expdate', state.expdate)
    }
  },
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
