<template>
  <form class="chat-message-form">
    <textarea class="chat-input" id="" cols="30" rows="10"></textarea>
    <button class="send-message-btn">
      <img src="@/icons/icons8-send-30.png" alt="sent" />
    </button>
  </form>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.chat-message-form {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .chat-input {
    width: 100%;
    height: 60px;
    margin-right: 20px;
    resize: none;
    padding: 10px;
    &::-webkit-scrollbar {
      display: none;
    }
    &:focus {
      outline: none;
    }
  }
  .send-message-btn {
  }
}
</style>
