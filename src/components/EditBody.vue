<template>
    <div class="title">
        <h1>글 수정</h1>
    </div>
    <div class="titles">
        <label>필요인원 =
        <select name="count" class="option" v-model="count">
          <option v-for="n in 10" :key='n' :value="n">{{ n }}명</option>
        </select></label>
        <div class="inputbox">
            <input type="write_title" v-model="title" placeholder="제목을 입력하세요">
        </div>
        <div class="editbox">
            <div class="editarea" contenteditable @input="updateContent" ref="editarea"></div>
            <div class="endline">
                <button class="write" @click="write()">
                <img class="img" src="../assets/pencil.png"></button>
            </div>
        </div>
      </div>
</template>

<script>
import * as https from '@/api/https'
export default {
  data () {
    return {
      username: 'jkyu1445',
      count: '',
      content: '',
      BoardName: this.$route.params.BoardId,
      postId: this.$route.params.postId
    }
  },
  methods: {
    updateContent (event) {
      this.content = event.target.innerText
    },
    write () {
      const BoardName = this.BoardName
      const postId = this.postId
      const data = {
        boardName: this.BoardName,
        title: this.title,
        content: this.content,
        limitPeople: this.count
      }
      const url = `board/${BoardName}/${postId}`
      let url2 = ''
      if (window.confirm('작성하시겠습니까? ')) {
        url2 = `/Board/${this.BoardName}/view/${postId}`
        https.patch(url, data)
          .then(response => {
            alert('수정되었습니다.')
            this.$router.push(url2)
          })
          .catch(error => {
            console.error(`Failed to create a new post. Error message: ${error.message}`)
            console.error(error)
          })
      } else {
        location.reload()
      }
    }
  }
}
</script>
<style scoped>
.option {
  width: 30%; height: 30%;
}
.img {
  width: 20px; height: 20px;
}
.write {
  float: right;
}
.endline {
  border: 1px solid black;
  height: 6%;
}
.icon {
  width: 16px; height: 16px;
}
.editarea {
  font-size: large;
  border: 1px solid black;
  height: 85%;
}
.btn-group {
  display: flex;
  width: 15%;
  background-color: white;
}
.edittool {
  border: 1px solid black;
  display: block;
  height: 15%;
}
.editbox {
  display: block;
  height: 100%;
}
.inputbox input{
  width: 100%;
  height: 50px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1em;
  padding: 0 35 0 5px;
  color: gray;
}
.inputbox {
  position: relative;
  margin: 30px 0;
  width: 310px;
  border-bottom: 2px solid gray;
}
.title {
  position: relative;
  left: 20%; top: 10%;
  display: block; font-size: medium;
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
button {
  width: 10%;
  background-color: #fff;
}
</style>
