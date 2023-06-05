<template>
  <div>
    <h3>Список постов</h3>
    <PostItem v-for="post in posts" :post="post" :key="post.id"/>
  </div>
</template>

<script>
import PostItem from './PostItem'

export default {
  components: {
    PostItem,
  },

  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
