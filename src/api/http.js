import store from '@/store'
import router from '@/router'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://13.124.173.243:8080'
})

instance.interceptors.response.use(async (config) => {
  const token = localStorage.getItem('token')
  const refreshtoken = localStorage.getItem('refreshtoken')
  if (token) {
    const now = new Date().getTime()
    const expdate = localStorage.getItem('expdate')
    console.log(now, expdate)
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
        console.log(response.data)
      } catch (error) {
        alert('예기치 못한 이유로 토큰 재발행에 실패했습니다.')
        console.log(error)
      }
    }
  } else {
    const allowedPaths = ['/LoginCheck', '/', '/Register', '/Email-verify', '/password_find']
    const currentPath = router.currentRoute.value.path
    if (!allowedPaths.includes(currentPath)) {
      // 현재 경로가 허용된 경로가 아닌 경우
      router.push('/main') // 메인 페이지로 리다이렉트
    }
  }
  return config
})

export default instance
