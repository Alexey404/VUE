<template>
  <div class="App">
    <h1>Страница постов</h1>
    <div class="app__btns">
      <TealButton @click="showDialog">Создать пост</TealButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>

    <MyDialog v-model:show="dialogVisible" style="margine: 15px">
      <PostForm @create="createPost" />
    </MyDialog>

    <PostList :posts="sortedPosts" @remove="removePost" />
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
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
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

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
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

.app__btns {
  display: flex;
  justify-content: space-between;
}
</style>
