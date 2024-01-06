import type { SendMessageResponse } from '@/store/types/chatStoreTypes'
import type { User } from '@/store/types/userStoreTypes'

export enum NotificationType {
  SEND_MESSAGE = 'send_message',
  REMOVE_CHAT = 'remove_chat',
  UPDATE_USER = 'update_user',
  UPDATE_MESSAGE = 'update_message'
}

export type SendMessageSocket = {
  socketId: string
  payload: Omit<SendMessageResponse, 'participant'>
}

export type RemoveChatSocket = {
  socketId: string
  payload: {
    chatId: number
  }
}

export type UpdateUserSocket = {
  socketId: string
  payload: User
}
