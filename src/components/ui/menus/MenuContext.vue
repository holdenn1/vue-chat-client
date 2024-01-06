<template>
  <div
    @contextmenu="
      (e) => {
        e.preventDefault()
        console.log('ctx')
      }
    "
  ></div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
