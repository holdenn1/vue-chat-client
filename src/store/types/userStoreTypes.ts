import type { LoginUserData, RegistrationUserData } from '@/api/requests/types'

export type InitialValuesUserStore = {
  user: User | null
}

export type User = {
  id: number
  nickname: string
  email: string
  photo: string
}

export type RegistrationUserActionProps = {
  data: RegistrationUserData
}

export type LoginUserActionProps = {
  data: LoginUserData
}
