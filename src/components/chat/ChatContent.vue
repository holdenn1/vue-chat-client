<template>
  <div class="chat-content-wrapper">
    <ChatError v-show="!chatStore.chatState.isShowChat"
      >Select a chat to start a conversation</ChatError
    >
    <div class="chat" v-if="chatStore.chatState.isShowChat">
      <div class="chat-header">
        <div class="member-wrapper">
          <img class="member-avatar" :src="currentMember?.photo" alt="" />
          <span class="member-name">{{ currentMember?.nickname }}</span>
        </div>
      </div>
      <div class="chat-content">
        <div
          v-for="message of chatStore.chatState.messages"
          :key="message.id"
          :class="[
            message.senderId === userStore.userState.user?.id
              ? 'message-of-sender'
              : 'message-of-recipient'
          ]"
        >
          <p>{{ message.message }}</p>
          <span class="message-date">22:00</span>
        </div>
      </div>
      <div class="chat-message-form-wrapper">
        <ChatForm :recipient="currentMember" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatForm from 'components/forms/ChatForm.vue'
import ChatError from '../errors/ChatError.vue'

import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import { useRoute } from 'vue-router'
import { watch } from 'vue'
import type { User } from '@/store/types/userStoreTypes'

defineProps<{ currentMember: User | undefined }>()

const chatStore = useChatStore()
const userStore = useUserStore()

const route = useRoute()

watch(
  () => route.query,
  async () => {
    if (route.query.chatId) {

      chatStore.fetchMessages(route.query.chatId as string)
    }
  }
)
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/scrollbar.scss';
@import '@/styles/mixins/d-flex-ctr.scss';
.chat-content-wrapper {
  width: 100%;
  height: 100%;
  grid-area: chat-content;
  .chat {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .chat-header {
      width: 100%;
      height: 88.5px;
      background-color: rgb(73, 10, 144);
      flex-shrink: 0;
      @include flexCenter;
      .member-wrapper {
        display: flex;
        align-items: center;
        .member-avatar {
          width: 48px;
          height: 48px;
          border-radius: 100%;
          margin-right: 12px;
        }
        .member-name {
          font-size: 18px;
          color: white;
        }
      }
    }
    .chat-content {
      flex: 1 1 auto;
      overflow-x: hidden;
      overflow-y: auto;
      display: flex;
      flex-direction: column-reverse;
      padding: 10px;
      @include scrollbar(4px, black);
      .message-of-sender {
        background-color: #679ce3;
        margin-left: auto;
        text-align: right;
      }
      .message-of-recipient {
        background-color: #2baadd;
        margin-right: auto;
        text-align: left;
      }

      .message-of-recipient,
      .message-of-sender {
        max-width: 80%;
        min-width: 60px;
        padding: 10px 10px 24px;
        margin-top: 14px;
        border-radius: 12px;
        position: relative;
        font-weight: 500;
        line-height: 120%;
        
        .message-date {
          position: absolute;
          bottom: 4px;
          right: 10px;
          font-size: 12px;
        }
      }
    }
    .chat-message-form-wrapper {
      width: 100%;
      height: 120px;
      background-color: rgb(73, 10, 144);
      padding: 20px;
    }
  }
}
</style>
