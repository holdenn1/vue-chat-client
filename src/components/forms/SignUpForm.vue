<template>
  <form class="sign-up-form" @submit="onSubmit">


      <CustomFormInput
        :value="values.firstName"
        name="firstName"
        type="text"
        label="First name"
        placeholder="Input your first name"
      />
      <CustomFormInput
        :value="values.lastName"
        name="lastName"
        type="text"
        label="Last name"
        placeholder="Input your last name"
      />
      <CustomFormInput :value="values.birthday" name="birthday" type="date" label="Birthday" />

      

      
      <div class="submit-btn-wrapper">
        <SubmitButton />
      </div>
  </form>
</template>

<script setup lang="ts">

// import validationSchema from '@/utils/validate/registrationValidateSchema'
// import { useUserStore } from '@/store/userStore'

import { ref, computed, provide } from 'vue'
import { useToastify } from 'vue-toastify-3'
import { useForm } from 'vee-validate'

import SubmitButton from 'ui/buttons/SubmitButton.vue'

// const userStore = useUserStore()
const { toastify } = useToastify()


// const { values, handleSubmit, isSubmitting } = useForm({
//   validationSchema: currentSchema,
//   keepValuesOnUnmount: true
// })


// const onSubmit = handleSubmit(async (values, { resetForm }) => {

//     const { confirmPassword, ...data }: RegistrationData = {
//       ...values,
//     }
//     await userStore.registrationUser({
//       data,
//     })
// })

</script>

<style lang="scss" scoped>
.sign-up-form {
  width: 720px;
  max-height: 380px;
  margin: 0 20px;
  .submit-btn-wrapper {
    @include flexCenter;
    margin-bottom: 10px;
  }
}
</style>
