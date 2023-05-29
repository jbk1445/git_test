<template>
<div class="title">
    <h1 v-if="Board1">튜터링 게시판</h1>
    <h1 v-if="Board2">동아리 게시판</h1>
    <h1 v-if="Board3">캡스톤 게시판</h1>
    <h1 v-if="Board4">품앗이 게시판</h1>
</div>
<div class="titles">
    <select name="category" class="option" v-model="selectedcategory" v-if="Board1">
        <option value="1">튜터</option>
        <option value="2">튜티</option>
    </select>
    <select name="category2" class="option" v-model="selectedcategory2" :disabled="isDisabled" v-if="Board1">
        <option v-for="option in category2Options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled">
        {{ option.label }}</option>
    </select>
    <label v-if="Board2">필요인원 =
    <select name="club_count" class="option" v-model="club_count" v-if="Board2">
        <option v-for="n in 7" :key='n' :value="n">{{ n }}명</option>
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
      selectedcategory: '',
      selectedcategory2: '1',
      category2Options: [],
      content: '',
      Board1: false,
      Board2: false,
      Board3: false,
      Board4: false,
      BoardName: null
    }
  },
  computed: {
    isDisabled () {
      return this.selectedcategory === '1'
    }
  },
  watch: {
    selectedcategory () {
      if (this.selectedcategory === '1') {
        this.category2Options = [
          { label: '1명', value: '1', disabled: false },
          { label: '2명', value: '2', disabled: false }
        ]
        this.selectedcategory2 = '1'
      } else if (this.selectedcategory === '2') {
        this.category2Options = [
          { label: '1명', value: '1', disabled: false },
          { label: '2명', value: '2', disabled: false }
        ]
        this.selectedcategory2 = '1'
      }
    },
    Board1: function (newValue) {
      if (newValue === false) {
        window.location.reload()
      }
    }
  },
  created () {
    if (localStorage.getItem('Board1') === 'true') { this.Board1 = true; this.BoardName = 'tutoring' }
    if (localStorage.getItem('Board2') === 'true') { this.Board2 = true; this.BoardName = 'club' }
    if (localStorage.getItem('Board3') === 'true') { this.Board3 = true; this.BoardName = 'capstone' }
    if (localStorage.getItem('Board4') === 'true') { this.Board4 = true; this.BoardName = 'poom' }
  },
  methods: {
    updateContent (event) {
      this.content = event.target.innerText
    },
    write () {
      const BoardName = this.BoardName
      const data = {
        boardName: this.BoardName,
        title: this.title,
        content: this.content,
        limitPeople: ''
      }
      const url = `board/${BoardName}`
      let url2 = ''
      if (window.confirm('작성하시겠습니까? ')) {
        if (this.Board1 === true) {
          url2 = '/Board/tutoring'
          data.limitPeople = this.selectedcategory2
        }
        if (this.Board2 === true) {
          url2 = '/Board/club'
          data.limitPeople = this.club_count
        }
        if (this.Board3 === true) {
          url2 = '/Board/capstone'
          data.limitPeople = 3
        }
        if (this.Board4 === true) {
          url2 = '/Board/poom'
          data.limitPeople = 4
        }
        https.post(url, data)
          .then(response => {
            alert('작성되었습니다.')
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
button {
    width: 10%;
    background-color: #fff;
}
</style>
