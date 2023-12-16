<template>
  <form class="sign-up-form" @submit="onSubmit">
    <CustomFormInput
      :value="values.nickname"
      name="nickname"
      type="text"
      label="Nickname"
      placeholder="Input your nickname"
    />

    <CustomFormInput
      :value="values.email"
      name="email"
      type="email"
      label="Email"
      placeholder="Input your last email"
    />
    <CustomFormInput
      :value="values.password"
      name="password"
      type="password"
      label="Password"
      placeholder="Input your password"
    />

    <CustomFormInput
      :value="values.confirmPassword"
      name="confirmPassword"
      type="password"
      label="Confirm password"
      placeholder="Confirm your password"
    />
    <SubmitButton :is-submitting="isSubmitting" submit-button-text="Sign up">
      <template #img>
        <img style="width: 24px" src="@/icons/icons8-send.png" />
      </template>
    </SubmitButton>
  </form>
</template>

<script setup lang="ts">
import CustomFormInput from 'ui/inputs/CustomFormInput.vue'
import SubmitButton from 'ui/buttons/SubmitButton.vue'

import validationSchema from '@/utils/validate/registrationValidateSchema'
import { useUserStore } from '@/store/userStore'

import { useForm } from 'vee-validate'
import type { RegistrationUserData } from '@/api/requests/types'

export type InitialValuesSignUpForm = {
  confirmPassword: string
} & RegistrationUserData

const userStore = useUserStore()

const { values, handleSubmit, isSubmitting } = useForm<InitialValuesSignUpForm>({
  validationSchema,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { confirmPassword, ...data }: InitialValuesSignUpForm = {
    ...values
  }

  await userStore.registrationUser({
    data
  })
  resetForm()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.sign-up-form {
  width: 720px;
  max-height: 380px;
  margin: 0 20px;
}
</style>
