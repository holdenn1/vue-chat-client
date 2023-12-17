import type { SendMessageResponse } from "@/store/types/chatStoreTypes"

export enum NotificationType {
  SEND_MESSAGE = 'send_message',
}

export type SendMessageSocket = {
  socketId: string
  payload:SendMessageResponse
} 