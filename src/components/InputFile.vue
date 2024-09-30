<script setup lang="ts">
const emits = defineEmits<{(e: "change", event: Event): void}>()
</script>

<template>
  <div class="flex justify-center rounded-md border border-dashed border-gray-900/25 px-6 py-2">
    <div class="text-center">
      <div class="flex text-sm leading-6 text-gray-600">
        <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
          <span><slot></slot></span>
          <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="e => emits('change', e)" />
        </label>
      </div>
    </div>
  </div>
</template>