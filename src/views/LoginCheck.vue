<template>
    <div>
        <section>
            <div class= 'form-box'>
                <div class= 'form-value'>
                    <form @submit.prevent="login">
                        <h1> <a href="/" class="logo"><img src="../assets/newlogo2.png" height="100" width="100"></a> 로그인 </h1>
                        <div class="inputbox">
                            <input type="text" id="loginId" v-model="loginId"/>
                            <label for="">이메일</label>
                        </div>
                        <div class="inputbox">
                            <input type="password" id="password" v-model="password">
                            <label for="">비밀번호</label>
                        </div>
                        <div class="forget">
                            <label for=""><input type="checkbox" v-model="rememberMe">기억하기 / </label>
                            <a href="/Password_find"> 비밀번호 찾기</a>
                        </div>
                        <button type="submit">로그인</button>
                        <div class="register">
                            <p>회원가입하러가기 <a href="/Register">회원가입</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import * as https from '@/api/https'
import { login } from '@/api/auth'
import store from '@/store'
export default {
  data () {
    return {
      loginId: localStorage.getItem('loginId') || '',
      password: '',
      userdata: '',
      rememberMe: !!localStorage.getItem('loginId')
    }
  },
  methods: {
    async login () {
      if (this.rememberMe) {
        localStorage.setItem('loginId', this.loginId)
      } else {
        localStorage.removeItem('loginId')
      }
      try {
        const response = await login(this.loginId, this.password)

        if (response) {
          alert('로그인 되었습니다.')
          console.log(response.data)
          await store.dispatch('doLogin', response.data)
          this.$router.push('/')
          setTimeout(this.refreshToken, 1000 * 60 * 5)
        } else {
          alert('아이디나 비밀번호가 잘못입력되었습니다.')
          location.reload()
        }
      } catch (error) {
        if (error.response.status === 409) {
          alert('정지된 사용자입니다.')
          location.reload()
        } else {
          alert('아이디나 비밀번호가 잘못입력되었습니다.')
          location.reload()
        }
      }
    },
    async refreshToken () {
      const accessToken = localStorage.getItem('token')
      const refreshToken = localStorage.getItem('refreshtoken')
      const data = {
        accessToken,
        refreshToken
      }
      try {
        const response = await https.post('/reissue', data)
        if (response.status === 200) {
          await store.dispatch('doLogin', response.data)
          setTimeout(this.refreshToken, 1000 * 60 * 5)
        } else {
          alert('error')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
 @import url("https://fonts.googleapis.com/css2?family=Tangerine");
 *{ margin: 0; padding: 0; font-family: 'poppins', sans-serif; }
a {
    height: 30px;
}
input::placeholder {
    text-align: right;
}
.logo {
    position: relative;
    top: 25px;
}
section{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
}
.form-box{
    position: center;
    width: 400px;
    height: 450px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0, 5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
}
h1{
    font-size: 2em;
    color: #0E1D31;
}
.inputbox{
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid gray;
}
.inputbox label{
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: gray;
    font-size: 1em;
    pointer-events: none;
    transition: .5s;
}
input:focus ~ label,
input:valid ~ label{
top: -5px;
}
.inputbox input{
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 35 0 5px;
    color: gray;
}
.inputbox ion-icon{
    position: absolute;
    right: 8px;
    color: gray;
    font-size: 1.2em;
    top: 10 px;
}
.forget{
    margin: -15px 0 15px;
    font-size: .9em;
    color: gray;
    display: flex;
    justify-content: center;
}
.forget label input{
    margin-right: 3px;
}
.forget label a{
    color: gray;
    text-decoration: none;
}
.forget label a:hover{
    text-decoration: underline;
}
button{
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background: #0E1D31;
    border: none;
    outline: none;
    cursor: 1em;
    font-weight: 600;
    margin-bottom: 10px;
}
.register{
    font-size: .9em;
    color: gray;
    text-align: center;
    margin: 25px 0 10px;
}
.register p a{
    text-decoration: none;
    color: gray;
    font-weight: 600;
}
.register p a:hover{
    text-decoration: underline;
}
</style>
