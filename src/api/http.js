import store from '@/store'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://test.matchlink.shop'
})

instance.interceptors.response.use(async (config) => {
  const token = localStorage.getItem('token')
  const refreshtoken = localStorage.getItem('refreshtoken')
  if (token) {
    const now = new Date().getTime()
    const expdate = localStorage.getItem('expdate')
    if (now > expdate) {
      const headers = {
        Authorization: `Bearer ${token}`
      }
      const data = {
        grantType: 'Bearer',
        acessToken: token,
        refreshToken: refreshtoken,
        accessTokenExpiresln: expdate
      }
      try {
        const response = await instance.post('/reissue', data, { headers })
        alert('토큰이 재발행되었습니다.')
        store.commit('doLogin', response.data)
      } catch (error) {
        alert('예기치 못한 이유로 토큰 재발행에 실패했습니다.')
        console.log(error)
      }
    }
  }
  return config
})

export default instance
