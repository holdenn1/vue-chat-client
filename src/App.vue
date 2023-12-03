<template>
  <router-view />
</template>

<script setup lang="ts">
import globalRouter from '@/router/globalRouter'
// import { useUserStore } from '@/store/userStore'

import {  useRouter } from 'vue-router'
import { onMounted } from 'vue'


// const userStore = useUserStore()

const router = useRouter()

globalRouter.router = router

onMounted(() => {
 
  // userStore.checkAuth()
})
</script>

<style scoped>

</style>