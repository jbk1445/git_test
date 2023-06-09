<template>
<div class="card-container">
    <div class="card">
        <div class="board">
          <div class="title2">
              <h3><a href="/Board/tutoring">튜터링 게시판</a></h3>
              <div  v-for="Board in board1" :key="Board.postId" class="list">
                <a class="article" :href="`/Board/tutoring/view/${Board.postId}`">
                  <h2 class="medium">{{ Board.title }}</h2>
                  <span class="date">{{ $getFormatedDate(Board.createdAt) }}</span>
                </a>
              </div>
          </div>
        </div>
    </div>
    <div class="card">
        <div class="board">
          <div class="title2">
            <h3><a href="/Board/club">동아리 게시판</a></h3>
            <div  v-for="Board in board2" :key="Board.postId" class="list">
              <router-link :to="`/Board/club/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
                <span class="date">{{ $getFormatedDate(Board.createdAt) }}</span>
              </router-link>
            </div>
          </div>
        </div>
    </div>
    <div class="card">
        <div class="board">
          <div class="title2">
            <h3><a href="/Board/capstone">캡스톤 게시판</a></h3>
            <div  v-for="Board in board3" :key="Board.postId" class="list">
              <router-link :to="`/Board/capstone/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
                <span class="date">{{ $getFormatedDate(Board.createdAt) }}</span>
              </router-link>
            </div>
          </div>
        </div>
    </div>
    <div class="card">
        <div class="board">
          <div class="title2">
          <h3><a href="/Board/poom">품앗이 게시판</a></h3>
          <div  v-for="Board in board4" :key="Board.postId" class="list">
              <router-link :to="`/Board/poom/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
                <span class="date">{{ $getFormatedDate(Board.createdAt) }}</span>
              </router-link>
            </div>
          </div>
        </div>
    </div>
</div>
</template>
<script>
import * as https from '@/api/https'
export default {
  data () {
    return {
      boards: [],
      board1: [],
      board2: [],
      board3: [],
      board4: []
    }
  },
  mounted () {
    https.get('/home')
      .then(response => {
        this.boards = response.data
        this.boards.forEach(item => {
          if (item.boardName === 'tutoring') {
            this.board1.push(item)
          } else if (item.boardName === 'club') {
            this.board2.push(item)
          } else if (item.boardName === 'capstone') {
            this.board3.push(item)
          } else if (item.boardName === 'poom') {
            this.board4.push(item)
          }
        })
      })
      .catch(error => {
        alert(error)
        console.log(error)
      })
  }
}
</script>
<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 40px;
}

.card {
  width: 48%;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.board {
  padding: 20px;
  height: 300px;
  margin: 20px;
  border: 1px solid #ccc;
}

.board h3 {
  margin: 0;
  padding: 10px 0;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.board li {
  list-style: none;
  margin: 10px 0;
}

.board li a {
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
}

.board li a:hover {
  color: #ff6600;
}

.medium {
  border-bottom: 1px solid #ccc;
  margin-left: 5px;
  white-space: nowrap; /* 한 줄에 모든 텍스트를 표시합니다 */
  overflow: hidden; /* 넘치는 텍스트를 감춥니다 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 "..."으로 표시합니다 */
  max-width: 300px; /* 최대 텍스트 너비를 지정합니다 */
}

.title2 {
  height: 100%;
  border: 1px solid #ccc;
}

a {
  text-decoration: none;
}

@font-face {
  font-family: 'font';
  src: url('@/assets/fonts/malgun.ttf')
}

div {
  font-family: 'font';
  color: #737373;
  text-decoration: none;
}

.article {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
