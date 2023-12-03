<template>
  <form class="sign-up-form" @submit="onSubmit">
    <CustomFormInput
      :value="values.nickname"
      name="firstName"
      type="text"
      label="First name"
      placeholder="Input your first name"
    />

    <CustomFormInput
      :value="values.email"
      name="lastName"
      type="email"
      label="Last name"
      placeholder="Input your last name"
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
    <SubmitButton submit-button-text="Sign up">
      <template #img>

        <img style="width: 24px;" src="@/icons/icons8-send.png"/>
      </template>
    </SubmitButton> 
    
  </form>
</template>

<script setup lang="ts">
import CustomFormInput from 'ui/inputs/CustomFormInput.vue'
import SubmitButton from 'ui/buttons/SubmitButton.vue'


import validationSchema from '@/utils/validate/registrationValidateSchema'
// import { useUserStore } from '@/store/userStore'

// import { useToastify } from 'vue-toastify-3'
import { useForm } from 'vee-validate'


export type InitialValuesSignUpForm = {
  nickname: string
  email: string
  password: string
  confirmPassword: string
}

// const userStore = useUserStore()
// const { toastify } = useToastify()

const { values, handleSubmit } = useForm<InitialValuesSignUpForm>({
  validationSchema,
  keepValuesOnUnmount: true
})

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  const { confirmPassword, ...data }: InitialValuesSignUpForm = {
    ...values
  }
  console.log(data);
  resetForm()
  
  // await userStore.registrationUser({
  //   data
  // })
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
