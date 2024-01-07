import instance from '@/api'
import axios from 'axios'
import type {
  LoginUserData,
  RegistrationUserData,
  SendMessageData,
  UpdateUserData,
  UpdateMessageData
} from './types'

export const BASE_URL = 'http://localhost:8000/'

export const registrationUserRequest = (data: RegistrationUserData) =>
  instance.post('auth/registration', data)

export const loginUserRequest = (data: LoginUserData) => instance.post('auth/login', data)

export const logoutUserRequest = () => instance.get('auth/logout')

export const refreshRequest = () => axios.create({ baseURL: BASE_URL }).get('auth/token/refresh')

export const refreshTokensLogin = () => instance.get('auth/token/refresh/refresh-login')

export const getUserByIdRequest = (userId: string) => instance.get(`user/user/${userId}`)

export const updateUserAvatar = (cover: File) => {
  const formData = new FormData()

  formData.append('cover', cover)

  return instance.post('user/update-user-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const updateUserRequest = (data: UpdateUserData) => instance.put('user/update-user', data)
//

export const searchMembersByNickname = (nickname: string) =>
  instance.get(`user/search-users?nickname=${nickname}`)

export const sendMessageRequest = (data: SendMessageData) =>
  instance.post(`chat/send-message`, data)

export const fetchChatsRequest = (currentPage: string) =>
  instance.get(`chat/get-chats?&page=${currentPage}&pageSize=25`)

export const fetchMessagesRequest = (chatId: string, currentPage: string) =>
  instance.get(`chat/get-messages/${chatId}?&page=${currentPage}&pageSize=20`)

export const removeChatRequest = (recipientId: string) =>
  instance.delete(`chat/remove-chat/${recipientId}`)

export const updateMessageRequest = (data: UpdateMessageData) =>
  instance.put('chat/update-message', data)

export const removeMessageRequest = (messageId: string, recipientId: string) =>
  instance.delete(`chat/remove-message/${messageId}/${recipientId}`)
