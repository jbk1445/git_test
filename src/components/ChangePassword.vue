<template>
    <div class="menu">
        <div class="title">보안</div>
        <div class="box">
            <div class="box-title">암호<button @click="Changepw = true">변경</button></div>
            <div class="box-title">************</div>
        </div>
    </div>
    <div class="black-bg" v-if="Changepw">
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
import * as https from '@/api/https'
import store from '@/store'
export default {
  data () {
    return {
      Changepw: false,
      newPw: '',
      newPwcheck: ''
    }
  },
  methods: {
    changePw () {
      const data = {
        nowPassword: this.password,
        newPassword: this.newPw,
        checkPassword: this.newPwcheck
      }
      https.post('/password_edit', data)
        .then(response => {
          alert('비밀번호 변경 완료')
          alert('다시 로그인해주세요')
          store.commit('logout')
          this.$router.push('/LoginCheck')
        })
        .catch(error => {
          alert('비밀번호 변경에 실패했습니다.')
          console.log(error)
          this.$router.push('/LoginCheck')
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

<style scoped>
    .menu {
        height: 100vh;
        margin: 30px;
    }
    .pw {
        width: 100%;
    }
    .title {
        font-size: 30px;
        margin: 10px;
    }
    .box {
        width: 100%; height: 30%;
        border: 1px solid #ccc;
    }
    .box-title {
        display: flex;
        margin: 30px;
        justify-content: space-between;
    }
    button {
        width: 30%; left: 100%;
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
