<script setup lang="ts">
import {RouterView, useRouter} from 'vue-router'
import SidebarLayout from "@/components/SidebarLayout.vue";
import {onMounted, watch} from "vue";

const router = useRouter()

onMounted(checkRedirect)
watch(router.currentRoute, checkRedirect)

function checkRedirect() {
  const fullPath = router.currentRoute.value.fullPath

  if(fullPath.startsWith("/?/")){
    router.push(fullPath.substring(3))
  }
}
</script>

<template>
  <SidebarLayout>
    <RouterView />
  </SidebarLayout>
</template>
