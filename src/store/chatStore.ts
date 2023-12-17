import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Chat, InitialValuesChatStore, SendMessageResponse } from './types/chatStoreTypes'
import { fetchChatsRequest, searchMembersByNickname, sendMessageRequest } from '@/api/requests'
import type { User } from './types/userStoreTypes'

export const useChatStore = defineStore('chat', () => {
  const chatState = ref<InitialValuesChatStore>({
    isShowChat: false,
    messages: [],
    recommendationMembers: [],
    isRecommendationMembers: false,
    chats: []
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

  async function fetchChats() {
    const { data }: { data: Chat[] } = await fetchChatsRequest()
    console.log(data)

    chatState.value.chats = data
  }

  function setRecommendationMembers(members: User[]) {
    chatState.value.recommendationMembers = members
  }

  async function sendMessage(recipient: User | undefined, data: SendMessageResponse) {
    try {
      if (!data) {
        throw new Error()
      }

      if (data?.chat?.members && recipient) {
        const checkRecipient = data.chat.members.find((member) => member.id === recipient.id)
        if (checkRecipient) {
          chatState.value.chats.push({ id: data.chat.id, member: recipient })
        }
      }

      chatState.value.messages.unshift(data.message)
    } catch (e) {
      console.error(e)
    }
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
    fetchChats,
    searchMembersByEmail,
    setShowRecommendationMember,
    setRecommendationMembers
  }
})
