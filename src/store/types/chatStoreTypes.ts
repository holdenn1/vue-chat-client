import type { User } from "./userStoreTypes"

export type Message = {
  id: number;
  message: string;
  isLike:boolean;
  senderId: number;
  chatId: number;
  createdDate: Date;
  updatedDate: Date;
};


export type InitialValuesChatStore = {
  messages: Message[]
  isShowChat: boolean
  recommendationMembers: User[]
  isRecommendationMembers: boolean
}

export type SendMessageResponse = {
  data: {
    chat:{}
    message: Message
  }
}