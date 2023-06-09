<template>
  <body>
    <section>
      <div class="form-box">
        <div class="form-value">
          <h2> <a href="/" class="logo"><img src="../assets/newlogo2.png" height="100" width="100"></a>회원가입</h2>
            <table>
              <tr>
                <td>
                  <p>이메일</p>
                  <div class="inputbox">
                    <input type="email" v-model="email" :readonly="IsVerify" placeholder="@mju.ac.kr">
                  </div>
                </td>
                <td>
                  <div v-if="IsVerify == false">
                    <p style="float: left; margin-right: 10px;">이메일 인증</p>
                    <button class="verify" @click="gocheck">인증</button>
                  </div>
                  <div>
                    <p style="float: left; margin-right: 10px;">게스트 회원가입</p>
                    <ToggleSwitch :value="toggleValue" @input="toggleValue  = $event"/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p>비밀번호</p>
                  <div class="inputbox">
                    <input type="password" v-model="password" required>
                  </div>
                </td>
                <td>
                  <p>비밀번호 확인</p>
                  <div class="inputbox">
                    <input type="password" required v-model="ConfirmPassword">
                    <label><div v-if="!passwordMatch && this.ConfirmPassword">비밀번호가 일치하지 않습니다.</div></label>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p>이름</p>
                  <div class="inputbox">
                    <input type="name" v-model="name" required :readonly="toggleValue">
                  </div>
                </td>
                <td>
                  <p>학과</p>
                  <div class="inputbox">
                    <input type="department" v-model="department" required :readonly="toggleValue">
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <label for="birthdate">생년월일</label>
                  <div class="inputbox" style="width: 620px; border: none;">
                    <input type="text" class="birth" style="width: 175px; border: 2px solid #ccc;
                     border-radius: 0; margin-right: 10px;" v-model="year" placeholder="년(4자리)" required :readonly="toggleValue">
                    <input type="text" class="birth" style="width: 175px; border: 2px solid #ccc;
                     border-radius: 0; margin-right: 10px;" v-model="month" placeholder="월" required :readonly="toggleValue">
                    <input type="text" class="birth" style="width: 175px; border: 2px solid #ccc;
                     border-radius: 0;" v-model="day" required placeholder="일" :readonly="toggleValue">
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p>학년</p>
                  <div class="inputbox">
                    <select v-model="grade" required class="grade" :disabled="toggleValue">
                      <option disabled value="">please select one</option>
                      <option>1학년</option>
                      <option>2학년</option>
                      <option>3학년</option>
                      <option>4학년</option>
                    </select>
                  </div>
                </td>
                <td>
                  <p>성별</p>
                  <div class="inputbox">
                    <select v-model="sex" required class="grade" :disabled="toggleValue">
                      <option disabled value="">please select one</option>
                      <option>남</option>
                      <option>여</option>
                    </select>
                  </div>
                </td>
              </tr>
            </table>
            <button @click="register">회원가입</button>
            <div class="register">
              <p>로그인 하시겠습니까?<a href="/LoginCheck">로그인</a></p>
            </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import { defineComponent } from 'vue'
import http from '@/api/http'

export default defineComponent({
  data () {
    return {
      year: '',
      month: '',
      day: '',
      email: '',
      password: '',
      ConfirmPassword: '',
      department: '',
      name: '',
      IsVerify: false,
      loading: false,
      grade: '',
      sex: '',
      toggleValue: false
    }
  },
  components: {
    ToggleSwitch
  },
  mounted () {
    if (localStorage.getItem('IsVerify')) {
      this.email = localStorage.getItem('email')
      this.IsVerify = JSON.parse(localStorage.getItem('IsVerify'))
    }
    window.addEventListener('beforeunload', () => {
      if (localStorage.getItem('IsVerify')) {
        localStorage.removeItem('IsVerify')
        localStorage.removeItem('email')
      }
    })
  },
  computed: {
    passwordMatch () {
      return this.password === this.ConfirmPassword
    }
  },
  watch: {
    toggleValue (newValue) {
      if (newValue === true) {
        this.name = 'guest'
        this.department = 'guestdepart'
        this.year = '2023'; this.month = '06'; this.day = '07'
        this.grade = '2학년'; this.sex = '여'
      } else {
        this.name = ''
        this.department = ''
        this.year = ''; this.month = ''; this.day = ''
        this.grade = ''; this.sex = ''
      }
    }
  },
  methods: {
    convertGradetoInt (grade) {
      const gradeMapping = {
        '1학년': 1,
        '2학년': 2,
        '3학년': 3,
        '4학년': 4
      }
      return gradeMapping[grade]
    },
    onSubmit () {
      if (!this.passwordMatch) {
        alert('비밀번호가 일치하지 않습니다.')
      }
    },
    gocheck () {
      this.$router.push('/Email_verify')
    },
    register () {
      const birthdate = `${this.year}-${this.month}-${this.day}`
      const data = {
        loginId: this.email,
        password: this.password,
        checkPassword: this.password,
        name: this.name,
        birth: birthdate,
        department: this.department,
        gradle: this.convertGradetoInt(this.grade),
        sex: this.sex
      }
      if (this.IsVerify === true) {
        http.post('/join', data)
          .then(response => {
            alert('회원가입이 완료되었습니다.')
            this.$router.push('/LoginCheck')
          })
          .catch(error => {
            alert(error.response.status)
            console.log(error.response.data)
            console.log(error)
          })
      } else {
        alert('이메일 인증이 필요합니다.')
      }
    }
  }
})
</script>

<style scoped>
.logo {
  position: relative;
  top: 30px;
}
.verify {
  width: 30%;
  height: 36px;
}

section{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 130vh;
    width: 100%;
}

.form-box{
    position: center;
    width: 600px;
    height: 600px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0, 5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.grade {
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
h2{
    font-size: 2em;
    color: #0E1D31;
    text-align: center;
}
.inputbox{
    position: relative;
    margin: 30px 0;
    width: 310px;
    height: 60px;
    border: 2px solid #ccc;
}
.inputbox label{
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: gray;
    font-size: 1em;
    pointer-events: none;
    transition: .5s;
}
input:focus ~ label,
input:valid ~ label{
top: 50px;
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
.forget{
    margin: -15px 0 15px;
    font-size: .9em;
    color: gray;
    display: flex;
    justify-content: center;
}
.forget label input{
    margin-right: 3px;
}
.forget label a{
    color: gray;
    text-decoration: none;
}
.forget label a:hover{
    text-decoration: underline;
}
.check {
    position: absolute;
    width: 30%;
    right: -40%;
    top: 15%;
}
button{
    width: 100%;
    height: 40px;
    border-radius: 40px;
    background: #0E1D31;
    border: none;
    outline: none;
    cursor: 1em;
    font-weight: 600;
}
.register{
    font-size: .9em;
    color: #0E1D31;
    text-align: center;
    margin: 25px 0 10px;
}
.register p a{
    text-decoration: none;
    color: gray;
    font-weight: 600;
}
p {
  height: 2px;
}
</style>
