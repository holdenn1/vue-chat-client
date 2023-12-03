<template>
  <button type="submit" class="btn-submit">
    <span>Submit</span>
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/styles/mixins/main-button.scss';
.btn-submit {
  @include mainButton(hsl(199, 90%, 47%), hsl(199, 90%, 47%));
}
</style>
