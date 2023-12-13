<template>
  <div>
    <button
      style="margin: 100px; border: 1px solid black; width: 100px; height: 50px"
      type="button"
      @click="() => userStore.logoutUser()"
    >
      logout
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
</script>

<style scoped></style>
