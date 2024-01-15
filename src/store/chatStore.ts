import { useUserStore } from './userStore'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  Chat,
  EditMessageProps,
  FetchMessagesDate,
  InitialValuesChatStore,
  Message,
  RemoveChatData,
  SendMessageResponse
} from './types/chatStoreTypes'
import {
  fetchChatsRequest,
  fetchMessagesRequest,
  removeChatRequest,
  removeMessageRequest,
  searchMembersByNickname,
  updateMessageRequest
} from '@/api/requests'
import type { User } from './types/userStoreTypes'
import { useRoute, useRouter } from 'vue-router'

const LAST_MESSAGE = 1

export const useChatStore = defineStore('chat', () => {
  const chatState = ref<InitialValuesChatStore>({
    isShowChat: false,
    recommendationMembers: [],
    isRecommendationMembers: false,
    chats: [],
    currentChatsPage: 1,
    currentMessagesPage: 1
  })

  const debounceTimeoutRef = ref<number | null>(null)

  const router = useRouter()
  const route = useRoute()

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
    console.log(data)

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

  function sendMessage(data: SendMessageResponse) {
    try {
      if (!data) {
        throw new Error()
      }

      if (route.query.previewChat) {
        router.push({ query: { chatId: data.chat?.id } })
      }

      if (data.chat.members) {
        const hasChat = chatState.value.chats.find((chat) => chat.id === data.chat.id)
        if (hasChat) return
        chatState.value.chats.unshift({
          id: data.chat.id,
          member: data.chat.members.find((user) => user.id !== useUserStore().userState.user?.id),
          createdDate: data.chat.createdDate,
          updatedDate: data.chat.updatedDate,
          lastReadMessageDate: data.chat.lastReadMessageDate,
          messages: [data.message]
        } as Chat)
      } else {
        chatState.value.chats = chatState.value.chats.map((chat) => {
          if (chat.id === data.message.chatId) {
            chat.messages.unshift(data.message)
          }
          return chat
        })
        const chatToUpdate = chatState.value.chats.find((chat) => chat.id === data.chat.id)

        if (chatToUpdate) {
          chatState.value.chats = [
            chatToUpdate,
            ...chatState.value.chats.filter((chat) => chat.id !== data.message.chatId)
          ]
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function fetchMessages(chatId: string) {
    try {
      const { data }: { data: FetchMessagesDate } = await fetchMessagesRequest(
        chatId,
        String(chatState.value.currentMessagesPage)
      )

      chatState.value.chats = chatState.value.chats.map((chat) => {
        if (chat.id === data.chatId) {
          chat.lastReadMessageDate = data.lastReadMessageDate
        }
        return chat
      })

      if (data.messages) {
        const oldMessagesIds = chatState.value.chats.reduce((acum: number[], chat) => {
          if (chat.id === +chatId) {
            acum = chat.messages.map((message) => message.id)
          }
          return acum
        }, [])

        const newMessages = data.messages.filter((message) => !oldMessagesIds.includes(message.id))

        chatState.value.chats = chatState.value.chats.map((chat) => {
          if (chat.id === +chatId) {
            chat.messages = [...chat.messages, ...newMessages]
          }
          return chat
        })

        chatState.value.currentMessagesPage += 1
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function removeChatAction(id: number) {
    try {
      const { data }: RemoveChatData = await removeChatRequest(String(id))

      if (!data) {
        throw new Error()
      }
      removeChat(data.chatId)
    } catch (e) {
      console.error(e)
    }
  }

  function removeChat(chatId: number) {
    chatState.value.chats = chatState.value.chats.filter((chat) => chat.id !== chatId)
    if (+(route.query.chatId as string) === chatId) {
      setShowChat(false)
      router.replace({ name: 'chats' })
    }
  }

  function updateUserOnSocket(user: User) {
    chatState.value.chats = chatState.value.chats.map((chat) => {
      if (chat.member.id === user.id) {
        chat.member = user
      }
      return chat
    })
  }

  async function setLikeAction(message: Message, recipientId: number) {
    try {
      const { data }: { data: Message } = await updateMessageRequest({
        id: message.id,
        isLike: !message.isLike,
        recipientId
      })

      updateMessage(data)
    } catch (e) {
      console.error(e)
    }
  }

  async function editMessageAction(editMessage: EditMessageProps) {
    try {
      const { data }: { data: Message } = await updateMessageRequest(editMessage)

      updateMessage(data)
    } catch (e) {
      console.error(e)
    }
  }

  function updateMessage(data: Message) {
    chatState.value.chats = chatState.value.chats.map((chat) => {
      if (chat.id === data.chatId) {
        chat.messages = chat.messages.map((message) => {
          if (message.id === data.id) {
            message = data
          }
          return message
        })
      }
      return chat
    })
  }

  async function removeMessageAction(messageId: number, recipientId: number) {
    try {
      const { data }: { data: Message } = await removeMessageRequest(
        String(messageId),
        String(recipientId)
      )

      chatState.value.chats.forEach((chat) => {
        if (chat.id === data.chatId) {
          if (chat.messages.length === LAST_MESSAGE) {
            removeChatAction(chat.id)
          }
        }
      })

      removeMessage(data)
    } catch (e) {
      console.error(e)
    }
  }

  function removeMessage(data: Message) {
    chatState.value.chats = chatState.value.chats.map((chat) => {
      if (chat.id === data.chatId) {
        chat.messages = chat.messages.filter((message) => message.id !== data.id)
      }
      return chat
    })
  }

  function clearChatList() {
    chatState.value.chats = []
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

  return {
    chatState,
    removeChat,
    fetchChats,
    setShowChat,
    sendMessage,
    updateMessage,
    fetchMessages,
    removeMessage,
    setLikeAction,
    clearChatList,
    removeChatAction,
    editMessageAction,
    updateUserOnSocket,
    removeMessageAction,
    searchMembersByEmail,
    setCurrentMessagesPage,
    setShowRecommendationMember,
    setRecommendationMembers
  }
})
