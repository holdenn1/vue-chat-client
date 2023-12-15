<template>
  <div class="chat-content">
    <ChatError>Select a chat to start a conversation</ChatError>
  </div>
</template>

<script setup lang="ts">
import ChatError from '../errors/ChatError.vue'
</script>

<style lang="scss" scoped>
.chat-content {
  width: 100%;
  height: 100%;
  grid-area: chat-content;
}
</style>
