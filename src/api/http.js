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
    } else {
      return Promise.reject(error)
    }
  }
})

export default instance
