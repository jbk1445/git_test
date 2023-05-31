<template>
    <div class="password-reset-container">
        <div class="password-reset-form">
            <h2 class="form-title">이메일 인증</h2>
            <div class="form-group">
                <label for="email">이메일</label>
                <input type="email" id="email" v-model="email" placeholder="이메일을 입력하세요">
            </div>
            <div v-if="!isCodeSent">
                <button class="btn btn-primary" @click="sendCode">인증번호 전송</button>
            </div>
            <div v-else>
                <input type="email" id="code" v-model="code" placeholder="인증번호"/>
                <button class="btn-primary1" @click="Verify">확인</button>
                <button class="btn-primary1" @click="sendCode">재전송</button>
            </div>
        </div>
    </div>
</template>

<script>
import http from '@/api/http'
export default {
  data () {
    return {
      email: '',
      code: '',
      IsVerify: false,
      isCodeSent: false,
      verifycode: null
    }
  },
  methods: {
    sendCode () {
      const data = {
        email: this.email
      }
      const emailRegex = /\b[A-Z0-9._%+-]+@mju\.ac\.kr\b/i
      if (!this.email) {
        alert('이메일을 입력하세요')
      } else if (!emailRegex.test(this.email)) {
        alert('올바른 이메일 주소를 입력하세요. 현재 @mju.ac.kr로만 가입 가능합니다.')
      } else {
        http.post('/email', data)
          .then(response => {
            this.isCodeSent = true
            this.verifycode = response.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    Verify () {
      console.log(this.verifycode, this.code)
      if (this.code === this.verifycode) {
        alert('인증되었습니다.')
        this.$router.push('/Register')
        localStorage.setItem('IsVerify', true)
        localStorage.setItem('email', this.email)
        localStorage.removeItem('register')
      } else {
        alert('인증에 실패했습니다.')
      }
    }
  }
}
</script>

<style>
.password-reset-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    border-radius: 40px;
}

.password-reset-form {
    width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-title {
    margin-top: 0;
    text-align: center;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input[type="email"],
input[type="text"] {
    width: 95%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 40px;
    font-size: 16px;
}

button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: #008b71   ;
    border-radius: 40px;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #0069d9;
}
.btn-primary1 {
    width: 50%;
    position: relative;
    display: inline;
}
</style>
