<template>
  <div class="user-bar">
    <img :src="userStore.userState.user?.photo" alt="" class="user-avatar" />
    <h4 class="user-name">{{ userStore.userState.user?.nickname }}</h4>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.user-bar {
  display: flex;
  align-items: center;
  height: 60px;
  margin-bottom: 20px;
  .user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    margin-right: 12px;
  }

  .user-name {
    font-size: 18px;
    color: white;
    font-weight: 500;
  }
}
</style>
