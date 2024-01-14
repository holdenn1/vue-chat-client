<template>
  <div class="main-page">
    <div class="main-page__content">
      <h2 class="main-page__title">Glad to see you!</h2>
      <div class="main-page-navigation">
        <a class="main-page-navigation__google-link" :href="GOOGLE_AUTH">
          <img src="@/icons/icons8-google.svg" /> Continue with Google</a
        >
        <router-link class="main-page-navigation__sign-up-link" :to="{ name: 'sign-in' }">
          <img src="@/icons/icons8-48.png" />Continue with email</router-link
        >
      </div>
      <p class="main-page__text">
        Don't have an account yet?
        <router-link :to="{ name: 'sign-up' }">
          <span style="color: rgb(9 41 105)">Sign up</span>
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const GOOGLE_AUTH = 'https://vue-chat-server-production.up.railway.app/auth/google/redirect'
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.main-page {
  width: 100%;
  height: 100%;
  &__content {
    height: 100%;
    @include flexCenter;
    flex-direction: column;
  }
  &__title {
    font-size: 36px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 10px;
  }

  .main-page-navigation {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    &__google-link,
    &__sign-up-link {
      border: 2px solid #11276a;
      margin: 10px;
      @include flexCenter;
      width: 240px;
      padding: 12px 10px;
      border-radius: 12px;
      img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
      }
    }
  }

  &__text {
    text-align: center;
    font-weight: 500;
  }
}
</style>
