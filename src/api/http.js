import store from '@/store'
import axios from 'axios'
import router from '@/router'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use(async (config) => {
  return config
},
async (error) => {
  if (error.response.status === 401) {
    const token = localStorage.getItem('token')
    const refToken = localStorage.getItem('refreshtoken')
    if (token && refToken) {
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const data = {
        accessToken: token,
        refreshToken: refToken
      }
      console.log(headers, data)
      instance.post('/reissue', data, { headers })
        .then(response => {
          store.commit('doLogin', response.data)
          return Promise.resolve(instance(error.config))
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      alert('토큰 재발행에 실패했습니다. 다시 로그인해주세요')
      store.commit('logout')
      router.push('/LoginCheck')
    }
  }
})

export default instance
