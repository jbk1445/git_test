<template>
  <section>
    <ViewBody/>
  </section>
  <aside>
    <HomeMenu/>
  </aside>
</template>

<script>
import HomeMenu from '../components/HomeMenu.vue'
import ViewBody from '../components/ViewBody.vue'

export default {
  name: 'BoardTutoring',
  components: {
    HomeMenu,
    ViewBody
  }
}
</script>

<style scoped>

aside {
  position: fixed; width: 25%; z-index: 9; right: 0; top: 0; height: 100%; overflow-y: auto; -ms-overflow-style: none; background-color: white; flex: 0.6;
}

section {
  position: fixed; flex: 3;
  height: 100%; width: 75%;
}
</style>
