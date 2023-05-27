import axios from 'axios'
import store from '@/store'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use((config) => {
  const token = localStorage.getItem('token')
  const refreshtoken = localStorage.getItem('refreshtoken')
  if (token) {
    const now = new Date()
    const expdate = store.state.expdate
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
      console.log(data)
      instance.post('/reissue', data, { headers })
        .then(response => {
          alert('토큰이 재발행되었습니다.')
          store.commit('doLogin', response.data)
          console.log(response.data)
        })
        .catch(error => {
          alert('예기치 못한 이유로 토큰 재발행에 실패했습니다.')
          console.log(error)
        })
    }
  }
})

export default instance
