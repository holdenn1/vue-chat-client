<template>
  <div></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Manager } from 'socket.io-client'
import { BASE_URL } from '@/api'
import { getUserByIdRequest } from '@/api/requests'
import { NotificationType } from './types'
import type { SendMessageSocket } from './types'
import { useChatStore } from '@/store/chatStore'
import { useUserStore } from '@/store/userStore'
import type { User } from '@/store/types/userStoreTypes'

const chatStore = useChatStore()
const userStore = useUserStore()

onMounted(() => {
  const manager = new Manager(BASE_URL, {
    transports: ['websocket']
  })
  const socket = manager.socket('/')
  ;(window as any).socket = socket

  socket.on(NotificationType.SEND_MESSAGE, handleSendMessage)
  return () => {
    socket.disconnect()
  }
})

const handleSendMessage = async (sendMessageData: SendMessageSocket) => {

  if ((window as any)?.socket?.id === sendMessageData.socketId) return

  if (sendMessageData.payload && userStore.userState.user) {

    if (sendMessageData.payload.chat?.members) {
      const recipientId = sendMessageData.payload.chat?.members.find(
        (user) => user.id !== userStore.userState.user?.id
      )

      if (recipientId) {
        const { data: recipient }: { data: User } = await getUserByIdRequest(String(recipientId.id))
        chatStore.sendMessage(recipient, sendMessageData.payload)
        return
      }
    }

    chatStore.sendMessage(undefined, sendMessageData.payload)
  }

}
</script>

<style scoped></style>
