import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { InitialValuesChatStore } from './types/chatStoreTypes'
import { searchMembersByNickname, sendMessageRequest } from '@/api/requests'
import type { User } from './types/userStoreTypes'

export const useChatStore = defineStore('chat', () => {
  const chatState = ref<InitialValuesChatStore>({
    isShowChat: false,
    messages: [],
    recommendationMembers: [],
    isRecommendationMembers: false
  })

  const debounceTimeoutRef = ref<number | null>(null)

  function searchMembersByEmail(value: string) {
    try {
      if (debounceTimeoutRef.value) {
        clearTimeout(debounceTimeoutRef.value)
      }
      debounceTimeoutRef.value = setTimeout(async () => {
        if (value.trim() !== '') {
          const { data }: { data: User[] } = await searchMembersByNickname(value)

          chatState.value.recommendationMembers = data
        } else {
          chatState.value.recommendationMembers = []
          setShowRecommendationMember(false)
        }
      }, 500)
    } catch (e) {
      console.error(e)
    }
  }

  function setRecommendationMembers(members: User[]) {
    chatState.value.recommendationMembers = members
  }

  async function sendMessage(recipientId: number, message: string) {
    const data = await sendMessageRequest({ recipientId, message })
    console.log(data)
  }

  function setShowChat(isShow: boolean) {
    chatState.value.isShowChat = isShow
  }

  function setShowRecommendationMember(isShow: boolean) {
    chatState.value.isRecommendationMembers = isShow
  }
  return {
    chatState,
    setShowChat,
    sendMessage,
    searchMembersByEmail,
    setShowRecommendationMember,
    setRecommendationMembers
  }
})
