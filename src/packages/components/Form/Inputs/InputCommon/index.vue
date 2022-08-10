<template>
  <n-form-item>
    <n-input v-bind="inputOption" v-model:value="val"/>
  </n-form-item>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue'
import { CreateComponentType } from '@/packages/index.d'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

const inputOption = computed(() => props.chartConfig.option.inputOption)

const val = ref('')
</script>

<style></style>
