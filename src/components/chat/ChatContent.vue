<template>
  <div class="chat-content-wrapper">
    <ChatError v-show="!chatStore.chatState.isShowChat"
      >Select a chat to start a conversation</ChatError
    >
    <div class="chat" v-show="chatStore.chatState.isShowChat">
      <div class="chat-header">
        <img class="arrow-back" @click="closeChat" src="@/icons/icons8-left-arrow-48.png" alt="" />
        <div class="member-wrapper">
          <img class="member-avatar" :src="currentMember?.photo" alt="" />
          <span class="member-name">{{ currentMember?.nickname }}</span>
        </div>
      </div>
      <div ref="chatContainer" class="chat-content">
        <Transition>
          <div v-show="isArrowShow" class="arrow-down-wrapper">
            <img
              @click="scrollToElement"
              class="arrow-down"
              src="@/icons/icons8-arrow-down-48.png"
              alt=""
            />
          </div>
        </Transition>
        <template v-for="(message, inx) of chatStore.chatState.messages" :key="message.id">
          <div
            :class="[
              message.senderId === userStore.userState.user?.id
                ? 'message-of-sender'
                : 'message-of-recipient'
            ]"
          >
            <p>{{ message.message }}</p>
            <span class="message-date">{{ correctDate(message.createdDate) }}</span>
          </div>
          <div v-if="showDateBlock(inx)">
            <div class="date-block">
              {{ formatDate(message.createdDate) }}
            </div>
          </div>
        </template>
        <div ref="div"></div>
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
import { useRoute, useRouter } from 'vue-router'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { User } from '@/store/types/userStoreTypes'

defineProps<{ currentMember: User | undefined }>()

const chatStore = useChatStore()
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const div = ref()
const chatContainer = ref()
const isArrowShow = ref()
const scrollTopTo = ref(0)

function closeChat() {
  chatStore.setShowChat(false)
  chatStore.clearChat()
  router.push({ name: 'chats' })
}

const observer = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting && !loading.value) {
    loading.value = true

    if (route.query.chatId) {
      chatStore.fetchMessages(route.query.chatId as string)
    }

    loading.value = false
  }
})

onMounted(() => {
  observer.observe(div.value)
  chatContainer.value.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(
  () => (observer.disconnect(), chatContainer.value.removeEventListener('scroll', handleScroll))
)

watch(
  () => route.query,
  async () => {
    if (route.query.chatId) {
      chatStore.setCurrentMessagesPage(1)
      chatStore.clearChat()
      chatStore.fetchMessages(route.query.chatId as string)
    }
  }
)

watch(
  () => chatStore.chatState.messages.length,
  () => {
    nextTick(() => {
      scrollToElement()
    })
  }
)
function correctDate(dateTimeString: Date) {
  const dateTime = new Date(dateTimeString)
  const hours = dateTime.getHours()
  const minutes = dateTime.getMinutes()

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
}

function showDateBlock(index: number) {
  if (index === chatStore.chatState.messages.length - 1) return true

  const currentDate = new Date(chatStore.chatState.messages[index].createdDate)
  const nextDate = new Date(chatStore.chatState.messages[index + 1].createdDate)

  return currentDate.toDateString() !== nextDate.toDateString()
}

function formatDate(dateString: Date) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function scrollToElement() {
  chatContainer.value.scrollTo({
    top: chatContainer.value.scrollHeight,

    behavior: 'smooth'
  })
  isArrowShow.value = false
}

function handleScroll() {
  scrollTopTo.value = chatContainer.value.scrollTop

  if (scrollTopTo.value < -245) {
    isArrowShow.value = true
  } else {
    isArrowShow.value = false
  }
}
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
      position: relative;
      @include flexCenter;

      .arrow-back {
        position: absolute;
        top: 50%;
        left: 20px;
        transform: translate(0, -50%);
        cursor: pointer;
      }
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
      position: relative;
      @include scrollbar(4px, black);
      .arrow-down-wrapper {
        position: absolute;
        z-index: 1000;
        bottom: 80px;
        right: 56px;
        .arrow-down {
          position: fixed;
          opacity: 0.7;
          transition: 0.3s;
          cursor: pointer;
          &:hover {
            opacity: 1;
          }
        }
      }

      .v-enter-active,
      .v-leave-active {
        transition: opacity 0.3s;
      }

      .v-enter-from,
      .v-leave-to {
        opacity: 0;
      }
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

      .date-block {
        text-align: center;
      }
    }
    .chat-message-form-wrapper {
      width: 100%;
      height: 120px;
      background-color: rgb(73, 10, 144);
      padding: 20px;
      flex-shrink: 0;
    }
  }
}
</style>
