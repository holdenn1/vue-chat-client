<template>
  <div class="chats-error">

    <p class="chat-error-text"><slot/></p>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.chats-error{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chat-error-text{
  display: block;
  margin: 0 4px;
  font-size: 22px;
  font-weight: 500;
  text-align: center;
}
</style>