<template>
  <form @submit="submitForm" class="chat-message-form">
    <textarea
      v-model="message"
      v-bind="messageAtr"
      placeholder="Write a message"
      class="chat-input"
    />
    <button type="submit" class="send-message-btn" :disabled="isSubmitting">
      <img src="@/icons/icons8-send-30.png" alt="sent" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { sendMessageRequest } from '@/api/requests'
import { useChatStore } from '@/store/chatStore'

import type { Message, SendMessageResponse } from '@/store/types/chatStoreTypes'
import type { User } from '@/store/types/userStoreTypes'

import { useForm } from 'vee-validate'
import { computed, toRefs, watch } from 'vue'
import * as yup from 'yup'

const props = defineProps<{
  recipient: User | undefined
  editMessage: Message | null
}>()

const emit = defineEmits<{
  (e: 'edit-message'): void
  (e: 'send-message'):void
}>()

const { editMessage } = toRefs(props)

watch(
  () => editMessage.value,
  () => {
    if (editMessage.value?.message.length) {
      message.value = editMessage.value.message
    } else {
      message.value = ''
    }
  }
)

const chatStore = useChatStore()

const { handleSubmit, defineField, isSubmitting } = useForm({
  initialValues: { message: '' },
  validationSchema: yup.object({
    message: yup.string().trim()
  })
})

const [message, messageAtr] = defineField('message')

const handleSendMessage = handleSubmit(async ({ message }, { resetForm }) => {
  if (!message.length) return

  if (props.recipient) {
    const { data }: { data: SendMessageResponse } = await sendMessageRequest({
      recipientId: props.recipient.id,
      message
    })

  
    chatStore.sendMessage(data)
    emit('send-message')
    resetForm()
  }
})

const handleEditMessage = handleSubmit(async ({ message }, { resetForm }) => {
  try {
    if (!message.length) return
    if (props.recipient && editMessage.value) {
      chatStore.editMessageAction({
        id: editMessage.value.id,
        message,
        recipientId: props.recipient.id
      })
      resetForm()
      emit('edit-message')
    }
  } catch (e) {
    console.error(e)
  }
})

const submitForm = computed(() => (editMessage.value ? handleEditMessage : handleSendMessage))
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
