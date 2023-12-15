<template>
  <div class="search-member">
    <SearchUserByNicknameInputVue
      :searchMemberValue="searchMemberValue"
      :handleInput="handleInput"
      placeholder="Input user nickname"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchUserByNicknameInputVue from '../ui/inputs/SearchUserByNicknameInput.vue'

import { useMembersStore } from '@/store/memberStore'
const searchMemberValue = ref('')

const membersStore = useMembersStore()

async function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value.toLowerCase()
  searchMemberValue.value = value
  // dispatch(setSelectedMembersVisible(false))
  // dispatch(setRecomendationMemberVisible(true))
  membersStore.searsMembersByEmail(value)
}
</script>

<style lang="scss" scoped>
.search-member {
  padding: 30px 10px 20px;
  border-bottom: 1px solid rgb(76, 76, 76);
}
</style>
