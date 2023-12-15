import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from './types/userStoreTypes'
import { searchMembersByNickname } from '@/api/requests'
import type { InitialValuesMembersStore } from './types/membersStoreTypes'

export const useMembersStore = defineStore('member', () => {
  const membersState = ref<InitialValuesMembersStore>({
    recommendationMembers: [],
    isRecommendationMembers: false
  })

  const debounceTimeoutRef = ref<number | null>(null)

  function searsMembersByEmail(value: string) {
    try {
      if (debounceTimeoutRef.value) {
        clearTimeout(debounceTimeoutRef.value)
      }
      debounceTimeoutRef.value = setTimeout(async () => {
        if (value.trim() !== '') {
          const { data }: { data: User[] } = await searchMembersByNickname(value)

          membersState.value.recommendationMembers = data
        } else {
          membersState.value.recommendationMembers = []
          setRecommendationMemberVisible(false)
        }
      }, 500)
    } catch (e) {
      console.error(e)
    }
  }

  function setRecommendationMemberVisible(value: boolean) {
    membersState.value.isRecommendationMembers = value
  }

  function setRecommendationMembers(members: User[]) {
    membersState.value.recommendationMembers = members
  }

  return {
    membersState,
    searsMembersByEmail,
    setRecommendationMemberVisible,
    setRecommendationMembers
  }
})
