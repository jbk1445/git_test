<template>
  <div class="title">
      <h1>공지사항</h1>
  </div>
  <div class="titles">
      <div  v-for="Board in Boards" :key="Board.noticeId" class="list">
          <router-link :to="`/Board/notice/view/${Board.noticeId}`" class="article">
              <h2 class="medium">{{ Board.title }}</h2>
              <p class="small">{{ Board.content }}</p>
              <time class="small">{{ Board.createdAt }}</time>
          </router-link>
      </div>
      <div class="bottom">
          <form id="search" class="search">
              <select name="search_type">
                  <option value="4">전체</option>
                  <option value="3">태그</option>
                  <option value="2">글 제목</option>
                  <option value="1">글 내용</option>
              </select>
              <input name="keyword" placeholder="검색어를 입력하세요" class="text">
          </form>
          <button v-if="showBeforeButton" class="next" @click="loadPrePage()">이전</button>
          <button v-if="showNextButton" class="next" @click="loadNextPage()">다음</button>
          <button class="next" @click="writenotice()">작성하기</button>
      </div>
  </div>
  </template>

<script>
import * as https from '@/api/https'
export default {
  data () {
    return {
      Boards: [],
      currentPage: 1,
      pageSize: 10,
      showNextButton: false,
      showBeforeButton: false,
      Board1: false,
      Board2: false,
      Board3: false,
      Board4: false
    }
  },
  mounted () {
    this.loadPage()
  },
  methods: {
    loadNextPage () {
      this.currentPage++
      this.loadPage()
      this.showBeforeButton = true
    },
    loadPrePage () {
      this.currentPage--
      this.loadPage()
      if (this.currentPage === 1) this.showBeforeButton = false
    },
    loadPage () {
      https.get('/board/notice')
        .then(response => {
          this.Boards = response.data
          this.showNextButton = response.headers['x-total-count'] > this.currentPage * this.pageSize
        })
        .catch(error => {
          console.log(error)
        })
    },
    writenotice () {
      https.post('/board/notice', {
        title: '공지 테스트11',
        content: '공지 테스트 내용2'
      })
        .then(response => {
          alert('작성되었습니다.')
        })
        .catch(error => {
          console.log(error)
        })
    },
    gowrite () {
      const boards = ['Board1', 'Board2', 'Board3', 'Board4']
      boards.forEach((board, index) => {
        localStorage.setItem(board, index === 0)
      })
      this.$router.push('/BoardWrite')
    }
  }
}
</script>

  <style scoped>
  form {
      float: left;
      margin-top: 5px;
      margin-left: 5px;
      padding: 8px 25px 8px 5px;
      border: 1px solid #a6a6a6;
      border-radius: 3px;
  }
  .next {
      float: right;
      margin: 10px;
  }
  .title {
      position: relative;
      left: 20%; top: 10%;
      display: block;
      border: 1px solid gray;
      width: 570px;
      margin: 10px; padding: 15px;
  }
  .titles {
      position: relative;
      margin: 10px;
      width: 600px; height: 100%;
      left: 20%; top: 10%;
  }
  .list {
      display: block;
      padding: 12px;
      border: 1px solid #e3e3e3;
      text-decoration: none;
      text-align: left;
      padding: 15px; width: 600px;
      margin-bottom: -1px;
      box-sizing: border-box;
  }
  *{
      margin: 0;
  }
  .h2.article {
      display: block;
      padding: 15px;
  }
  a {
      text-decoration: none;
  }
  .medium {
      margin-bottom: 5px;
      line-height: 18px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
      font-weight: normal;
  }
  .small {
      margin-bottom: 5px;
      max-height: 30px;
      line-height: 15px;
      white-space: normal;
      overflow: hidden;
      color: #a6a6a6;
      font-size: 12px;
  }
  </style>
