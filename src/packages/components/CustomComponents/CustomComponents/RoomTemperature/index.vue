<template>
  <BorderBox :title="chartConfig?.customData?.title" :style="getStyle(borderRadius)" style="overflow: visible">
   <div class="contentBox">
    <!-- 楼层 -->
   <div class="row flex" v-for="floor in floorData" :key="floor.name">
    <!-- 楼层名 -->
    <div class="floorNum">{{floor.name}}</div>
    <!-- 房间 -->
    <div class="box flex" v-for="room in floor.roomList" :class="{mr0:floor.roomList.length-1!==0}" :key="room.roomName">
      <div class="thermometer" :style="`background-color:${ levelValue(room.level)}`"></div>
      <div class="room">
        <span>{{room.roomName}}</span>
        <span>{{room.temperature}}</span>
      </div>
      
    </div>
   </div>
   <div class="level flex">
    <div class="levelItem flex" @click="onClickLevel(item)" v-for="(item,index) in levelList" :key="index" >
      <div class="circle" :class="{activeLevel:item.checked}" :style="`background-color:${item.color}`"></div>
      <div class="levelName">{{item.name}}</div>
      
    </div>
   </div>
  </div>
  </BorderBox>
</template>

<script setup lang="ts">

import { PropType, shallowReactive, watch, toRefs, reactive, onMounted, onUnmounted, nextTick, ref,computed } from 'vue'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { publicInterface } from '@/api/path/business.api'
import BorderBox from '../components/BorderBox.vue'
import VChart from 'vue-echarts'
import {isPreview} from '@/utils'
import {graphic} from "echarts";
import {cloneDeep} from 'lodash'
import moment from "moment"
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import {RequestHttpIntervalEnum} from "@/enums/httpEnum";

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  },

  
})
const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}
console.log(props.chartConfig,'chartConfig');

const computeNodeData:{[k:string]: number} = reactive({
  abnormal_count: 0,
  abnormal_server_count: 0,
  busy_server_count: 0,
  loss_server_count: 0,
  need_updated_count: 0,
  node_count: 0,
  offline_server_count: 0,
  sever_count: 0
})
const levelList = reactive([
  {
    name:'正常',
    level:0,
    color:'#4DCA59',
    checked:false
  },
  {
    name:'紧急告警',
    level:4,
    color:'#F43B42',
    checked:false
  },
  {
    name:'严重告警',
    level:3,
    color:'#FC8358',
    checked:false

  },
  {
    name:'重要告警',
    level:2,
    color:'#F8CA00',
    checked:false
  },
  {
    name:'一般告警',
    level:1,
    color:'#4FBADB',
    checked:false
  },
])
const floorData = reactive(
  [
  {
    name: '5楼',
    roomList:[
      {
      roomName:'401',
      temperature:'30°C',
      level:0,
    },
      {
      roomName:'401',
      temperature:'30°C',
      level:1,
    },
      {
      roomName:'301',
      temperature:'30°C',
      level:2,
    },
      {
      roomName:'101',
      temperature:'30°C',
      level:4,
    },
  ]
  },
  {
    name: '4楼',
    roomList:[
      {
      roomName:'401',
      temperature:'30°C',
      level:0,
    },
      {
      roomName:'401',
      temperature:'30°C',
      level:1,
    },
      {
      roomName:'301',
      temperature:'30°C',
      level:2,
    },
      {
      roomName:'101',
      temperature:'30°C',
      level:3,
    },
  ]
  },
  {
    name: '3楼',
    roomList:[
      {
      roomName:'401',
      temperature:'30°C',
      level:0,
    },
      {
      roomName:'401',
      temperature:'30°C',
      level:1,
    },
      {
      roomName:'301',
      temperature:'30°C',
      level:2,
    },
      {
      roomName:'101',
      temperature:'30°C',
      level:3,
    },
  ]
  },
  {
    name: '2楼',
    roomList:[
      {
      roomName:'401',
      temperature:'30°C',
      level:0,
    },
      {
      roomName:'401',
      temperature:'30°C',
      level:1,
    },
      {
      roomName:'301',
      temperature:'30°C',
      level:2,
    },
      {
      roomName:'101',
      temperature:'30°C',
      level:3,
    },
  ]
  },
  {
    name: '1楼',
    roomList:[
      {
      roomName:'401',
      temperature:'30°C',
      level:0,
    },
      {
      roomName:'401',
      temperature:'30°C',
      level:1,
    },
      {
      roomName:'301',
      temperature:'30°C',
      level:2,
    },
      {
      roomName:'101',
      temperature:'30°C',
      level:3,
    },
  ]
  },
  
])

const levelValue = (level:any)=>{
  const obj:any =  levelList.find(item=>item.level===level)
 return obj.value
}
const onClickLevel = (item:any) => {
  console.log(item,'item')
  // 先初始化
  levelList.forEach(_ => {
    if(_.level!==item.level){
      _.checked = false
    }
  })
  // 再赋值
item.checked = !item.checked  
}


const getData = () => {
  publicInterface('/dcim/dems/statistic', 'count_node', {}).then(res => {
    if (res && res.data) {
      for (const key in computeNodeData) {
        computeNodeData[key] = res.data[key]
      }
    }
  })
}
let timer:unknown
watch(() => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'), v => {
  if(!isPreview()) return
  console.log(props,'props')
  
  if(props.chartConfig.request.requestInterval) {
    if(timer) clearInterval(timer as number)
    const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
    const unit = obj.unit
    const number = unit * props.chartConfig.request.requestInterval
    timer = setInterval(() => {
      getData()
    }, number)
  }
})

watch(props.chartConfig,(v)=>{
  console.log(props.chartConfig?.customData?.currentSource,'chartConfig');
  // 根据currentSource去获取对应 参数
  
})
onMounted(() => {
  nextTick(() => {

    getData()
  })
  if(!isPreview()) return
  const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
  const unit = obj.unit
  const number = unit * props.chartConfig.request.requestInterval!
  timer = setInterval(() => {
    nextTick(() => {
      getData()
    })
  }, number)
})
onUnmounted(() => {
  clearInterval(timer as number)
})

// const option = shallowReactive({
//   dataset: ''
// })
// // 预览更新
// useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
//   option.dataset = newData
// })
</script>

<style lang="scss" scoped>
.flex{
  display: flex;
  // justify-self: start;
  // justify-content: space-between;
  align-items: center;
}
.contentBox{
  position: relative;
  bottom:10px;
  top:0px;
  width: 100%;
  height: calc(100% - 20px);
  overflow: auto;
  .row{
  width: 100%;
  // height: 100px;
  
 
  .floorNum{
    width: 52px;
height: 30px;
margin-left: 10px;
line-height: 30px;
text-align: center;
border-radius: 2px;
color:#fff;


/* 自动布局 */
display: flex;
flex-direction: column;
// padding: 9px 16px;

/* 蓝色10% */
background: rgba(65, 150, 255, 0.1);

box-sizing: border-box;
/* 大屏底色 */
/* 样式描述：50% */
border: 1px solid rgba(65, 150, 255, 0.5);
  }
  .box{
    height: 48px;
    width: 78px;
    background: #ccc;
    border-radius: 2px;
opacity: 1;
margin: 5px 10px;

/* 蓝色10% */
background: rgba(65, 150, 255, 0.1);
.thermometer{
    width: 24px;
    height: 24px;
    border-radius: 50%;

    margin-right: 3px;
    margin-left:5px;
  }
  .room{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span{
      font-family: Microsoft YaHei;
font-size: 12px;
font-weight: normal;

font-variation-settings: "opsz" auto;
/* 主色/容器背景色 */
/* 样式描述：浅色系统容器背景色
弹窗背景色 */
color: #FFFFFF;
    }
  }
  
  }

 
}
.mr0{
  margin-right: 0 !important;
}
  .level{
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  bottom: 2px;
  font-size: 12px;
  justify-content: center;
  background: transparent;
  .levelItem{
    margin: 0 10px;
    cursor: pointer;
    color: #fff;
    .circle{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
  }
  }
 
}
.activeLevel{
  background: #ccc !important;
}

}



</style>
