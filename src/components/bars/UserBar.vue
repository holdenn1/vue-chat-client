<template>
  <div class="user-bar">
    <input class="upload-photo-input" type="file" @change="handleFileInputChange" />
    <img :src="userStore.userState.user?.photo" alt="" class="user-avatar" />
    <h4 class="user-name">
      <span ref="editName" class="user-name__text" contentEditable="true">{{
        userStore.userState.user?.nickname
      }}</span>
      <img class="edit-icon" src="@/icons/icons8-edit.svg" alt="" />
    </h4>
  </div>
</template>

<script setup lang="ts">
import { updateUserAvatar, updateUserRequest } from '@/api/requests'
import type { User } from '@/store/types/userStoreTypes'
import { useUserStore } from '@/store/userStore'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useToastify } from 'vue-toastify-3'

const userStore = useUserStore()

const { toastify } = useToastify()

const updatedNickname = ref('')
const editName = ref()

const handleFileInputChange = async (event: Event) => {
  try {
    const fileInput = event.target as HTMLInputElement
    const file = fileInput.files && fileInput.files[0]

    if (file) {
      const { data }: { data: User } = await updateUserAvatar(file)

      if (!data) {
        throw new Error()
      }
      userStore.setUser(data)
    }
  } catch (e) {
    console.error(e)
  }
}

const handleInput = () => {
  updatedNickname.value = editName.value.innerText
}

const updateNickname = async () => {
  try {
    const trimNickname = updatedNickname.value.trim()

    console.log(trimNickname.length);
    
    if (trimNickname.length < 3) {
      toastify('warning', 'Nickname must be longer than 3 characters')
      return
    }
    const { data }: { data: User } = await updateUserRequest({ nickname: updatedNickname.value })
    if (!data) {
      throw new Error()
    }
    userStore.setUser(data)
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  editName.value.addEventListener('input', handleInput)
  editName.value.addEventListener('blur', updateNickname)
})

onBeforeUnmount(() => {
  editName.value.removeEventListener('input', handleInput)
  editName.value.removeEventListener('blur', updateNickname)
})
</script>

<style lang="scss" scoped>
.user-bar {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 20px;
  position: relative;
  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    margin-right: 12px;
    cursor: pointer;
  }
  .upload-photo-input {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    position: absolute;
    opacity: 0;
    top: 6px;
    left: 0;
  }
  .user-name {
    position: relative;
    &__text {
      display: block;
      font-size: 18px;
      color: white;
      font-weight: 500;
      max-width: 140px;
      height: 20px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .edit-icon {
      width: 24px;
      height: 24px;
      position: absolute;
      right: -30px;
      top: 0px;
      display: none;
    }

    .edit-icon {
      display: none;
    }

    .user-name__text:hover + .edit-icon {
      display: block;
    }
  }
}
</style>
