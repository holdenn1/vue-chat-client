<template>
  <div class="chat-wrapper">
    <ChatsBar/>
  </div>
</template>

<script setup lang="ts">
import ChatsBar from './ChatsBar.vue';
</script>

<style lang="scss" scoped>
.chat-wrapper {
  width: 80vw;
  height: 80vh;
  background-color: white;
  border: 1px solid rgb(92, 92, 92);
  border-radius: 12px;
  box-shadow: 1px 1px 20px 2px rgba(59, 59, 59, 0.75);
}
</style>
