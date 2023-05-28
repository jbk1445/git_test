<template>
<div class="menu">
    <div class="maintitle"><div class="maintitle-text">{{ name }}님 안녕하세요</div></div>
    <div class="boxmenu">
        <div class="box" @click=setInfoTrue><h3>계정정보</h3><p>개인 정보 확인 및 수정합니다.</p></div>
        <div class="box" @click=setPwTrue><h3>보안</h3><p>암호를 재설정합니다.</p></div>
        <div class="box" @click="setmyTrue"><h3>나의 글</h3><p>내 게시글을 조회합니다.</p></div>
    </div>
    </div>
</template>

<script>
import * as https from '@/api/https'
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    https.get('/profile')
      .then(response => {
        this.name = response.data.name
      })
  },
  methods: {
    setInfoTrue () {
      this.$emit('change-section', 'Info')
    },
    setPwTrue () {
      this.$emit('change-section', 'Pw')
    },
    setmyTrue () {
      this.$emit('change-section', 'Mywrite')
    }
  }
}
</script>

<style scoped>
.menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.box {
    width: 30%; margin: 10px;
    border: 1px solid #ccc;
    text-align: center;
}
.boxmenu {
    height: 40%; width: 100%;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: row;
}
.maintitle {
    border-bottom: 1px solid #ccc;
    width: 60%; top: 30px;
    position: absolute; margin: 10px;
}
.maintitle-text {
    margin: 10px;
    }
</style>
