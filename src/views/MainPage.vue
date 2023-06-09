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
  position: fixed; width: 25%; height: auto; right: 0;
}
section {
  position: fixed; height: auto; width: 75%;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
template {
  display: flex;
}
</style>
