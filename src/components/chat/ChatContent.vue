<template>
  <div class="chat-content-wrapper">
    <!-- <ChatError>Select a chat to start a conversation</ChatError> -->
    <div class="chat" v-if="chatStore.chatState.isShowChat">
      <div class="chat-header">
        <div class="member-wrapper">
          <img class="member-avatar" :src="currentMember?.photo" alt="" />
          <span class="member-name">{{ currentMember?.nickname }}</span>
        </div>
      </div>
      <div class="chat-content">
        <div class="message-of-sender">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dolores.</p>
          <span class="message-date">21:52</span>
        </div>
        <div class="message-of-recipient">
          <p>Lorem ipsum dolor sit.</p>
          <span class="message-date">21:53</span>
        </div>
      </div>
      <div class="chat-message-form-wrapper">
        <ChatForm :recipient-id="currentMember?.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatForm from 'components/forms/ChatForm.vue'
// import ChatError from '../errors/ChatError.vue'

import { useChatStore } from '@/store/chatStore'
import type { User } from '@/store/types/userStoreTypes'

defineProps<{ currentMember: User | undefined }>()

const chatStore = useChatStore()
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
      @include flexCenter;
      .member-wrapper {
        display: flex;
        align-items: center;
        .member-avatar {
          width: 40px;
          height: 40px;
          background-color: green;
          border-radius: 100%;
          margin-right: 12px;
        }
        .member-name {
          font-size: 18px;
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
      }
      .message-of-recipient {
        background-color: #2baadd;
        margin-right: auto;
      }

      .message-of-recipient,
      .message-of-sender {
        max-width: 80%;
        padding: 10px 10px 22px;
        margin-top: 14px;
        border-radius: 12px;
        position: relative;
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
