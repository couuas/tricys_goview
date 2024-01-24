<template>
  <n-modal
    :show="show"
    preset="dialog"
    class="modal"
    title=""
    :show-icon="false"
    @close="close"
    @esc="close"
    style="width: 500px"
  >
    <div class="header">
      <div>告警详情</div>
    </div>
    <div class="box">
      <div class="label">告警时间</div>
      <div class="value">{{data.generate_time && moment(data.generate_time).format('yyyy-MM-DD HH:mm:ss')}}</div>
      <div class="label">告警级别</div>
      <div class="value">
        <n-tag size="small" :color="{textColor: data.color1, borderColor: data.color1}">
          {{select1Options[data.level - 1].label}}
        </n-tag>
      </div>
      <div class="label">告警位置</div>
      <div class="value cv">{{data.position}}</div>
      <div class="label">设备名称</div>
      <div class="value">{{data.device_name}}</div>
      <div class="label">告警测点</div>
      <div class="value">{{data.node_name}}</div>
      <div class="label">告警内容</div>
      <div class="value fv">{{data.content}}</div>
      <div class="label">是否确认</div>
      <div class="value">{{data.confirm_status}}</div>
      <div class="label">确认人</div>
      <div class="value">{{data.confirm_people}}</div>
      <div class="label">确认时间</div>
      <div class="value iv">{{data.confirm_time && moment(data.confirm_time).format('yyyy-MM-DD HH:mm:ss')}}</div>
      <div class="label">重新确认</div>
      <div class="value">{{data.reconfirmation_time_str}}</div>
      <div class="label">告警序列号</div>
      <div class="value">{{data.serial_no}}</div>
      <div class="label">备注</div>
      <div class="value lv">{{data.remark}}</div>
    </div>
  </n-modal>
</template>

<script lang="ts" setup>
import { ref, defineEmits, computed } from 'vue'
import { icon } from '@/plugins/icon'
import { cloneDeep } from 'lodash'
import moment from 'moment'

const { CloseIcon } = icon.ionicons5

const props = defineProps(['show', 'data', 'select1Options'])

const emit = defineEmits(['close', 'update:show'])
const close = () => {
  emit('close')
  updateShow(false)
}

const updateShow = (flag:boolean) => {
  emit('update:show', flag)
}

// const computerData = computed(() => {
//   let obj = cloneDeep(props.data)
//   return obj
// })
</script>

<style>
.modal{
  padding: 0;
  background: #121922;
  box-sizing: border-box;
}
.modal .n-dialog__content{
  margin-top: 0;
}
.modal .n-dialog__close{
  margin-top: 7px;
  margin-right: 10px;
}
</style>
<style lang="scss" scoped>
.header{
  display: flex;
  align-items: center;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;;
  box-sizing: border-box;
  border-left: 1px solid #2f3a49;
  border-top: 1px solid #2f3a49;
  border-right: 1px solid #2f3a49;
}
.cv{
  grid-area: cv;
}
.fv{
  grid-area: fv;
}
.iv{
  grid-area: iv;
}
.lv{
  grid-area: lv;
}
.box{
  height: 240px;
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(2, 2fr 3fr);
  grid-template-areas: 'a av b bv' 'c cv cv cv' 'd dv e ev' 'f fv fv fv' 'g gv h hv' 'i iv iv iv' 'j jv k kv' 'l lv lv lv';
  border-left: 1px solid #2f3a49;
  border-top: 1px solid #2f3a49;
  box-sizing: border-box;
  .label{
    padding-left: 10px;
    height: 36px;
    width: 100%;
    background: #242e3b;
    line-height: 36px;
    font-size: 12px;
    border-right: 1px solid #2f3a49;
    border-bottom: 1px solid #2f3a49;
    box-sizing: border-box;
  }
  .value{
    display: flex;
    align-items: center;
    padding-left: 10px;
    height: 36px;
    width: 100%;
    background: #121922;
    line-height: 14px;
    font-size: 12px;
    border-right: 1px solid #2f3a49;
    border-bottom: 1px solid #2f3a49;
    box-sizing: border-box;
  }
}
</style>
