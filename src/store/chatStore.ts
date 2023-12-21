import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Chat,
  InitialValuesChatStore,
  Message,
  RemoveChatData,
  SendMessageResponse
} from './types/chatStoreTypes'
import {
  fetchChatsRequest,
  fetchMessagesRequest,
  removeChatRequest,
  searchMembersByNickname
} from '@/api/requests'
import type { User } from './types/userStoreTypes'
import { useRouter } from 'vue-router'

export const useChatStore = defineStore('chat', () => {
  const chatState = ref<InitialValuesChatStore>({
    isShowChat: false,
    messages: [],
    recommendationMembers: [],
    isRecommendationMembers: false,
    chats: [],
    currentChatsPage: 1,
    currentMessagesPage: 1
  })

  const debounceTimeoutRef = ref<number | null>(null)

  const router = useRouter()

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
    const { data }: { data: Chat[] } = await fetchChatsRequest(
      String(chatState.value.currentChatsPage)
    )

    if (data.length) {
      const oldChats = chatState.value.chats.map((chat) => chat.id)
      const newChats = data.filter((chat) => !oldChats.includes(chat.id))

      chatState.value.chats = [...chatState.value.chats, ...newChats]
      chatState.value.currentChatsPage += 1
    }
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
          chatState.value.chats.unshift({ id: data.chat.id, member: recipient })
        }
      }

      chatState.value.messages.unshift(data.message)
    } catch (e) {
      console.error(e)
    }
  }

  async function fetchMessages(chatId: string) {
    try {
      const { data }: { data: Message[] } = await fetchMessagesRequest(
        chatId,
        String(chatState.value.currentMessagesPage)
      )
      if (data.length) {
        const oldMessages = chatState.value.messages.map((message) => message.id)
        const newMessages = data.filter((message) => !oldMessages.includes(message.id))

        chatState.value.messages = [...chatState.value.messages, ...newMessages]
        chatState.value.currentMessagesPage += 1
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function removeChat(chat: Chat) {
    try {
      const { data }: RemoveChatData = await removeChatRequest(String(chat.member.id))

      if (!data) {
        throw new Error()
      }
      chatState.value.chats = chatState.value.chats.filter((chat) => chat.id !== data.chatId)
      setShowChat(false)
      router.replace({ name: 'chats' })
    } catch (e) {
      console.error(e)
    }
  }

  function setCurrentMessagesPage(page: number) {
    chatState.value.currentMessagesPage = page
  }
  function setShowChat(isShow: boolean) {
    chatState.value.isShowChat = isShow
  }

  function setShowRecommendationMember(isShow: boolean) {
    chatState.value.isRecommendationMembers = isShow
  }

  function clearChat() {
    chatState.value.messages = []
  }

  return {
    chatState,
    clearChat,
    removeChat,
    fetchChats,
    setShowChat,
    sendMessage,
    fetchMessages,
    searchMembersByEmail,
    setCurrentMessagesPage,
    setShowRecommendationMember,
    setRecommendationMembers
  }
})
