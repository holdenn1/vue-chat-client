<template>
  <div class="chat-wrapper">
    <ChatsBar @set-current-member="(member) => (currentMember = member)" />
    <ChatContent :current-member="currentMember" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatContent from './ChatContent.vue'
import ChatsBar from './ChatsBar.vue'
import type { User } from '@/store/types/userStoreTypes'

const currentMember = ref<User | undefined>()
</script>

<style lang="scss" scoped>
.chat-wrapper {
  width: 80vw;
  height: 80vh;
  background-color: white;
  border: 1px solid rgb(92, 92, 92);
  border-radius: 12px;
  box-shadow: 2px 2px 20px 6px rgba(35, 35, 35, 0.75);
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(200px, 320px) 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas:
    'chat-bar chat-content'
    'chat-bar chat-content';
}
</style>
