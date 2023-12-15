<template>
  <div class="chat-bar">
    <SearchMember />
  </div>
</template>

<script setup lang="ts">
import SearchMember from './SearchMember.vue'
</script>

<style lang="scss" scoped>
.chat-bar {
  max-width: 320px;
  width: 100%;
  height: 100%;
  border-right: 1px solid rgb(181, 181, 181);
  position: relative;

}
</style>
