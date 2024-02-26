<template>
  <div class="warning-wrapper">
    <h3 class="title">Warning</h3>
    <p class="warningText">
      This application is deployed on free hosting, so its speed might be slowed down
    </p>
    <button class="close-btn" @click="() => $emit('close-warning')" type="button">Close</button>
  </div>
</template>

<script setup lang="ts">


defineEmits<{ (e: 'close-warning'): void }>()
</script>

<style lang="scss" scoped>
.warning-wrapper {
  background-color: white;
  box-shadow: 2px 2px 10px 0px rgba(0,0,0,0.75);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  padding: 20px;
  text-align: center;
  border-radius: 12px;
  .title {
    font-size: 26px;
    font-weight: 700;
    color: rgb(255, 149, 0);
    margin-bottom: 10px;
  }
  .warningText {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 20px;
  }

  .close-btn{
    width: 180px;
    height: 42px;
    background-color: rgb(63, 100, 185);
    border-radius: 12px;
    font-size: 18px;
    color: white;
  }
}
</style>