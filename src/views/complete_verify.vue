<template>
    <div class="complete-email-verification-page">
      <div class="success-message">
        <h1>이메일 인증이 완료되었습니다!</h1>
        <p>이제 회원가입을 진행해주세요.</p>
      </div>
      <div class="next-step">
        <button @click="completeverification()">확인</button>
      </div>
    </div>
  </template>
<script>

export default {
  data () {
    return {
      IsVerify: false
    }
  },
  methods: {
    completeverification () {
      this.IsVerify = true
      localStorage.setItem('IsVerify', JSON.stringify(true))
      this.$router.push('/Register')
    }
  }
}

</script>
