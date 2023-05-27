<template>
<div class="card-container">
    <div class="card">
        <div class="board">
            <h3><a href="/Board/tutoring">튜터링 게시판</a></h3>
            <div  v-for="Board in board1" :key="Board.postId" class="list">
              <router-link :to="`/Board/Notice/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
              </router-link>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="board">
            <h3><a href="/Board/club">동아리 게시판</a></h3>
            <div  v-for="Board in board2" :key="Board.postId" class="list">
              <router-link :to="`/Board/Notice/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
              </router-link>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="board">
            <h3><a href="/Board/capstone">캡스톤 게시판</a></h3>
            <div  v-for="Board in board3" :key="Board.postId" class="list">
              <router-link :to="`/Board/Notice/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
              </router-link>
            </div>
        </div>
    </div>
    <div class="card">
        <div class="board">
          <h3><a href="/Board/poom">품앗이 게시판</a></h3>
          <div  v-for="Board in board4" :key="Board.postId" class="list">
              <router-link :to="`/Board/Notice/view/${Board.postId}`" class="article">
                <h2 class="medium">{{ Board.title }}</h2>
              </router-link>
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
  margin: 20px;
}

.card {
  width: calc(50% - 10px);
  min-width: 300px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.board {
  padding: 20px;
  height: 300px;
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

</style>
