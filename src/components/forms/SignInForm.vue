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
    <SubmitButton :is-submitting="isSubmitting" submit-button-text="Sign in">
      <template #img>

        <img style="width: 24px;" src="@/icons/icons8-send.png"/>
      </template>
    </SubmitButton> 
  </form>
</template>

<script setup lang="ts">
import CustomFormInput from 'ui/inputs/CustomFormInput.vue'
import SubmitButton from 'ui/buttons/SubmitButton.vue'

import validationSchema from '@/utils/validate/authValidationShema'
import { useUserStore } from '@/store/userStore'

import { useForm } from 'vee-validate'


export type InitialValuesSignInForm = {
  email: string
  password: string
}

const userStore = useUserStore()

const { values, handleSubmit, isSubmitting } = useForm<InitialValuesSignInForm>({
  validationSchema
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  console.log(values);
  await userStore.loginUser({ data: values })
  resetForm()
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/d-flex-ctr.scss';
.sign-in-form {
  width: 720px;
  max-height: 380px;
  margin: 0 20px;


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
