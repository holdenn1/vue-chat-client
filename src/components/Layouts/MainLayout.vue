<template>
  <Toastify />
  <HostingWarning v-if="isShowWarning" @close-warning="() => isShowWarning = false"/>
  <div class="main-wrapper">
    <router-view />
    <SocketControllerVue v-if="!!userStore.userState.user?.email" />
  </div>
</template>

<script setup lang="ts">
import HostingWarning from '../errors/HostingWarning.vue';
import SocketControllerVue from '@/controller/SocketController.vue'
import { useUserStore } from '@/store/userStore'
import { ref } from 'vue';

const userStore = useUserStore()
const isShowWarning = ref<boolean>(true)
</script>

<style lang="scss" scoped>
.main-wrapper {
  width: 100vw;
  height: 100vh;
}
</style>
