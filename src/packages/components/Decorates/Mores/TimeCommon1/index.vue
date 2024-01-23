<template>
  <div class="TimeCommon1">
    <AccessTimeFilledIcon class="left"/>
    <div class="right">
      <div class="top">{{ date }}</div>
      <div class="bottom">{{ time }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { icon } from '@/plugins/icon'
import moment from "moment";
const { AccessTimeFilledIcon } = icon.material
import { isPreview } from '@/utils/router'


let date = ref(moment().format('yyyy-MM-DD'))
const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
let time = ref(moment().format('HH:mm:ss ') + weeks[Number(moment().format('e'))])
let timer: any

onMounted(() => {
  if(!isPreview()) return
  timer = setInterval(() => {
    date.value = moment().format('yyyy-MM-DD')
    time.value = moment().format('HH:mm:ss ') + weeks[Number(moment().format('e'))]
  }, 1000)
})

onUnmounted(() => {
  if(timer) clearInterval(timer)
})

</script>

<style lang="scss" scoped>
.TimeCommon1{
  display: flex;
  align-items: center;
  .left{
    font-size: 40px;
    width: 40px;
    height: 40px;
    min-width: 40px;
    color: rgb(35, 75, 155);
  }
  .right{
    margin-left: 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top{
      color: rgb(156, 164, 175);
      height: 14px;
      font-size: 14px;
      line-height: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .bottom{
      margin-top: 4px;
      color: #fff;
      height: 14px;
      font-size: 14px;
      line-height: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>