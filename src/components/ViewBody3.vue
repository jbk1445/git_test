<template>
    <div class="title">
        <h1>캡스톤 게시판</h1>
    </div>
    <div class="titles">
        <div  v-for="Board in Boards" :key="Board.postId" class="list">
            <router-link :to="`/Board/capstone/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
                <p class="small">{{ Board.content }}</p>
                <time class="small">{{ $getFormatedDate(Board.createdAt) }}</time>
            </router-link>
        </div>
    <div class="float-center">
      <div class="down-area">
        <ul>
          <li v-for="page in pages" :key="page" @click="reloadpage(page)" :class="{ 'selected': currentPage === page}">
          {{ page }}
        </li>
        </ul>
        <button class="next" @click="gowrite()">글쓰기</button>
      </div>
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
      pageSize: 4,
      showNextButton: false,
      showBeforeButton: false,
      Board1: false,
      Board2: false,
      Board3: false,
      Board4: false,
      pages: [1, 2, 3, 4, 5, 6, 7, 8]
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
      const params = {
        page: this.currentPage,
        size: this.pageSize
      }
      const BoardName = 'capstone'
      https
        .view(`board/${BoardName}`, params)
        .then(response => {
          this.Boards = response.data
        })
        .catch(error => {
          alert(error)
        })
    },
    gowrite () {
      const boards = ['Board1', 'Board2', 'Board3', 'Board4']
      boards.forEach((board, index) => {
        localStorage.setItem(board, index === 2)
      })
      this.$router.push('/BoardWrite')
    },
    search () {
      this.currentPage = 1
      this.showBeforeButton = false
      this.loadPage()
    },
    reloadpage (page) {
      this.currentPage = page
      this.loadPage()
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
        width: 570px; font-size: medium;
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
    .float-center {
  display: flex;
  justify-content: center;
  width: 100%;
}

ul {
  margin: 0;
  padding: 0;
  border: 1px solid #ccc;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  left: 30%;
}

li {
  border-left: 1px solid #ccc;
  text-align: center;
  width: 20px;
  cursor: pointer;
}

button {
  height: 30px;
  width: 30%;
  margin-left: auto;
}

.down-area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
}

.selected {
  background-color: yellow;
}
    </style>
