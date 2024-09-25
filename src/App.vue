<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SidebarLayout from "@/components/SidebarLayout.vue";
</script>

<template>
<!--  <header>-->
<!--    <div>-->
<!--      <h1 class="text-2xl text-black font-bold">Jump Rope Show Creator</h1>-->
<!--    </div>-->
<!--  </header>-->

<!--  <RouterView />-->

  <SidebarLayout>
    <RouterView />
  </SidebarLayout>
</template>
