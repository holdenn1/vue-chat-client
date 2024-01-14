<template>
  <div class="submit-btn-wrapper">
    <button :disabled="isSubmitting" class="submit-button" type="submit">
      <span>{{ submitButtonText }}</span>
      <slot name="img" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const props = defineProps<{ submitButtonText: string , isSubmitting: boolean}>()

const {isSubmitting} = toRefs(props)
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.submit-btn-wrapper {
  @include flexCenter;
  margin: 14px 0 10px;
  .submit-button {
    border: 2px solid #11276a;
    @include flexCenter;
    width: 220px;
    padding: 12px 10px;
    border-radius: 12px;
    span {
      margin-right: 12px;
    }
  }
}
</style>
