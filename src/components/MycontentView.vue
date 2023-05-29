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
        <tr v-for="Board in Boards" :key="Board.postId" style="line-height: 10px;">
          <td>{{ Board.title }}</td>
          <td>{{ Board.content }}</td>
          <td>{{ getFormatedDate(Board.createdAt) }}</td>
          <td>
            <div v-if="Board.applicants && Board.applicants.length > 0">
              <ul>
                <div v-for="applicant in Board.applicants" :key="applicant.id">
                  <div class="applicant-item">
                    <span> {{ applicant.name || '이름없음' }} </span>
                    <div class="buttons">
                      <button @click="accept(Board.postId, applicant.userId)">수락</button>
                      <button @click="deny(Board.postId, applicant.uesrId)">거절</button>
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
      Boards: []
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
      width: 70%;
      height: 70%;
    }

    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .applicant-item {
      display: flex;
      width: 30px;
      align-items: center;
      height: 5px;
    }
    .buttons {
      display: flex;
    }

    button {
      width: 50px;
      margin-left: 10px;
    }
    </style>
