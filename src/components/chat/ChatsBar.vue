<template>
  <div class="chat-bar">
    <div class="search-members">
      <UserBar />
      <SearchUserByNicknameInputVue
        :clear-members="clearMembers"
        :search-member-value="searchMemberValue"
        :handleInput="handleInput"
        placeholder="Input user nickname"
      />
    </div>
    <div
      class="recommendation-members-wrapper"
      v-show="chatStore.chatState.isRecommendationMembers"
    >
      <MemberItem
        v-for="member of chatStore.chatState.recommendationMembers"
        @click="() => setMember(member)"
        :key="member.id"
        :member="member"
      />
    </div>
    <div class="chats-list-wrapper">
      <template v-if="!chatStore.chatState.isRecommendationMembers">
        <ChatItem
          v-for="chat of chatStore.chatState.chats"
          @click="() => openChat(String(chat.id), chat.member)"
          :key="chat.id"
          :chat="chat"
        />
        <div ref="div"></div>
      </template>
      <ChatError
        v-show="!chatStore.chatState.isRecommendationMembers && !chatStore.chatState.chats.length"
      >
        No chats Found
      </ChatError>
      <ChatError
        v-show="
          chatStore.chatState.isRecommendationMembers &&
          !chatStore.chatState.recommendationMembers.length
        "
      >
        Members not found
      </ChatError>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserBar from 'components/bars/UserBar.vue'
import SearchUserByNicknameInputVue from 'ui/inputs/SearchUserByNicknameInput.vue'
import MemberItem from './MemberItem.vue'
import ChatError from 'components/errors/ChatError.vue'

import { useChatStore } from '@/store/chatStore'
import { onBeforeUnmount, onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
import ChatItem from './ChatItem.vue'

import type { User } from '@/store/types/userStoreTypes'

const searchMemberValue = ref('')
const loading = ref(false)
const div = ref()

const router = useRouter()

const emit = defineEmits<{
  (e: 'set-current-member', member: User): void
}>()

const chatStore = useChatStore()

const observer = new IntersectionObserver(async ([entry]) => {
  if (entry.isIntersecting && !loading.value) {
    loading.value = true

    chatStore.fetchChats()

    loading.value = false
  }
})

onMounted(() => {
  observer.observe(div.value)
})

onBeforeUnmount(() => observer.disconnect())

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value.toLowerCase()
  searchMemberValue.value = value
  chatStore.setShowRecommendationMember(true)
  chatStore.searchMembersByEmail(value)
}

function setMember(member: User) {
  chatStore.setShowChat(true)
  emit('set-current-member', member)
  const hasChat = chatStore.chatState.chats.find((chat) => chat.member.id === member.id)

  if (hasChat) {
    router.push({ query: { chatId: hasChat.id } })
  } else {
    router.push({ name: 'chats', query: { previewChat: 'true' } })
    chatStore.clearChat()
  }
  clearMembers()
}

function openChat(chatId: string, member: User) {
  chatStore.setShowChat(true)
  emit('set-current-member', member)
  router.push({ query: { chatId } })
}

function clearMembers() {
  chatStore.setRecommendationMembers([])
  chatStore.setShowRecommendationMember(false)
  searchMemberValue.value = ''
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/scrollbar.scss';
.chat-bar {
  max-width: 320px;
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(181, 181, 181);
  position: relative;
  grid-area: chat-bar;
  .search-members {
    height: 168.5px;
    background-color: rgb(73, 10, 144);
    padding: 30px 20px 20px;
    border-bottom: 1px solid rgb(76, 76, 76);
    position: relative;
  }

  .chats-list-wrapper {
    width: 100%;
    height: calc(100% - 168.5px);
    overflow-x: hidden;
    overflow-y: auto;
    @include scrollbar(black, 2px);
    padding-bottom: 10px;
  }
}
</style>
