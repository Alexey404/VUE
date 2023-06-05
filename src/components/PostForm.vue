<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <TealInput v-model="post.title" type="text" placeholder="Название" />
    <TealInput v-model="post.body" type="text" placeholder="Описание" />
    <TealButton class="btn" @click="createPost">Создать</TealButton>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: '',
      },
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    },
  },
}
</script>

<style>
.btn {
  margin-top: 15px;
}
</style>
