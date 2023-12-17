<template>
  <!-- <Toastify /> -->
  <div class="main-wrapper">
    <router-view />
   <SocketControllerVue v-if="!!userStore.userState.user?.email"/>
  </div>
</template>

<script setup lang="ts">
import SocketControllerVue from '@/controller/SocketController.vue';
import { useUserStore } from '@/store/userStore';

const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
