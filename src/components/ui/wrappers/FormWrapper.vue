<template>
  <div class="form-wrapper">
    <slot/>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';

.form-wrapper{
  width: 100%;
  height: 100%;
  @include flexCenter;
}
</style>