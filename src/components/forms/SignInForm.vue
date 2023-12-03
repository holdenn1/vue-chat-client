<template>
  <form class="sign-in-form" @submit="onSubmit">
    <CustomFormInput
      :value="values.email"
      name="email"
      type="email"
      label="Email"
      placeholder="Input your email"
    />
    <CustomFormInput
      :value="values.password"
      name="password"
      type="password"
      label="Password"
      placeholder="Input your password"
    />
    <div class="submit-btn-wrapper">
      <SubmitButton />
    </div>
  </form>
</template>

<script setup lang="ts">
import SubmitButton from 'ui/buttons/SubmitFormButton.vue'

// import validationSchema from '@/utils/validate/authValidateSchema'
// import { useUserStore } from '@/store/userStore'

import { ref } from 'vue'
import { useForm } from 'vee-validate'

import { useMainStore } from '@/store/mainStore'
import type { InitialValuesSignInForm } from './types'

const isShowEmailConfirmMessage = ref<boolean>(false)
const userStore = useUserStore()
const mainStore = useMainStore()

const { values, handleSubmit } = useForm<InitialValuesSignInForm>({
  validationSchema
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  await userStore.loginUser({ data: values, resetForm, isShowEmailConfirmMessage })
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.sign-in-form {
  width: 720px;
  max-height: 380px;
  margin: 0 20px;

  .submit-btn-wrapper {
    @include flexCenter;
    margin-bottom: 10px;
  }
  .forget-password {
    text-align: center;
    &__text {
      font-size: 20px;
      font-weight: 500;
      color: black;
      transition: 0.5s;
      cursor: pointer;

      &:hover {
        color: hsl(242, 61%, 48%);
      }
    }
  }
}
</style>
