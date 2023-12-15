import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from './types/userStoreTypes'
import { searchMembersByNickname } from '@/api/requests'

export const useMembersStore = defineStore('member', () => {
  const membersState = ref<{
    recommendationMembers: User[]
  }>({
    recommendationMembers: []
  })

  const debounceTimeoutRef = ref<number | null>(null)

  function searsMembersByEmail(value: string) {
    try {
      if (debounceTimeoutRef.value) {
        clearTimeout(debounceTimeoutRef.value)
      }
      debounceTimeoutRef.value = setTimeout(async () => {
        if (value.trim() !== '') {
          const {data}: {data: User[]} = await searchMembersByNickname(value)

          console.log(data);
          
          setRecommendationMembersList(data)
        } else {
          setRecommendationMembersList([])
        }
      }, 500)
    } catch (e) {
      console.error(e)
    }
  }

  function setRecommendationMembersList(members: User[]) {
    membersState.value.recommendationMembers = members
  }


  return { membersState, searsMembersByEmail, setRecommendationMembersList }
})
