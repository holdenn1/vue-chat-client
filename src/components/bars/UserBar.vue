<template>
  <div class="user-bar">
    <input class="upload-photo-input" type="file" @change="handleFileInputChange" />
    <img class="user-avatar" :src="userStore.userState.user?.photo" alt="" />
    <img class="logout" src="@/icons/logout.png" alt="" @click="userStore.logoutUser()"/>
    <h4 class="user-name">
      <span
        :title="userStore.userState.user?.nickname"
        ref="editName"
        class="user-name__text"
        contentEditable="true"
        >{{ userStore.userState.user?.nickname }}</span
      >
      <img class="edit-icon" @click="() => editName.focus()" src="@/icons/icons8-edit.svg" alt="" />
    </h4>
  </div>
</template>

<script setup lang="ts">
import { updateUserAvatar, updateUserRequest } from '@/api/requests'
import { useUserStore } from '@/store/userStore'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useToastify } from 'vue-toastify-3'

import type { User } from '@/store/types/userStoreTypes'

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
    const trimNickname = editName.value.innerText.trim()

    if (trimNickname.length < 3) {
      toastify('warning', 'Nickname must be longer than 3 characters')
      return
    }
    const { data }: { data: User } = await updateUserRequest({ nickname: trimNickname })
    if (!data) {
      throw new Error()
    }


    console.log(20000000)
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

  .logout {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translate(0%, -50%);
    cursor: pointer;
  }
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
      min-width: 30px;
      height: 20px;
      white-space: nowrap;
      overflow: hidden;
    }

    .edit-icon {
      width: 22px;
      height: 22px;
      position: absolute;
      right: -30px;
      top: 0px;
      cursor: pointer;
    }
  }
}
</style>
