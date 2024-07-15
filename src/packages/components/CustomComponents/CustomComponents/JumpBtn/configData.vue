<template>
    <setting-item-box name="名称" alone>
        <setting-item name="">
            <n-input v-model:value="props.customData.label" size="small" placeholder="请输入"/>
        </setting-item>
    </setting-item-box>
    <setting-item-box name="空间ID" alone>
        <setting-item name="空间ID 例如 597">
            <n-input-number v-model:value="props.customData.id" size="small" placeholder="请输入"/>
        </setting-item>
    </setting-item-box>
    <setting-item-box name="楼层ID" alone>
        <setting-item name="楼层ID 例如 13">
            <n-input-number v-model:value="props.customData.id1" size="small" placeholder="请输入"/>
        </setting-item>
    </setting-item-box>
</template>

<script lang="ts" setup>
import {SettingItemBox, SettingItem} from '@/components/Pages/ChartItemSetting'

const props = defineProps(['customData', 'request'])

</script>

<style lang="scss" scoped>
</style>
