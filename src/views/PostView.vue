<template>
    <div>
      <form @submit.prevent="submitPost">
        <div>
          <label for="title">제목:</label>
          <input type="text" id="title" v-model="post.title" required>
        </div>
        <div>
          <label for="content">내용:</label>
          <textarea id="content" v-model="post.content" required></textarea>
        </div>
        <button type="submit">글 작성</button>
      </form>
    </div>
  </template>

<script>
export default {
  data () {
    return {
      post: {
        title: '',
        content: ''
      }
    }
  },
  methods: {
    submitPost () {
      // 글 작성 로직 구현
      // this.post.title, this.post.content 변수에 입력된 값이 있습니다.
    }
  }
}
</script>
