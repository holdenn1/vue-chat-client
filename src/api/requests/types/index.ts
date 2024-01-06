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

export type UpdateMessageData ={
  id: number;
  message?: string;
  isLike?:boolean
  recipientId: number
}
