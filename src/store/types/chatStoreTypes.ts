import type { User } from './userStoreTypes'

export type Message = {
  id: number
  message: string
  isLike: boolean
  senderId: number
  chatId: number
  createdDate: Date
  updatedDate: Date
}

export type InitialValuesChatStore = {
  isShowChat: boolean
  recommendationMembers: User[]
  isRecommendationMembers: boolean
  chats: Chat[]
  currentMessagesPage: number
  currentChatsPage: number
}

export type SendMessageResponse = {
  chat: {
    id: number
    members?: User[]
    lastReadMessageDate: Date
    createdDate: Date
    updatedDate: Date
  }
  message: Message
  recipientId: number
}

export type Chat = {
  id: number
  member: User
  messages: Message[]
  lastReadMessageDate: Date
  createdDate: Date
  updatedDate: Date
}

export type RemoveChatData = {
  data: {
    chatId: number
  }
}

export type EditMessageProps = {
  id: number
  message: string
  recipientId: number
}
