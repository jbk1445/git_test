<template>
    <div v-if="this.$store.state.token" class="login">
        <a href="/" class="logo"><img src="../assets/Logo2.png" alt="MATCHED" width="100" height="100"></a>
        <a href="/users" class="button-login">내정보</a>
        <button @click="logout">로그아웃</button>
        <hr>
        <div class="tabs">
            <span class="tab" :class="{active: activeTab === '공지'}" @click="activeTab = '공지'">공지</span>
            <span class="tab" :class="{active: activeTab === '알림'}" @click="activeTab = '알림'">알림</span>
        </div>
        <hr>
        <div class="tab-content" v-if="activeTab === '공지'">
            <div class="list"><router-link to='/Board/Notice'>게시판 이동</router-link></div>
            <a class="list">
                <p>{{ Notice.name1 }}</p>
            </a>
            <a class="list">
                <p>{{ Notice.name2 }}</p>
            </a>
            <a class="list">
                <p>{{ Notice.name3 }}</p>
            </a>
            <a class="list">
                <p>{{ Notice.name4 }}</p>
            </a>
    </div>
        <div class="tab-content" v-else-if="activeTab === '알림'">
            <a class="list">
                <p>알림사항1</p>
            </a>
            <a class="list">
                <p>알림사항2</p>
            </a>
            <a class="list">
                <p>알림사항3</p>
            </a>
            <a class="list">
                <p>알림사항4</p>
            </a></div>
    </div>

    <div v-else class="login">
        <!-- 로그인 페이지 상단 로고 -->
        <a href="/" class="logo"><img src="../assets/Logo2.png" alt="MATCHED" width="100" height="100"></a>
        <!-- 로그인 버튼 -->
        <a href="/loginCheck" class="button-login">로그인</a>
        <!-- 회원가입 버튼 -->
        <a href="/Register" class="button-register">MATCHED 회원가입</a>
        <!-- 비밀번호 찾기 링크 -->
        <p class="find">
            <a href="/Password_find"></a>
        </p>
        <button @click="test">test button</button>
    </div>
</template>

<script>
import store from '@/store/index'
import http from '@/api/http.js'
export default {
  data () {
    return {
      isLoggedIn: false,
      activeTab: '공지',
      room: { name1: '', name2: '', name3: '', name4: '' },
      Notice: { name1: '', name2: '', name3: '', name4: '' }
    }
  },
  created () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isLoggedIn = true
    } else { this.isLoggedIn = false }
  },
  mounted () {
    if (!this.$store.state.token) {
      http.get('board/capstone')
        .then(response => {
          if (response.data.length <= 3) {
            for (let i = 0; i < response.data.length; i++) {
              this.Notice['name' + (i + 1)] = response.data[response.data.length - i - 1].title
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
    },
    test () {
      const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiTmVpZ2hib3JBUEkiOiJST0xFX0FETUlOIiwiZXhwIjoxNjg1MTk4NjczfQ.YTOun2aFVi_MkHTKSohtLa1NoV0ggP3A1ajGGjlNuhnc8OPgeys0-xh1U3vNE-AcdyjUr-CqqNDkKscEANHpFw'
      }
      http.post('/board/club', {
        title: 'title',
        content: 'context'
      }, headers)
        .then(response => {
          alert('성공')
        })
        .catch(error => {
          console.log(error)
          alert('실패')
        })
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
.chat {
    display: block; margin-bottom: 5px; height: 40px; line-height: 40px; box-sizing: border-box;
    border-radius: 40px; text-align: center; text-decoration: none;
    font-size: 14px; text-align: center; color: #fff; background-color: #008f71;
}
a.list{
    display: block;
    padding: 12px;
    border-top: 1px solid #e3e3e3;
    text-decoration: none;
    text-align: left;
}
.tabs {
    display: flex;
    justify-content: center;
    background-color: #008b71;
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
    font-size: 14px; font-weight: bold; text-align: center; border: 1px solid #e3e3e3; color: #737373;
}
.logo {
    text-align: center;
}
.button-register {
    display: block; margin-bottom: 5px; height: 40px; line-height: 40px; box-sizing: border-box;
    border-radius: 40px; text-align: center; text-decoration: none;
    font-size: 14px; font-weight: bold; text-align: center; color: #fff; background-color: #008f71;
}
.button-afterlogin {
    display:inline-block; margin-bottom: 5px; height: 40px; line-height: 40px; box-sizing: border-box;
    border-radius: 40px; width: 20%; position: relative;
    font-size: 14px; font-weight: bold; text-align: center; color: #fff; background-color: #008f71;
}
.find {
    padding: 5px 5px 0 5px; width: 50%; box-sizing: border-box; float: right; text-align: right; height: 15px; line-height: 15px; color: #444444; font-size: 12px; cursor: pointer;
}
.login {
    text-align: center;
    height: 50%
}

</style>
