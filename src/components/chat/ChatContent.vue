<template>
  <div class="chat-content-wrapper">
    <!-- <ChatError>Select a chat to start a conversation</ChatError> -->
    <div class="chat-header"></div>
    <div class="chat-content">
      <div class="message-of-sender">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, dolores.</p>
        <span class="message-date">21:52</span>
      </div>
      <div class="message-of-recipient">
        <p>Lorem ipsum dolor sit.</p>
        <span class="message-date">21:53</span>
      </div>
    </div>
    <div class="chat-message-form-wrapper">
      <ChatForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatForm from 'components/forms/ChatForm.vue'
// import ChatError from '../errors/ChatError.vue'
</script>

<style lang="scss" scoped>
.chat-content-wrapper {
  width: 100%;
  height: 100%;
  grid-area: chat-content;
  display: flex;
  flex-direction: column;

  .chat-header {
    width: 100%;
    height: 88.5px;
    background-color: rgb(73, 10, 144);
  }
  .chat-content {
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
    padding: 10px;
    .message-of-sender {
      background-color: #679ce3;
      margin-left: auto;
    }
    .message-of-recipient {
      background-color: #2baadd;
      margin-right: auto;
    }

    .message-of-recipient,
    .message-of-sender {
      max-width: 80%;
      padding: 10px 10px 22px;
      margin-top: 14px;
      border-radius: 12px;
      position: relative;
      .message-date{
        position: absolute;
        bottom: 4px;
        right: 10px;
        font-size: 12px;
      }
    }
  }
  .chat-message-form-wrapper {
    width: 100%;
    height: 120px;
    background-color: rgb(73, 10, 144);
    padding: 20px;
  }
}
</style>
