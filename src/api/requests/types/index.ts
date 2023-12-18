export type RegistrationUserData = {
  nickname: string
  email: string
  password: string
}

export type LoginUserData = {
  email: string
  password: string
}

export type SendMessageData = {
  recipientId: number;
  message: string;
}

export type UpdateUserData = {
  nickname?: string
}