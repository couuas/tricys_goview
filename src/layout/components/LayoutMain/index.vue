<template>
  <router-view>
    <template #default="{ Component, route }">
      <component v-if="route.meta.noKeepAlive" :is="Component"></component>
      <keep-alive v-else>
        <component :is="Component"></component>
      </keep-alive>
    </template>
  </router-view>
  <VDialog/>
</template>

<script setup lang="ts">
import VDialog from '@/components/VDialog/index.vue'
</script>
