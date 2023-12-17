import instance from '@/api'
import axios from 'axios'
import type { LoginUserData, RegistrationUserData, SendMessageData } from './types'

export const BASE_URL = 'http://localhost:8000/'

export const registrationUserRequest = (data: RegistrationUserData) =>
  instance.post('auth/registration', data)

export const loginUserRequest = (data: LoginUserData) => instance.post('auth/login', data)

export const logoutUserRequest = () => instance.get('auth/logout')

export const refreshRequest = () => axios.create({ baseURL: BASE_URL }).get('auth/token/refresh')

export const refreshTokensLogin = () => instance.get('auth/token/refresh/refresh-login')

export const getUserByIdRequest = (userId:string) => instance.get(`user/user/${userId}`)

//

export const searchMembersByNickname = (nickname: string) =>
  instance.get(`user/search-users?nickname=${nickname}`)

export const sendMessageRequest = (data: SendMessageData) => instance.post(`chat/send-message`, data)

export const fetchChatsRequest = () => instance.get('chat/get-chats')