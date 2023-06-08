<template>
  <div>
    <h1>Страница постов</h1>
    <TealInput placeholder="Поиск..." v-model="searchQuery" />
    <div class="app__btns">
      <TealButton @click="showDialog">Создать пост</TealButton>
      <MySelect v-model="selectedSort" :options="sortOptions" />
    </div>

    <MyDialog v-model:show="dialogVisible" style="margine: 15px">
      <PostForm @create="createPost" />
    </MyDialog>

    <PostList :posts="sortedAndSearchPosts" @remove="removePost" />

    <div class="observer" ref="observer"></div>

    <!-- <div class="page__wrapper">
      <div
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import axios from 'axios'
import TealInput from '@/components/UI/TealInput.vue'

export default {
  components: {
    PostForm,
    PostList,
    TealInput,
  },

  data() {
    return {
      posts: [],
      dialogVisible: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    }
  },

  watch: {
    // page(newPage) {
    //   this.fetchPosts()
    // },
  },

  methods: {
    createPost(newPost) {
      this.posts = [newPost, ...this.posts]
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
    // changePage(pageNumber) {
    //   this.page = pageNumber
    // },

    async fetchPosts() {
      try {
        const response = await axios(
          'https://jsonplaceholder.typicode.com/posts?',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        )
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = response.data
      } catch (e) {
        alert('ОШИБКА    ' + e)
      }
    },

    async loadMorePosts() {
      console.log('ssssss')
      try {
        this.page += 1
        const response = await axios(
          'https://jsonplaceholder.typicode.com/posts?',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        )
        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        )
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('ОШИБКА    ' + e)
      }
    },
  },

  mounted() {
    this.fetchPosts()

    const options = {
      rootMargin: '0px',
      threshhold: 1.0,
    }

    const callback = (entries, observer) => {
      if (
        entries[0].isIntersecting &&
        this.posts[0] &&
        this.page < this.totalPages
      ) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      )
    },
    sortedAndSearchPosts() {
      return this.sortedPosts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
}
</script>

<style>
form {
  display: flex;
  flex-direction: column;
}

.app__btns {
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

/* .page {
  padding: 10px;
  cursor: pointer;
}

.current-page {
  color: teal;
} */

.observer {
  margin-top: 15px;
  height: 30px;
  background-color: teal;
}
</style>
