<template>
    <div class="container">
      <aside class="mypage">
        <MypageMenu @change-section="changeSection"/>
      </aside>
      <section>
        <MypageMain @change-section="changeSection" v-if="Main"/>
        <ChangeInfo v-if="Info"/>
        <ChangePw v-if="Pw"/>
      </section>
    </div>
  </template>

<script>
import MypageMain from '../components/MypageMain.vue'
import MypageMenu from '../components/MypageMenu.vue'
import ChangeInfo from '../components/ChangeInfo.vue'
import ChangePw from '../components/ChangePassword.vue'

export default {
  name: 'BoardMypage',
  components: {
    ChangeInfo,
    ChangePw,
    MypageMenu,
    MypageMain
  },
  data () {
    return {
      Main: true,
      Info: false,
      PW: false
    }
  },
  methods: {
    changeSection (section) {
      this.Main = section === 'Main'
      this.Info = section === 'Info'
      this.Pw = section === 'Pw'
    }
  }
}
</script>

  <style scoped>

  .container {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .mypage {
    width: 20%;
    border-right: 1px solid #ccc;
  }

  section {
    flex: 1;
    height: 100%;
  }
  </style>
