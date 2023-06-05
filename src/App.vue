<template>
  <div class="App">
    <h1>Страница постов</h1>
    <TealButton @click="showDialog">Создать пост</TealButton>
    <MyDialog v-model:show="dialogVisible" style="margine: 15px">
      <PostForm @create="createPost" />
    </MyDialog>

    <PostList :posts="posts" @remove="removePost" />
  </div>
</template>

<script>
import PostForm from './components/PostForm'
import PostList from './components/PostList'
import axios from 'axios'

export default {
  components: {
    PostForm,
    PostList,
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
    }
  },

  methods: {
    createPost(newPost) {
      this.posts.push(newPost)
      this.dialogVisible = false
    },

    inputTitle(e) {
      this.title = e.target.value
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      try {
        const response = await axios(
          'https://jsonplaceholder.typicode.com/posts?_limit=10'
        )
        this.posts = response.data
      } catch (e) {
        alert('ОШИБКА    ' + e)
      }
    },
  },
  mounted() {
    this.fetchPosts()
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
