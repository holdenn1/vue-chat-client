<template>
  <div class="recommendation-members" :class="{ 'has-new-messages': hasNewMessages }">
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
import { ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'

import type { Chat } from '@/store/types/chatStoreTypes'
import { useUserStore } from '@/store/userStore'

const props = defineProps<{ chat: Chat }>()

const { chat } = toRefs(props)
const route = useRoute()

const hasNewMessages = ref<boolean>(false)

watchEffect(() => {
  const chatId = route.query.chatId as string
  const lastSendMessage = chat.value.messages[0]
  
  if (
    lastSendMessage.createdDate > chat.value.lastReadMessageDate &&
    lastSendMessage.senderId !== useUserStore().userState.user?.id
  ) {
    hasNewMessages.value = true
  }
  if (+chatId === chat.value.id) {
    hasNewMessages.value = false
  }
})
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

.has-new-messages {
  background-color: #93a0f7;
}
</style>
