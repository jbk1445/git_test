<template>
    <div class="container">
      <section>
        <WriteBody/>
      </section>
      <aside>
        <HomeMenu/>
      </aside>
    </div>
  </template>

<script>
import HomeMenu from '../components/HomeMenu.vue'
import WriteBody from '../components/WriteBody.vue'

export default {
  name: 'BoardWrite',
  components: {
    HomeMenu,
    WriteBody
  }
}
</script>

  <style scoped>

  .container {
    height: 100%;
    overflow-y: scroll;
  }

  aside {
    position: fixed;
    width: 25%;
    z-index: 9;
    right: 0;
    top: 0;
    height: 100%;
    border-left: 1px solid #d6d6d6;
    background-color: #fff;
  }

  section {
    position: absolute;
    flex: 3;
    height: 100%;
    width: 69%;
  }
  </style>
