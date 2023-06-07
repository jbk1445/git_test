import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use(async (config) => {
  return config
},
async (error) => {
  if (error.response.status === 401 || error.response.status == null) {
    const excludedUrls = ['/login', '/join', '/email', '/password_change']
    const requestUrl = error.config.url
    if (excludedUrls.includes(requestUrl)) {
      return Promise.reject(new Error('error'))
    }
    alert('토큰 재발행에 실패했습니다.')
    alert('다시 로그인해주세요')
    store.commit('logout')
    this.router.push('/')
  }
})

export default instance
