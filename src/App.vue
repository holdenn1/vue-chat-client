<template>
  <router-view />
</template>

<script setup lang="ts">
import globalRouter from '@/router/globalRouter'
import { useUserStore } from '@/store/userStore'

import { useRouter } from 'vue-router'
import { onBeforeUnmount, onMounted } from 'vue'

const userStore = useUserStore()

const router = useRouter()

globalRouter.router = router

const resizeOps = () => {
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px')
}

resizeOps()

onMounted(() => {
  userStore.checkAuth()
  window.addEventListener('resize', resizeOps)
})

onBeforeUnmount(() => {
  window.addEventListener('resize', resizeOps)
})
</script>

<style scoped></style>
