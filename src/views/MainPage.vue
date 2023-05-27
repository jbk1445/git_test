<template>
    <section>
      <HomeBody/>
    </section>
    <aside>
      <HomeMenu/>
    </aside>
</template>

<script>
import HomeMenu from '../components/HomeMenu.vue'
import HomeBody from '../components/HomeBody.vue'

export default {
  data () {
    return {
      isLoggedIn: false
    }
  },
  created () {
    // 로그인 여부 확인 로직
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.isLoggedIn = true
    }
  },
  watch: {
    isLoggedIn: function (newValue) {
      if (newValue === false) {
        window.location.reload()
      }
    }
  },
  name: 'MainPage',
  components: {
    HomeMenu,
    HomeBody
  }
}
</script>

<style scoped>
aside {
  position: fixed; width: 25%; z-index: 9; right: 0; top: 0; height: 100%; overflow-y: auto; -ms-overflow-style: none; border-left: 1px solid #d6d6d6; background-color: #fff; flex: 0.6;
}
section {
  position: fixed; flex: 3;
  height: 100%;
  width: 69%;
}
</style>
