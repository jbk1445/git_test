<template>
    <div class="menu">
      <div class="header">
        <h2>내 신청 현황</h2>
      </div>
      <div class="content-box">
        <table>
          <tr style="height: 5%">
            <td>글 제목</td>
            <td>글 내용</td>
            <td>날짜</td>
            <td>지원현황</td>
          </tr>
          <tr v-for="Board in paginatedBoards" :key="Board.postId" style="line-height: 10px;">
            <td class="td"><a :href="`/Board/${Board.boardName}/view/${Board.postId}`">{{ Board.title }}</a></td>
            <td class="td">{{ Board.content }}</td>
            <td class="td">{{ getFormatedDate(Board.createdAt) }}</td>
            <td>
              <div class="buttons">
                <button @click="cancel(Board.postId)">취소</button>
              </div>
            </td>
          </tr>
          <tr v-for="n in (pageSize - paginatedBoards.length)" :key="'empty-' + n">
            <td style="height: 50px;"></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td style="display: block;" colspan="4">
              <div class="paginaion-buttons" style="display: flex; align-items: center; justify-content:center">
                <button @click="prevPage" :disabled="currentPage === 0" style="margin-right: 10px;">이전</button>
                <span> 페이지:{{ currentPage + 1 }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages-1">다음</button>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>
<script>
import * as https from '@/api/https'
export default {
  data () {
    return {
      data: null,
      Boards: [],
      currentPage: 0,
      pageSize: 8
    }
  },
  computed: {
    paginatedBoards () {
      const start = this.currentPage * this.pageSize
      const end = start + this.pageSize
      return this.Boards.slice(start, end)
    },
    totalPages () {
      return Math.ceil(this.Boards.length / this.pageSize)
    }
  },
  created () {
    https.get('/match/applicant')
      .then(response => {
        console.log(response.data)
        this.Boards = response.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    cancel (postId) {
      https.del(`/match/${postId}`)
        .then(response => {
          alert('매칭 지원이 취소되었습니다.')
          location.reload()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getFormatedDate (createdAt) {
      const currentTime = new Date()
      const createdAtTime = new Date(createdAt)
      const diffInMinutes = Math.floor((currentTime - createdAtTime) / (1000 * 60))

      if (diffInMinutes < 60) {
        return `${diffInMinutes} 분 전`
      } else {
        const month = (createdAtTime.getMonth() + 1).toString().padStart(2, '0')
        const day = createdAtTime.getDate().toString().padStart(2, '0')
        const hours = createdAtTime.getHours().toString().padStart(2, '0')
        const minutes = createdAtTime.getMinutes().toString().padStart(2, '0')

        return `${month}/${day} ${hours}:${minutes}`
      }
    },
    nextPage () {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++
      }
    },
    prevPage () {
      if (this.currentPage > 0) {
        this.currentPage--
      }
    }
  }
}
</script>
<style scoped>

table {
  width: 100%;
  height: 100%;
}
.content-box {
  border: 1px solid #ccc;
  width: 90%;
  height: 60%;
}

.menu {
  left: 10%;
  display: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 90%;
  height: 100%;
}
.buttons {
  width: 100%;
}

.paginaion-buttons button {
  width: 10%;
  margin-left: 10px;
}

.td {
  white-space: nowrap; /* 한 줄에 모든 텍스트를 표시합니다 */
  overflow: hidden; /* 넘치는 텍스트를 감춥니다 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 "..."으로 표시합니다 */
  max-width: 100px; /* 최대 텍스트 너비를 지정합니다 */
  height: 50px;
}

.header h2 {
  position: relative;
  left: 40%;
}
</style>
