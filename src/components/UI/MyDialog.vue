<template>
  <div class="dialog" v-if="show" @click="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false)
    },
  },
}
</script>

<style scoped>
.dialog {
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background: #fff;
  border-radius: 12px;
  min-height: 400px;
  min-width: 600px;
  padding: 20px;
}
</style>
