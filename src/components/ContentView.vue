<template>
  <div class="black-bg" v-if="Report">
    <div class="white-bg">
      <div class="R-title">신고하기</div>
      <div class="R-content">
        <div class="R-contentbox">
          <table>
            <colgroup>
              <col style="width: 15%;">
              <col style="width: 75%;">
            </colgroup>
          <tbody>
            <tr>
              <th><span>신고대상</span></th>
              <td style="height: 110px;">
              <div class="R-contenttitle">
                <p class="target">
                <span>{{ title }}</span>
                <br>
                <span>{{ content }}</span>
                </p>
              </div></td>
            </tr>
            <tr>
              <th><span>신고사유</span></th>
              <td style="height: 250px;">
              <div class="td-content">
                <ul>
                  <li>
                    <span class="chk-area">
                      <input type="radio" id="reason2" name="flag" value="욕설" checked>
                      <label for="reason2">욕설</label>
                    </span>
                  </li>
                  <li>
                    <span class="chk-area">
                      <input type="radio" id="reason1" name="flag" value="광고">
                      <label for="reason1">광고</label>
                    </span>
                  </li>
                  <li>
                    <span class="chk-area">
                      <input type="radio" id="reason4" name="flag" value="정치">
                      <label for="reason4">정치</label>
                    </span>
                  </li>
                  <li>
                    <span class="chk-area">
                      <input type="radio" id="reason3" name="flag" value="기타">
                      <label for="reason3">기타</label>
                    </span>
                  </li>
                </ul>
                <div class="text-area">
                  <textarea id="report-comment" name="report-comment" placeholder="위 항목에 없는 내용을 적어주세요" cols="60" rows="9"></textarea>
                </div>
              </div>
              </td>
            </tr>
          </tbody>
          </table>
          <div class="bottom-box" style="display:flex; text-align: center;">
            <button @click="report">신고하기</button> <button @click="Report = false">취소</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="container">
      <div class="box"><h1 class="title">{{ title }}</h1></div>
      <div class="content">
        <div class="content2">{{ content }}</div>
        <div class="menu">
          <button @click="Report = true">신고</button>
          <button @click="match">매칭</button>
          <button v-if="owner" @click="del()">삭제</button>
        </div>
        <div class="userinfo2">
          <div class="box2">
            <div class="avatar"><img src="@/assets/edit.png" class="img"></div>
            <div class="userinfo3">
              <p>이름  {{ admin }}</p>
              <p>학과  {{ department }}</p>
              <div>게시물 2~3개</div>
            </div>
          </div>
          <div class="box2">자기소개</div>
        </div>
      </div>
    </div>
  </template>

<script>
import * as https from '@/api/https'
export default {
  name: 'ContentView',
  data () {
    return {
      BoardId: null,
      postId: null,
      Report: false,
      checkvalue: null,
      title: null,
      content: null,
      userdata: null,
      admin: null,
      username: null,
      owner: false
    }
  },
  mounted () {},
  created () {
    const BoardName = this.$route.params.BoardId
    const postId = this.$route.params.postId
    const url = `/board/${BoardName}/${postId}`
    https.get(url)
      .then((response) => {
        this.title = response.data.title
        this.content = response.data.content
        this.admin = response.data.name
        this.department = response.data.department
      })
      .catch((error) => {
        console.log(error)
      })
    https.get('/profile')
      .then(response => {
        this.username = response.data.name
        if (this.username === this.admin) {
          this.owner = true
        } else {
          this.owner = false
        }
        console.log(response.data)
      })
      .catch(error => {
        alert('현재 유저 정보를 불러올수 없습니다.')
        console.log(error)
      })
  },
  methods: {
    report () {
      const inputs = document.getElementsByName('flag')
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
          this.checkvalue = inputs[i].value
          break
        }
      }
      const data = {
        reportedPostId: this.$route.params.postId,
        content: this.checkvalue
      }
      https.post('/reports/boards', data)
        .then(response => {
          alert('신고되었습니다.')
          localStorage.removeItem('Report')
        })
        .catch(error => {
          console.log(error)
        })
    },
    del () {
      const BoardName = this.$route.params.BoardId
      const postId = this.$route.params.postId
      const url = `/board/${BoardName}/${postId}`
      https.del(url)
        .then(response => {
          alert('삭제되었습니다.')
        })
        .catch(error => {
          alert('삭제 실패했습니다.')
          console.log(error)
        })
    },
    match () {
      if (this.username === this.admin) {
        alert('본인 글에 매칭 요청을 할수 없습니다.')
      } else {
        const postId = this.$route.params.postId
        https.post(`/match/${postId}`)
          .then(response => {
            alert('매칭 요청이 전송되었습니다.')
          })
          .catch(error => {
            alert('매칭 요청이 정상적으로 전송되지 않았습니다.')
            console.log(error)
          })
      }
    }
  }
}
</script>

<style scoped>

.img {
  height: 132px;
  width: 132px;
}
/* 전체 배경색 설정 */
body {
  background-color: #f2f2f2;
}

/* 전체 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

/* 타이틀 */
.title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 유저 정보 */
.userinfo {
  height: 20px;
  font-size: 14px;
  color: #666666;
}

/* 본문 */
.content {
  border: 3px solid #ccc;
  width: 700px;
  height: 700px;
  overflow-y: auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
}

/* 버튼 */
button {
  width: 100px;
  display: block;
  margin-right: 10px;
  border: none;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}

/* 신고 버튼 */
button:first-of-type {
  background-color: #f44336;
}

/* 매칭 버튼 */
button:last-of-type {
  background-color: #4caf50;
}

/* 유저 정보 상자 */
.userinfo2 {
  display: flex;
  width: 700px;
  height: 200px;
  border: 1px solid #ccc;
  margin-top: 20px;
  border-radius: 10px;
  overflow: hidden;
}

/* 유저 정보 상자 내부 */
.box2 {
  margin: 10px;
  display: flex;
  width: 50%;
  border: none;
}

/* 프로필 사진 */
.avatar {
  width: 40%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  align-items: center;
}

/* 유저 정보 상자 내부 */
.userinfo3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  color: #333333;
}

.menu {
  display: flex;
}

/* 신고 모달 */
.report-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

/* 신고 모달 백그라운드 */
.modal-bg {
  width: 600px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-height: 80%;
}
/* 중략 */

.white-bg {
  width: 600px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  max-height: 80%;
  overflow-y: auto;
}

.black-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.R-title {
  height: 30px;
  border-bottom: 1px solid #ccc;
}

.R-content {
  height: 430px;
}

.R-contentbox {
  margin: 10px;
  border: 1px solid #ccc;
  height: 100%;
}

table {
  table-layout: fixed;
  width: 100%;
}

tbody {
  margin: 0;
  padding: 0;
  font: inherit;
  vertical-align: baseline;
  word-break: keep-all;
  display: table-row-group;
}

tr {
  display: table-row;
}

td {
  width: 50%;
  border-bottom: 1px solid #ccc;
  display: table-cell;
}

th {
  vertical-align: middle;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

li {
  display: list-item;
  list-style: none;
  text-align: match-parent;
}

ul {
  display: block;
  padding-left: 0;
}

.chk-area {
  width: 200px;
  display: flex;
}
.content2 {
  height: 430px;
}
</style>
