<template>
    <div class="list" style="text-align: center;"><a href="/" class="logo"><img src="../assets/Logo2.png" alt="MATCHED" width="100" height="100"></a></div>
    <div class="list2" @click="setMainTrue">계정 관리</div>
    <div class="list2" @click="setInfoTrue">☻계정 정보</div>
    <div class="list2" @click="setPwTrue">🔒보안</div>
    <div class="list2" @click="setmyTrue">나의 게시글</div>
    <button @click="quit()">회원 탈퇴</button>
</template>

<script>
import store from '@/store'
import * as https from '@/api/https'
export default {
  methods: {
    setMainTrue () {
      this.$emit('change-section', 'Main')
    },
    setInfoTrue () {
      this.$emit('change-section', 'Info')
    },
    setPwTrue () {
      this.$emit('change-section', 'Pw')
    },
    setmyTrue () {
      this.$emit('change-section', 'Mywrite')
    },
    quit () {
      https.del('/my')
        .then(response => {
          alert('회원탈퇴 완료되었습니다.')
          store.commit('logout')
          this.$router.push('/')
        })
        .catch(error => {
          alert('회원탈퇴 실패했습니다.')
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.list {
    height: 20%;
}
.list2 {
    height: 10%;
    text-align: center;
}
</style>
