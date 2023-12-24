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
  messages: Message[]
  isShowChat: boolean
  recommendationMembers: User[]
  isRecommendationMembers: boolean
  chats: Chat[]
  currentMessagesPage: number
  currentChatsPage: number
}

export type SendMessageResponse = {
  chat?: {
    id: number
    members?: User[]
    createdDate: Date
    updatedDate: Date
  }
  message: Message
  recipientId: number
  participant?: User
}

export type Chat = {
  id: number
  member: User
  createdDate: Date
  updatedDate: Date
}

export type RemoveChatData = {
  data: {
    chatId: number
  }
}
