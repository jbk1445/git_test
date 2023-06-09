<template>
  <ul class="menu">
    <li class="menu-item" v-for="link in links" :key="link.id" v-on:click="toggleSubmenu(link.id)">
      <a :href="link.id === 2 ? 'javascript:void(0)' :link.href" class="menu-link">
        <i class="menu-icon" :class="link.icon"></i>
        <span>{{ link.text }}</span>
      </a>
      <ul v-if="link.id === 2 && submenuVisible" class="submenu">
        <li v-for="board in boardLinks" :key="board.id">
          <a :href="board.href">{{ board.text }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      sliderPosition: 0,
      selectedElementWidth: 0,
      selectedIndex: 0,
      submenuVisible: false,
      links: [
        {
          id: 1,
          href: '/',
          text: 'Home'
        },
        {
          id: 2,
          text: '게시판'
        },
        {
          id: 3,
          text: '공지사항',
          href: '/Board/Notice'
        }
      ],
      boardLinks: [
        {
          id: 1,
          text: '튜터링',
          href: '/Board/tutoring'
        },
        {
          id: 2,
          text: '동아리',
          href: '/Board/club'
        },
        {
          id: 3,
          text: '캡스톤',
          href: '/Board/capstone'
        },
        {
          id: 4,
          text: '품앗이',
          href: '/Board/poom'
        }
      ]
    }
  },
  methods: {
    toggleSubmenu (id) {
      if (id === 2) {
        this.submenuVisible = !this.submenuVisible
      } else {
        this.submenuVisible = false
      }
    }
  }
}
</script>

<style>
:root {
  --link-text-color: #f1faee;
  --menu-background-color: #0E1D31;
  --active-background-color: #0E1D31;
}

.menu {
  padding: 0;
  margin: 0;
  position: relative;
  background-color: var(--menu-background-color);
  display: inline-block;
  width: 100%;
  right: 0px;
  border-radius: 4px;
  list-style-type: none;
}

.menu-item {
  display: inline-flex;
}

.menu-link {
  padding: 0.75rem 1rem;
  display: inline-flex;
  align-items: center;
  color: var(--link-text-color);
  text-decoration: none;
}

.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  margin-right: 0.2rem;
}

.submenu {
  padding: 0;
  margin: 0;
  list-style-type: none;
  position: absolute;
  z-index: 2;
  background-color: #0E1D31;
  top: 100%;
  left: 115px;
  border-radius: 2px;
  width: 100px;
  text-align: center;
}

.submenu li a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  display: block;
}

.submenu li a:hover {
  background-color: #0E1D31;
}
</style>
