<script setup lang="ts">
import type {RouteLocationRaw} from "vue-router";

defineProps<{ to: RouteLocationRaw }>()
</script>

<template>
  <RouterLink :to="to" class="rounded-md bg-white px-1 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"><slot></slot></RouterLink>
</template>