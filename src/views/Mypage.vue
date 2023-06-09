<template>
    <aside class="mypage">
      <MypageMenu @change-section-main="changeSection('Main')" @change-section-info="changeSection('Info')" @change-section-pw="changeSection('Pw')"
      @change-section-mywrite="changeSection('Mywrite')" @change-section-myapply="changeSection('MyApply')"/>
    </aside>
    <section>
      <component :is="currentSectionComponent" @change-section="changeSection"/>
    </section>
  </template>

<script>
import MypageMain from '../components/MypageMain.vue'
import MypageMenu from '../components/MypageMenu.vue'
import ChangeInfo from '../components/ChangeInfo.vue'
import ChangePw from '../components/ChangePassword.vue'
import Mywrite from '@/components/MycontentView.vue'
import MyApply from '@/components/MyApplyView.vue'

export default {
  name: 'BoardMypage',
  components: {
    ChangeInfo,
    ChangePw,
    MypageMenu,
    MypageMain,
    Mywrite,
    MyApply
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
      } else if (this.currentSection === 'MyApply') {
        return MyApply
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
.mypage {
  top: 10%;
  position: fixed; width: 25%; z-index: 9; left: 0; height: 100%; overflow-y: auto; -ms-overflow-style: none; background-color: white; flex: 0.6;
}

section {
  top: 10%;
  position: fixed; flex: 3; height: 100%; width: 75%; right: 0;
}
</style>
