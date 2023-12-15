<template>
  <div class="chat-bar">
    <div class="search-members">
      <SearchMember />
    </div>
    <div
      class="recommendation-members-wrapper"
      v-show="membersStore.membersState.isRecommendationMembers"
    >
      <RecommendationMembers
        v-for="member of membersStore.membersState.recommendationMembers"
        :key="member.id"
        :member-nickname="member.nickname"
        :member-avatar="member.photo"
      />
    </div>
    <div class="chats-list-wrapper">
      <ChatError
        v-show="
          !membersStore.membersState.isRecommendationMembers &&
          !membersStore.membersState.recommendationMembers.length
        "
      >
        No chats Found
      </ChatError>
      <ChatError
        v-show="
          membersStore.membersState.isRecommendationMembers &&
          !membersStore.membersState.recommendationMembers.length
        "
      >
        Members not found
      </ChatError>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMembersStore } from '@/store/memberStore'
import RecommendationMembers from './RecommendationMembers.vue'
import SearchMember from './SearchMember.vue'
import ChatError from '../errors/ChatError.vue'

const membersStore = useMembersStore()
</script>

<style lang="scss" scoped>
.chat-bar {
  max-width: 320px;
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(181, 181, 181);
  position: relative;
  grid-area: chat-bar;
  .search-members {
    background-color: rgb(73, 10, 144);
  }

  .chats-list-wrapper {
    width: 100%;
    height: calc(100% - 20%);
  }
}
</style>
