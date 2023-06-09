<template>
  <div class="container">
    <div v-if="this.$store.state.token" class="login">
        <a href="/" class="logo"><img src="../assets/newlogo2.png" alt="MATCHED" width="100" height="100"></a>
        <div class="myname">{{ name }}님 안녕하세요
        </div>
        <a href="/users" class="button-login">내정보</a>
        <button @click="logout">로그아웃</button>
        <hr>
        <div class="tabs">
            <span class="tab">공지사항</span>
        </div>
        <hr>
        <div class="tab-content">
            <a class="list" :href="`/Board/notice/view/${Notice.postId1}`">
                <p>{{ Notice.name1 }}</p>
            </a>
            <a class="list" :href="`/Board/notice/view/${Notice.postId2}`">
                <p>{{ Notice.name2 }}</p>
            </a>
            <a class="list" :href="`/Board/notice/view/${Notice.postId3}`">
                <p>{{ Notice.name3 }}</p>
            </a>
            <a class="list" :href="`/Board/notice/view/${Notice.postId4}`">
                <p>{{ Notice.name4 }}</p>
            </a>
        </div>
    </div>

    <div v-else class="login">
        <!-- 로그인 페이지 상단 로고 -->
        <a href="/" class="logo"><img src="../assets/newlogo2.png" alt="MATCHED" width="100" height="100"></a>
        <!-- 로그인 버튼 -->
        <a href="/loginCheck" class="button-login">로그인</a>
        <!-- 회원가입 버튼 -->
        <a href="/Register" class="button-register">MATCHED 회원가입</a>
        <!-- 비밀번호 찾기 링크 -->
        <p class="find">
            <a href="/Password_find"></a>
        </p>
    </div>
  </div>
</template>

<script>
import store from '@/store/index'
import * as https from '@/api/https'
export default {
  data () {
    return {
      isLoggedIn: false,
      room: { name1: '', name2: '', name3: '', name4: '' },
      Notice: { name1: '', name2: '', name3: '', name4: '', postId1: '', postId2: '', postId3: '', postId4: '' },
      name: ''
    }
  },
  created () {
    if (this.$store.state.token) {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        this.isLoggedIn = true
      } else { this.isLoggedIn = false }
      https.get('/profile')
        .then(response => {
          this.name = response.data.name
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    if (this.$store.state.token) {
      https.get('board/notice')
        .then(response => {
          if (response.data.length <= 3) {
            for (let i = 0; i < response.data.length; i++) {
              this.Notice['name' + (i + 1)] = response.data[response.data.length - i - 1].title
              this.Notice['postId' + (i + 1)] = response.data[response.data.length - i - 1].noticeId
            }
          } else {
            for (let i = 0; i < 4; i++) {
              this.Notice['name' + (i + 1)] = response.data[response.data.length - i - 1].title
            }
          }
        }
        )
        .catch(error => {
          alert('error')
          console.log(error)
        })
    }
  },
  methods: {
    logout () {
      alert('로그아웃 되었습니다.')
      store.commit('logout')
      if (location.pathname === '/') {
        location.reload()
      } else {
        this.$router.push('/')
      }
    }
  },
  watch: {
    isLoggedIn: function (newValue) {
      if (newValue === false) {
        window.location.reload()
      }
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Tangerine");

.myname {
  height: 20%;
}
a.list{
    display: block;
    padding: 12px;
    border-top: 1px solid #e3e3e3;
    text-decoration: none;
    text-align: left;
    height: 45px;
}
.tabs {
    display: flex;
    justify-content: center;
    background-color: #0E1D31;
    border-radius: 40px;
}
.tab {
    cursor: pointer;
    margin: 0 0.5rem;
    padding: 0.2rem;
    border-radius: 0.5rem 0.5rem 0 0;
    border-bottom: none;
    color: #ccc;
}
.tab-content {
    border: 1px solid #ccc;
    border-top: none;
    border-radius: 0 0 0.5rem 0.5rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-top: -1px;
}
.tab.active {
    border-bottom: 1px solid #ccc;
    color:#fff;
}
.tab.active + .tab-content {
    border-top: 1px solid #ccc;
    margin-top: 0;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
}
hr {
    border: none;
    border-bottom: none;
}
div {
    flex: 1;
}
.button-login {
    display: block; margin-bottom: 5px; height: 40px; line-height: 40px; box-sizing: border-box;
    border-radius: 40px; text-decoration: none;
    font-size: 14px; font-weight: bold; text-align: center; border: 1px solid #e3e3e3; color: #0E1D31;
}
.logo {
    text-align: center;
}
.button-register {
    display: block; margin-bottom: 5px; height: 40px; line-height: 40px; box-sizing: border-box;
    border-radius: 40px; text-align: center; text-decoration: none;
    font-size: 14px; font-weight: bold; text-align: center; color: #fff; background-color: #0E1D31;
}
.button-afterlogin {
    display:inline-block; margin-bottom: 5px; height: 40px; line-height: 40px; box-sizing: border-box;
    border-radius: 40px; width: 20%; position: relative;
    font-size: 14px; font-weight: bold; text-align: center; color: #fff; background-color: #0E1D31;
}
.find {
    padding: 5px 5px 0 5px; width: 50%; box-sizing: border-box; float: right; text-align: right; height: 15px; line-height: 15px; color: #444444; font-size: 12px; cursor: pointer;
}
.login {
    text-align: center;
    height: 50%
}

.container {
  width: 100%;
}

</style>
