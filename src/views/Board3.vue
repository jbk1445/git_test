<template>
  <section>
    <ViewBody3/>
  </section>
  <aside>
    <HomeMenu/>
  </aside>
</template>
<script>
import HomeMenu from '../components/HomeMenu.vue'
import ViewBody3 from '../components/ViewBody3.vue'

export default {
  name: 'BoardCapstone',
  components: {
    HomeMenu,
    ViewBody3
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
