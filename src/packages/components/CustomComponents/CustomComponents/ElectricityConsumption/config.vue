<template>
</template>

<script setup lang="ts">
import { CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import {computed, PropType} from "vue";
import {GlobalThemeJsonType} from "@/settings/chartThemes";

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const config = computed(() => {
  return props.optionData
});
</script>

<style lang="scss" scoped>

</style>