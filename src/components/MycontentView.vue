<template>
  <div class="menu">
    <h2>나의 게시글 보기</h2>
    <div class="content-box">
      <table>
        <tr style="height: 5%">
          <td>
            글 제목
          </td>
          <td>
            글 내용
          </td>
          <td>
            날짜
          </td>
          <td>
            지원현황
          </td>
        </tr>
        <tr v-for="Board in paginatedBoards" :key="Board.postId" style="line-height: 10px;">
          <td class="td">{{ Board.title }}</td>
          <td class="td">{{ Board.content }}</td>
          <td class="td">{{ getFormatedDate(Board.createdAt) }}</td>
          <td>
            <div v-if="Board.applicants && Board.applicants.length > 0">
              <ul style="padding-left: 0;">
                <div v-for="applicant in Board.applicants" :key="applicant.id" style="height: auto;">
                  <div class="applicant-item">
                    <span>{{applicant.name.trim()}} </span>
                    <div class="buttons">
                      <button @click="accept(Board.postId, applicant.userId)">수락</button>
                      <button @click="deny(Board.postId, applicant.userId)">거절</button>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div v-else>
              신청자 없음
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
            <div class="paginaion-buttons" style="display: flex; align-items: center; justify-content: center;">
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
    https.get('/match')
      .then(response => {
        this.Boards = response.data
        const promises = this.Boards.map(board => {
          const postId = board.postId
          return https.get(`/match/${postId}`)
            .then(response => {
              console.log(response.data)
              board.applicants = response.data
            })
            .catch(error => {
              console.error(error)
            })
        })
        return Promise.all(promises)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
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
    accept (postId, applicantId) {
      https.post(`/${postId}/accept/${applicantId}`)
        .then(response => {
          alert('매칭이 수락되었습니다.')
          console.log(response.data)
          alert(`연락 이메일= ${response.data.loginId}`)
          location.reload()
        })
        .catch(error => {
          alert('요청이 정상적으로 처리되지 못했습니다.')
          console.log(error)
        })
    },
    deny (postId, applicantId) {
      https.post(`/${postId}/refuse/${applicantId}`)
        .then(response => {
          alert('매칭이 거절되었습니다.')
          location.reload()
        })
        .catch(error => {
          alert('요청이 정상적으로 처리되지 못했습니다.')
          console.log(error)
        })
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
      height: 600px;
    }

    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      width: 1300px;
      height: 800px;
    }

    .applicant-item {
      display: flex;
      width: 30px;
      align-items: center;
      justify-content: space-between;
    }
    .buttons {
      display: flex;
    }

    button {
      width: 50px;
      margin-left: 10px;
    }

    .td {
      white-space: nowrap; /* 한 줄에 모든 텍스트를 표시합니다 */
      overflow: hidden; /* 넘치는 텍스트를 감춥니다 */
      text-overflow: ellipsis; /* 넘치는 텍스트를 "..."으로 표시합니다 */
      max-width: 100px; /* 최대 텍스트 너비를 지정합니다 */
      height: 50px;
    }
    .applicant-item span {
      white-space: nowrap;
    }
    </style>
