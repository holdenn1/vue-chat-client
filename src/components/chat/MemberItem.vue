<template>
  <div class="recommendation-members">
    <img class="member-avatar" :src="member.photo" alt="" />
    <span class="member-name">{{ member.nickname }}</span>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/store/types/userStoreTypes'

defineProps<{ member: User }>()

</script>

<style lang="scss" scoped>
.recommendation-members {
  display: flex;
  align-items: center;
  padding: 0 10px;
  overflow: hidden;
  border-bottom: 1px solid rgb(76, 76, 76);
  padding: 6px;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  &:hover {
    background-color: #9d8ee0;
  }
  .member-avatar {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    object-fit: cover;
    margin-right: 12px;
  }
  .member-menu{
    height: 20px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0,-50%);
    cursor: pointer;
  }
}
</style>
