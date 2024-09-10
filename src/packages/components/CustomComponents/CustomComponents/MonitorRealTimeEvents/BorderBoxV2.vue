<template>
  <BorderBox>
    <template #title>
      <div class="titleBox">
        <div class="mr10 nowrap">{{title}}</div>
        <n-checkbox :checked="checkAll" @update:checked="(v:boolean) => emit('update:checkAll', v)" size="small" class="mr10 nowrap">全选</n-checkbox>
        <n-button strong size="tiny" color="rgba(36,197,231,.5)" text-color="#fff" class="button" @click="clickBatch">
          <template #icon>
            <AssignmentTurnedInRoundIcon/>
          </template>
          批量确认
        </n-button>
        <div style="flex: 1"></div>
        <div class="more nowrap" @click="jumpMore">更多>></div>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </BorderBox>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
import BorderBox from '../components/BorderBox.vue'
import { icon } from '@/plugins/icon'

const { AssignmentTurnedInRoundIcon } = icon.material

interface propsType {
  title: string,
  checkAll: boolean,
}
const props = defineProps<propsType>()


const emit = defineEmits(['clickBatch', 'update:checkAll', 'jumpMore'])
const clickBatch = () => {
  emit('clickBatch')
}

const jumpMore = () => {
  emit('jumpMore')
}

</script>

<style lang="scss" scoped>
.mr10{
  margin-right: 10px;
}
.button{
  border: 1px solid #4196ff;
  //border-color: #4196ff;
}
.nowrap{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.titleBox{
  display: flex;
  align-items: center;
  overflow: hidden;
  .more{
    font-size: 14px;
    color: #409eff;
    cursor: pointer;
  }
}
</style>
