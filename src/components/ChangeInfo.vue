<template>
    <div class="black-bg" v-if="Ismodal">
        <div class="white-bg">
            <h4 style="display: flex;">개인정보 수정
            <button @click="Ismodal = false">닫기</button></h4>
            <p>이름</p>
            <p class="change" v-if="!ChangeName">{{ name }} <button @click="ChangeName = true">변경</button></p>
            <p v-else class="change"><input key="name" v-model="name"><button @click="inputchange()">변경</button></p>
            <p>학과</p>
            <p class="change" v-if="!ChangeDep">{{ department }} <button @click="ChangeDep = true">변경</button></p>
            <p class="change" v-else><input type="date" key="department" v-model="department"><button @click="inputchange()">변경</button></p>
            <p>학년</p>
            <p class="change" v-if="!ChangeGrade">{{ grade }} <button @click="ChangeGrade = true">변경</button></p>
            <p class="change" v-else><select name="grade" v-model="grade">
                <option value=1>1학년</option>
                <option value=2>2학년</option>
                <option value=3>3학년</option>
                <option value=4>4학년</option>
            </select><button @click="inputchange()">변경</button></p>
            <p>성별</p>
            <p class="change" v-if="!ChangeSex">{{ sex }} <button @click="ChangeSex = true">변경</button></p>
            <p class="change" v-else><select name="sex" v-model="sex">
                <option value="남성">남성</option>
                <option value="여성">여성</option>
            </select><button @click="inputchange()">변경</button></p>
        </div>
    </div>
    <div class="menu">
        <div class='title'>계정 정보</div>
        <div class="container">
            <h1>공개 프로필</h1>
            <p>사용자 이름 {{ name }}</p>
        </div>
        <div class="container2">
            <div style="display:flex;"><h1 style="width: 70%;">개인 정보</h1><button @click="Ismodal = true">편집</button></div>
            <div class="list">이름 {{ name }}</div>
            <div class="list">학과 {{ department }}</div>
            <div class="list">학년 {{ grade }}</div>
            <div class="list">성별 {{ sex }}</div>
        </div>
        </div>
    </template>

<script>
import * as https from '@/api/https'
export default {
  data () {
    return {
      ChangeDep: false,
      ChangeGrade: false,
      ChangeSex: false,
      ChangeName: false,
      Ismodal: false,
      name: '',
      department: '',
      grade: '',
      sex: ''
    }
  },
  mounted () {
    https.get('/profile')
      .then(response => {
        this.name = response.data.name
        this.department = response.data.department
        this.grade = response.data.gradle
        this.sex = response.data.sex
        console.log(this.name, this.department, this.grade, this.sex)
      })
      .catch(error => {
        alert('error')
        console.log(error)
      })
  },
  methods: {
    inputchange () {
      https.patch('/my', {
        name: this.name,
        gradle: this.grade,
        sex: this.sex,
        department: this.department
      })
        .then(response => {
          alert('변경되었습니다.')
        })
        .catch(error => {
          alert('에러')
          console.log(error)
        })
    }
  }
}
</script>

    <style scoped>
    .change {
        display: flex;
        justify-content: space-between;
    }
    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    .container {
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }
    .container h1 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .container p {
      font-size: 1.2rem;
    }
    .container2 {
      width: 50%;
      margin: 0 auto;
    }
    .container, .container2 {
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 20px;
    }
    .container2 div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .container2 .list {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 0.5rem;
      background-color: #007aff;
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
      width: 40%;
    }
    .list {
        border-bottom: 2px solid gray;
        width: 70%;
    }
    .white-bg {
        width: 600px;
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
    .white-bg h4 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      justify-content: space-between;
    }

    .white-bg p {
      margin: 10px 0;
      font-size: 18px;
    }

    .white-bg input[type="date"], .white-bg select {
      width: 100%;
      padding: 8px 16px;
      font-size: 18px;
      border-radius: 5px;
      border: none;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      margin-right: 10px;
    }

    .white-bg button {
      font-size: 18px;
      padding: 8px 16px;
      border-radius: 5px;
      border: none;
      background-color: #000000;
      color: #ffffff;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .white-bg button:hover {
      background-color: #444444;
    }
    </style>
