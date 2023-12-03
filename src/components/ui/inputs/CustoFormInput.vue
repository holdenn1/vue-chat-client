<template>
  <div class="form-input">
    <label class="label-input" v-if="label" :for="name">{{ label }}</label>
    <input
      class="input"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
    />
    <p class="error" v-show="errorMessage || meta.valid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps<{
  type: string
  value: string | undefined
  name: string
  label?: string
  placeholder?: string
}>()

const name = toRef(props, 'name')

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta
} = useField(name, undefined, {
  initialValue: props.value
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/input.scss';
.form-input {
  width: 100%;

  .label-input {
    display: block;
    font-size: 18px;
    font-weight: 500;
    color: black;
  }
  .input {
    @include input;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .error {
    text-align: center;
    color: red;
  }
}
</style>
