<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Manager } from 'socket.io-client'
import { BASE_URL } from '@/api'
import { NotificationType } from './types'
import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import type { SendMessageSocket, RemoveChatSocket, UpdateUserSocket } from './types'

const chatStore = useChatStore()
const userStore = useUserStore()

onMounted(() => {
  const manager = new Manager(BASE_URL, {
    transports: ['websocket']
  })
  const socket = manager.socket('/')
  ;(window as any).socket = socket

  socket.on(NotificationType.SEND_MESSAGE, handleSendMessage)
  socket.on(NotificationType.REMOVE_CHAT, handleRemoveChat)
  socket.on(NotificationType.UPDATE_USER, handleUpdateUser)
  socket.on(NotificationType.UPDATE_MESSAGE, handleUpdateMessage)
  return () => {
    socket.disconnect()
  }
})

const handleSendMessage = async (sendMessageData: SendMessageSocket) => {
  if ((window as any)?.socket?.id === sendMessageData.socketId) return

  console.log(sendMessageData)

  if (sendMessageData.payload && userStore.userState.user) {
    if (sendMessageData.payload.chat?.members) {
      const sender = sendMessageData.payload.chat.members.find(
        (member) => member.id === sendMessageData.payload.message.senderId
      )
      if (sender) {
        chatStore.sendMessage({ ...sendMessageData.payload, participant: sender })
        return
      }
    }
    chatStore.sendMessage(sendMessageData.payload)
  }
}

const handleRemoveChat = async (removeChatData: RemoveChatSocket) => {
  if ((window as any)?.socket?.id === removeChatData.socketId) return
  chatStore.removeChat(removeChatData.payload.chatId)
}

const handleUpdateUser = (updateUserData: UpdateUserSocket) => {
  if ((window as any)?.socket?.id === updateUserData.socketId) return
  console.log(updateUserData)
  chatStore.updateUserOnSocket(updateUserData.payload)
}

const handleUpdateMessage = (data: any) => {
  console.log(data);
  
}
</script>

<style scoped></style>
