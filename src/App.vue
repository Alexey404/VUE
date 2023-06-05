<template>
  <div class="App">
    <PostForm @create="createPost" />
    <PostList :posts="posts" />
  </div>
</template>

<script>
import PostForm from './components/PostForm'
import PostList from './components/PostList'

export default {
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      posts: [
        { id: 1, title: 'JS', body: 'Описание поста 1' },
        { id: 2, title: 'JS', body: 'Описание поста 2' },
        { id: 3, title: 'JS', body: 'Описание поста 3' },
      ],
    }
  },

  methods: {
    createPost(newPost) {
      this.posts.push(newPost)
    },

    inputTitle(e) {
      this.title = e.target.value
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.App {
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}
</style>
