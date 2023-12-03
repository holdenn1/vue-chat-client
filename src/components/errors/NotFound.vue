<template>
  <div class="wrapper">
    <h3>Oops!</h3>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>404 Not Found. The page you are looking for does not exist</i>
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.wrapper {
  @include flexCenter;
  height: 100vh;
  flex-direction: column;

  h3 {
    font-size: 4.5rem;
    margin-bottom: 30px;
    font-weight: 700;
  }

  p {
    font-size: 1.25rem;
    font-weight: 500;
    text-align: center;
  }
}
</style>
