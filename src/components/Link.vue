<script setup lang="ts">
defineProps<{ href: string }>()
</script>

<template>
  <a :href="href" class="rounded-md bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"><slot></slot></a>
</template>