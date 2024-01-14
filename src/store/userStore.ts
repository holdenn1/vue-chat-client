import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useToastify } from 'vue-toastify-3'

import {
  loginUserRequest,
  logoutUserRequest,
  refreshTokensLogin,
  registrationUserRequest
} from '@/api/requests'

import { useRouter } from 'vue-router'
import { AxiosError } from 'axios'
import type {
  InitialValuesUserStore,
  LoginUserActionProps,
  RegistrationUserActionProps,
  User
} from './types/userStoreTypes'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const { toastify } = useToastify()
  const userState = ref<InitialValuesUserStore>({
    user: null
  })

  async function registrationUser({ data }: RegistrationUserActionProps) {
    try {
      const { data: user }: { data: User } = await registrationUserRequest(data)

      if (user) {
        userState.value.user = user
        router.push({ name: 'chats' })
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toastify('error', e.response?.data?.message || 'An error occurred')
        console.error(e)
      } else {
        console.error(e)
      }
    }
  }

  async function loginUser({ data }: LoginUserActionProps) {
    try {
      const { data: user }: { data: User } = await loginUserRequest(data)

      if (user) {
        userState.value.user = user
        router.push({ name: 'chats' })
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toastify('error', e.response?.data?.message || 'An error occurred')
        console.error(e)
      } else {
        console.error(e)
      }
    }
  }

  async function logoutUser() {
    try {
      await logoutUserRequest()
      userState.value.user = null
      router.push({ path: '/' })
    } catch (e) {
      toastify('error', 'An error occurred')
      router.push({ path: '/' })

      console.error(e)
    }
  }

  async function checkAuth() {
    try {
      const { data: user }: { data: User } = await refreshTokensLogin()

      if (!user) {
        throw new Error()
      }

      userState.value.user = user
      router.push({ name: 'chats' })
    } catch (e) {
      router.push({ path: '/' })
      console.error(e)
    }
  }

  function setUser(data: User) {
    if (userState.value.user) {
      userState.value.user = data
    }
  }

  return {
    userState,
    setUser,
    registrationUser,
    loginUser,
    logoutUser,
    checkAuth
  }
})
