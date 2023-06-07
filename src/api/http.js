import store from '@/store'
import axios from 'axios'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use(async (config) => {
  return config
},
async (error) => {
  const excludedUrls = ['/login', '/join', '/password_change']
  // 401에러 -> 토큰이 무효화됨에따라 토큰 재발급 시도
  if (error.response.status === 401) {
    const token = localStorage.getItem('token')
    const refToken = localStorage.getItem('refreshtoken')
    const requestUrl = error.config.url
    if (excludedUrls.includes(requestUrl)) {
      return Promise.reject(error)
    }
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
        // 401 에러가 아닌 다른 에러는 그대로 에러 출력
    } else {
      return Promise.reject(error)
    }
  }
})

export default instance
