<template>
    <div v-if="!changepw" class="password-reset-container">
        <div class="password-reset-form">
            <h2 class="form-title">비밀번호 변경</h2>
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
    <div class="black-bg" v-else>
      <div class="white-bg">
        <div class="title">변경할 비밀번호를 입력하세요</div>
        <div class="title">현재 비밀번호<input class="pw" type="password" v-model="password"></div>
        <div class="title">비밀번호<input class="pw" type="password" v-model="newPw"></div>
        <div class="title">비밀번호 확인<input class="pw" type="password" v-model="newPwcheck"></div>
        <label for=""><div v-if="!passwordMatch">비밀번호가 일치하지 않습니다.</div></label>
        <div class="title" style="align-items: center; display: flex;">
            <button @click="Changepw = false">취소</button>
            <button @click="changePw">변경</button>
        </div>
     </div>
    </div>
</template>

<script>
import http from '@/api/http'
import * as https from '@/api/https'
export default {
  data () {
    return {
      email: '',
      code: '',
      IsVerify: false,
      isCodeSent: false,
      verifycode: null,
      changepw: false,
      newPw: '',
      newPwcheck: ''
    }
  },
  methods: {
    sendCode () {
      const emailRegex = /\b[A-Z0-9._%+-]+@mju\.ac\.kr\b/i
      if (!this.email) {
        alert('이메일을 입력하세요')
      } else if (!emailRegex.test(this.email)) {
        alert('올바른 이메일 주소를 입력하세요. 현재 @mju.ac.kr로만 가입 가능합니다.')
      } else {
        http.get('/email', {
          params: {
            email: this.email
          }
        })
          .then(res => {
            this.isCodeSent = true
            this.verifycode = res.data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    Verify () {
      if (this.code === this.verifycode) {
        alert('인증되었습니다.')
        this.changepw = true
      } else {
        alert('인증에 실패했습니다.')
      }
    },
    changePw () {
      const data = {
        loginId: this.email,
        newPassword: this.newPw,
        checkPassword: this.newPwcheck
      }
      https.post('/password_change', data)
        .then(response => {
          alert('비밀번호 변경 완료')
          this.changepw = false
          this.$router.push('/LoginCheck')
        })
        .catch(error => {
          alert('비밀번호 변경에 실패했습니다.')
          location.reload()
          console.log(error)
        })
    }
  },
  computed: {
    passwordMatch () {
      return this.newPw === this.newPwcheck
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
.pw {
    width: 100%;
}
.title {
    font-size: 30px;
    margin: 10px;
}
.white-bg {
    width: 600px;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    max-height: 80%;
    overflow-y: auto;
}
.black-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
</style>
