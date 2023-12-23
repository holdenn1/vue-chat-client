<template>
  <div class="recommendation-members">
    <img class="member-avatar" :src="chat.member.photo" alt="" />
    <img
      class="member-menu"
      @click.stop="() => chatStore.removeChatAction(chat)"
      src="@/icons/icons8-remove.svg"
      alt=""
    />
    <span class="member-name">{{ chat.member.nickname }}</span>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/store/chatStore'
import type { Chat } from '@/store/types/chatStoreTypes'

defineProps<{ chat: Chat }>()

const chatStore = useChatStore()
</script>

<style lang="scss" scoped>
.recommendation-members {
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
  border-bottom: 1px solid rgb(76, 76, 76);
  padding: 6px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  &:hover {
    background-color: #9d8ee0;
  }
  .member-avatar {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 12px;
  }
  .member-menu {
    height: 20px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
    cursor: pointer;
  }
}
</style>
