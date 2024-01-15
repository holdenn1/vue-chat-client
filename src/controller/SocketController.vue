<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Manager } from 'socket.io-client'
import { BASE_URL } from '@/api'
import { NotificationType } from './types'
import { useChatStore } from '@/store/chatStore'
import type {
  SendMessageSocket,
  RemoveChatSocket,
  UpdateUserSocket,
  UpdateMessageSocket,
  RemoveMessageSocket
} from './types'

const chatStore = useChatStore()

onMounted(() => {
  const manager = new Manager(BASE_URL, {
    transports: ['websocket'],
    reconnectionAttempts: 20
  })
  const socket = manager.socket('/')
  ;(window as any).socket = socket

  socket.on(NotificationType.SEND_MESSAGE, handleSendMessage)
  socket.on(NotificationType.REMOVE_CHAT, handleRemoveChat)
  socket.on(NotificationType.UPDATE_USER, handleUpdateUser)
  socket.on(NotificationType.UPDATE_MESSAGE, handleUpdateMessage)
  socket.on(NotificationType.REMOVE_MESSAGE, handleRemoveMessage)
  return () => {
    socket.disconnect()
  }
})

const handleSendMessage = async (sendMessageData: SendMessageSocket) => {
  if ((window as any)?.socket?.id === sendMessageData.socketId) return
  console.log('s', sendMessageData)

  chatStore.sendMessage(sendMessageData.payload)
}

const handleRemoveChat = async (removeChatData: RemoveChatSocket) => {
  if ((window as any)?.socket?.id === removeChatData.socketId) return

  chatStore.removeChat(removeChatData.payload.id)
}

const handleUpdateUser = (updateUserData: UpdateUserSocket) => {
  if ((window as any)?.socket?.id === updateUserData.socketId) return

  chatStore.updateUserOnSocket(updateUserData.payload)
}

const handleUpdateMessage = (updateMessageData: UpdateMessageSocket) => {
  if ((window as any)?.socket?.id === updateMessageData.socketId) return
  chatStore.updateMessage(updateMessageData.payload)
}

const handleRemoveMessage = (removeMessageData: RemoveMessageSocket) => {
  if ((window as any)?.socket?.id === removeMessageData.socketId) return

  chatStore.removeMessage(removeMessageData.payload)
}
</script>

<style scoped></style>
