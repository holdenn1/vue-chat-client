<template>
  <div class="chat-bar">
    <div class="search-members">
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
      <div v-show="!chatStore.chatState.isRecommendationMembers">
        <MemberItem
          v-for="chat of chatStore.chatState.chats"
          @click="() => openChat(String(chat.id), chat.member)"
          :key="chat.id"
          :member="chat.member"
        />
      </div>

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
import SearchUserByNicknameInputVue from 'ui/inputs/SearchUserByNicknameInput.vue'
import MemberItem from './MemberItem.vue'
import ChatError from '../errors/ChatError.vue'

import { useChatStore } from '@/store/chatStore'
import { onMounted, ref } from 'vue'

import type { User } from '@/store/types/userStoreTypes'
import { useRouter } from 'vue-router'

const searchMemberValue = ref('')
const router = useRouter()

const emit = defineEmits<{
  (e: 'set-current-member', member: User): void
}>()

const chatStore = useChatStore()

onMounted(() => {
  chatStore.fetchChats()
})

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value.toLowerCase()
  searchMemberValue.value = value
  chatStore.setShowRecommendationMember(true)
  chatStore.searchMembersByEmail(value)
}

function setMember(member: User) {
  chatStore.setShowChat(true)
  emit('set-current-member', member)
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
.chat-bar {
  max-width: 320px;
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(181, 181, 181);
  position: relative;
  grid-area: chat-bar;
  .search-members {
    background-color: rgb(73, 10, 144);
    padding: 30px 10px 20px;
    border-bottom: 1px solid rgb(76, 76, 76);
    position: relative;
  }

  .chats-list-wrapper {
    width: 100%;
    height: calc(100% - 20%);
  }
}
</style>
