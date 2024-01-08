<template>
  <BorderBox>
    <template #title>
      <div class="titleBox">
        <div class="mr10">{{title}}</div>
        <n-checkbox v-model:checked="checkAll" size="small" class="mr10">全选</n-checkbox>
        <n-button strong size="tiny" color="rgba(36,197,231,.5)" text-color="#fff" class="button">
          <template #icon><AssignmentTurnedInRoundIcon/></template>
          批量确认
        </n-button>
        <div style="flex: 1"></div>
        <n-checkbox-group v-model:value="select1.value" class="mr10" size="small">
          <n-space item-style="display: flex;" size="small">
            <n-checkbox :value="item.value" :label="item.label" v-for="(item, i) in select1.options" :key="i">
              <div :style="{color: item.color}" style="display: inline-block">{{item.label}}</div>
              <div style="display: inline-block">({{item.number}})</div>
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
        <n-checkbox-group v-model:value="select2.value" class="mr10" size="small">
          <n-space item-style="display: flex;">
            <n-checkbox :value="item.value" :label="item.label" v-for="(item, i) in select2.options" :key="i">
              <div :style="{color: item.color}" style="display: inline-block">{{item.label}}</div>
              <div style="display: inline-block">({{item.number}})</div>
            </n-checkbox>
          </n-space>
        </n-checkbox-group>
        <div class="more">更多>></div>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </BorderBox>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import BorderBox from './BorderBox.vue'
import { icon } from '@/plugins/icon'

const { AssignmentTurnedInRoundIcon } = icon.material


const props = defineProps(['title', 'select1', 'select2'])

const { select1, select2 } = toRefs(props)

const checkAll = ref(false)

// const select1 = reactive({
//   value: [1, 2],
//   options: [
//     { label: '严重', value: 1, number: 0, color: '#ff0000' },
//     { label: '主要', value: 2, number: 0, color: '#f43b42' },
//     { label: '次要', value: 3, number: 0, color: '#fc8358' },
//     { label: '警告', value: 4, number: 0, color: '#f8ca00' },
//     { label: '事件', value: 5, number: 0, color: '#4fbadb' },
//   ]
// })
//
// const select2 = reactive({
//   value: [],
//   options: [
//     { label: '已确认', value: 'ok', number: 0, color: '#4DCA59' },
//     { label: '未确认', value: 'not', number: 0, color: '#f5b442' },
//   ]
// })

</script>

<style lang="scss" scoped>
.mr10{
  margin-right: 10px;
}
.button{
  border: 1px solid #4196ff;
  //border-color: #4196ff;
}
.titleBox{
  display: flex;
  align-items: center;
  .more{
    color: #409eff;
    cursor: pointer;
  }
}
</style>
