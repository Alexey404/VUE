<template>
  <div>
    <h3>Список c постами</h3>
    <TransitionGroup name="post-list">
      <PostItem
        v-if="posts[0]"
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @remove="$emit('remove', post)"
      />
      <div v-else>постов нет</div>
    </TransitionGroup>
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

<style scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all .3s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.post-list-move {
  opacity: 0.8;
  transition: transform 0.5s ease;
}

</style>
