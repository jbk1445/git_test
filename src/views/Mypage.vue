<template>
    <div class="container">
      <aside class="mypage">
        <MypageMenu @change-section-main="changeSection('Main')" @change-section-info="changeSection('Info')" @change-section-pw="changeSection('Pw')" @change-section-mywrite="changeSection('Mywrite')"/>
      </aside>
      <section>
        <component :is="currentSectionComponent" @change-section="changeSection"/>
      </section>
    </div>
  </template>

<script>
import MypageMain from '../components/MypageMain.vue'
import MypageMenu from '../components/MypageMenu.vue'
import ChangeInfo from '../components/ChangeInfo.vue'
import ChangePw from '../components/ChangePassword.vue'
import Mywrite from '@/components/MycontentView.vue'

export default {
  name: 'BoardMypage',
  components: {
    ChangeInfo,
    ChangePw,
    MypageMenu,
    MypageMain,
    Mywrite
  },
  data () {
    return {
      currentSection: 'Main'
    }
  },
  computed: {
    currentSectionComponent () {
      if (this.currentSection === 'Main') {
        return MypageMain
      } else if (this.currentSection === 'Info') {
        return ChangeInfo
      } else if (this.currentSection === 'Pw') {
        return ChangePw
      } else if (this.currentSection === 'Mywrite') {
        return Mywrite
      }
      return null
    }
  },
  methods: {
    changeSection (section) {
      this.currentSection = section
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
