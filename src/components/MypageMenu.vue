<template>
    <div class="list" style="text-align: center;"><a href="/" class="logo"><img src="../assets/newlogo2.png" alt="MATCHED" width="100" height="100"></a></div>
    <div class="list2" @click="setMainTrue">계정 관리</div>
    <div class="list2" @click="setInfoTrue">☻계정 정보</div>
    <div class="list2" @click="setPwTrue">🔒보안</div>
    <div class="list2" @click="setmyTrue">나의 게시글</div>
    <div class="list2" @click="setApplyTrue">신청 게시글</div>
    <div class="button-container">
      <button @click="confirmquit()">회원 탈퇴</button>
    </div>
</template>

<script>
import store from '@/store'
import * as https from '@/api/https'
export default {
  methods: {
    setMainTrue () {
      this.$emit('change-section-main')
    },
    setInfoTrue () {
      this.$emit('changeSection-info')
    },
    setPwTrue () {
      this.$emit('change-section-pw')
    },
    setmyTrue () {
      this.$emit('change-section-mywrite')
    },
    setApplyTrue () {
      this.$emit('change-section-myapply')
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
    },
    confirmquit () {
      if (window.confirm('정말 탈퇴하시겠습니까?')) {
        this.quit()
      } else {
        location.reload()
      }
    }
  }
}
</script>

<style scoped>
.list {
  display: flex;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  height: 100px;
}
.list2 {
  display: flex;
  height: 60px;
  text-align: center;
  cursor: pointer;
  justify-content: center;
  align-items: center;
}
.list2:hover {
  background-color: lightgray;
}
.container {
  display: inline;
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
.button-container {
  position: relative;
  top: 40%;
}
</style>
