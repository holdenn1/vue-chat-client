import type { SendMessageResponse } from '@/store/types/chatStoreTypes'

export enum NotificationType {
  SEND_MESSAGE = 'send_message',
  REMOVE_CHAT = 'remove_chat'
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
