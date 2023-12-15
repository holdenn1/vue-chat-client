<template>
  <div class="form-input">
    <input
      class="input"
      :value="searchMemberValue"
      @input="(e) => handleInput(e)"
      type="text"
      :placeholder="placeholder"
    />
    <img class="clear-found-members" @click="clearMembers" :src="clearFoundMembers" alt="" />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import clearFoundMembers from '@/icons/icons8-clear.svg'

const props = defineProps<{
  searchMemberValue: string
  handleInput(e: Event): void
  clearMembers(): void
  placeholder?: string
}>()

const { searchMemberValue } = toRefs(props)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style lang="scss" scoped>
@import '@/styles/mixins/input.scss';
.form-input {
  width: 100%;
  position: relative;

  .input {
    padding: 10px 8px;
    width: 100%;
    background-color: inherit;
    outline: navy;
    border: 1px solid black;
    border-radius: 12px;
    background: url('@/icons/icons8-search.svg') no-repeat scroll 6px 6px;
    padding-left: 36px;
    background-color: #c0d5eb;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-background-clip: text;
      -webkit-text-fill-color: #000000;
      transition: background-color 5000s ease-in-out 0s;
      box-shadow: inset 0 0 20px 20px #ffffff29;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .clear-found-members {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(0, -50%);
  }
}
</style>
