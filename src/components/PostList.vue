<template>
  <div>
    <h3>Список c постами</h3>
    <PostItem
      v-if="posts[0]"
      v-for="post in posts"
      :post="post"
      :key="post.id"
      @remove="$emit('remove', post)"
    />
    <div v-else>постов нет</div>
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
