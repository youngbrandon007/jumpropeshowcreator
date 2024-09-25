<script setup lang="ts">
defineProps<{ placeholder: string, value: string }>()

const emit = defineEmits<{(e: "change", event: string): void}>()
</script>


<template>
  <div>
    <label for="input" class="sr-only">Input</label>
    <input type="text" name="input" id="input" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" :placeholder="placeholder" :value="value" @change="(e: Event) => emit('change', (e.target as HTMLInputElement).value)">
  </div>
</template>