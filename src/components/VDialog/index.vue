<template>
  <n-modal
    v-model:show="modalStore.showModal"
    preset="dialog"
    :title="modalStore.title"
    :content="modalStore.content"
    :positiveText="modalStore.positiveText"
    :negativeText="modalStore.negativeText"
    @positive-click="modalStore.positiveClick"
    @negative-click="modalStore.negativeClick"
  />
</template>

<script setup lang="ts">
import {useModalStore} from '@/store/modules/modalStore/modalStore'

const modalStore = useModalStore()
</script>

<style lang="scss" scoped>

</style>