<template>
  <div id="app">
    <NaviBar/>
  </div>
  <router-view/>
</template>

<script>
import NaviBar from '@/components/NaviBar.vue'
export default {
  components: {
    NaviBar
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap");
html, body {
  height: 100%;
}
body {
  font-family: "Roboto", sans-serif;
}
</style>
