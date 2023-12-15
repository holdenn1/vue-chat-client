<template>
  <div class="chat-page-wrapper">
    <ChatVue />
  </div>
</template>

<script setup lang="ts">
import ChatVue from 'components/chat/ChatVue.vue'
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.chat-page-wrapper {
  width: 100%;
  height: 100%;
  @include flexCenter;
}
</style>
