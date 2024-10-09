<script setup lang="ts">
defineProps<{ min: number | string; max: number | string }>()

const value = defineModel<string>("value")
</script>

<template>
  <input type="range" v-model="value" :min="min" :max="max" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
</template>