<template>
  <form @submit="onSubmit" class="chat-message-form">
    <textarea v-model="message" v-bind="messageAtr" placeholder="Write a message" class="chat-input" />
    <button type="submit" class="send-message-btn" :disabled="isSubmitting">
      <img src="@/icons/icons8-send-30.png" alt="sent" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { sendMessageRequest } from '@/api/requests'
import { useChatStore } from '@/store/chatStore'
import type { SendMessageResponse } from '@/store/types/chatStoreTypes'
import type { User } from '@/store/types/userStoreTypes'

import { useForm } from 'vee-validate'
import * as yup from 'yup'

const props = defineProps<{ recipient: User | undefined }>()

const chatStore = useChatStore()

const { handleSubmit, defineField, isSubmitting } = useForm({
  initialValues: { message: '' },
  validationSchema: yup.object({
    message: yup.string().trim()
  })
})

const [message, messageAtr] = defineField('message')

const onSubmit = handleSubmit(async ({ message }, { resetForm }) => {
  if (!message.length) return

  if (props.recipient) {
    const { data }: { data: SendMessageResponse } = await sendMessageRequest({
      recipientId: props.recipient.id,
      message
    })
    
    chatStore.sendMessage(props.recipient, data)
  }

  resetForm()
})
</script>

<style lang="scss" scoped>
.chat-message-form {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .chat-input {
    width: 100%;
    height: 60px;
    margin-right: 20px;
    resize: none;
    padding: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
    &:focus {
      outline: none;
    }
  }
}
</style>
