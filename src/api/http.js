import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.request.use(
  function (config) {
    const expdate = localStorage.getItem('expdate')
    if (expdate) {
      const now = Date.now()
      if (expdate < now) {
        alert('토큰이 만료되었습니다.')
        alert('다시 로그인해주세요')
        store.commit('logout')
        this.$router.push('/')
      }
    }
    return config
  },
  (error) => {
    console.log(error)
  }
)

export default instance
