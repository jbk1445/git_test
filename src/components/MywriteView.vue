<template>
  <div class="menu">
    <h2>나의 게시글 보기</h2>
    <div class="content-box">
      <table>
        <tr>
          <td>
            게시판 이름
          </td>
          <td>
            글 제목
          </td>
          <td>
            날짜
          </td>
        </tr>
        <tr>
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
      data: null
    }
  },
  created () {
    https.get('/match/2')
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
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
    </style>
