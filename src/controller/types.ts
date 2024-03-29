import type { Chat, Message, SendMessageResponse } from '@/store/types/chatStoreTypes'
import type { User } from '@/store/types/userStoreTypes'

export enum NotificationType {
  SEND_MESSAGE = 'send_message',
  REMOVE_CHAT = 'remove_chat',
  UPDATE_USER = 'update_user',
  UPDATE_MESSAGE = 'update_message',
  REMOVE_MESSAGE = 'remove_message'
}

export type SendMessageSocket = {
  socketId: string
  payload: SendMessageResponse
}

export type RemoveChatSocket = {
  socketId: string
  payload: Chat
}

export type UpdateUserSocket = {
  socketId: string
  payload: User
}

export type UpdateMessageSocket = {
  socketId: string
  payload: Message
}

export type RemoveMessageSocket = UpdateMessageSocket
