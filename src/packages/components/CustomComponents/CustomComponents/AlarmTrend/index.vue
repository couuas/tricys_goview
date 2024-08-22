<template>
  <div style="overflow: visible;">
    <BorderBox :title="chartConfig?.customData?.title" :style="getStyle(borderRadius)" style="overflow: auto">
      <div class="tab-item">
      <span class="change_tab" :class="{'change_tab--active': tab === 0}" @click="changeTab(0)">月</span>
      <span class="change_tab" :class="{'change_tab--active': tab === 1}" @click="changeTab(1)">年</span>
    </div>
    <v-chart ref="vChartRef" :option="chartOption" autoresize></v-chart>
      
    </BorderBox>
  </div>
</template>

<script setup lang="ts">
import BorderBox from '../components/BorderBox.vue'
import VChart from 'vue-echarts'
import {computed, PropType, Ref, onMounted, ref, watch, onUnmounted} from "vue";
import { customData as customDataConfig } from './config'
import { CreateComponentType } from '@/packages/index.d'
import { publicInterface } from '@/api/path/business.api'
import {isPreview} from '@/utils'
import moment from 'moment'
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";


const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
const tab = ref(0)
const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden',
  }
}

const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})


const {signal_ids,alarmConfirmStatus,alarmRecoveryStatus,level} = customData.value


const   changeTab = (flag:any)=> {
  tab.value = flag
  getData()
}


let chartOption:Ref<any> = ref({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#27558e'
            }
          },
         
        },
        grid: {
          right: '2%',
          top: '12%',
          left: '2%',
          bottom: '2%',
          containLabel: true
        },
        color: ['#E5403D', '#EE7F57', '#EEC219', '#50AFCE', '#82C046'],
        dataZoom:{
      show: false,
      height: 5,
      xAxisIndex: [0],
      bottom: 10,
      showDetail: false,
      showDataShadow: false,
      borderColor: 'transparent',
      textStyle: {
        fontSize: 0
      },
      startValue: 0,
      endValue: 5, // 从0开始的7个
      backgroundColor: 'rgba(0,0,0,0)',
      borderWidth: 0,
      handleSize: '0%',
      handleStyle: {
        color: '#d3dee5'
      }
    },
        legend: {
          data: [],
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#ccc'
          },
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            name: '',
            boundaryGap: false,
            data: [],
            axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#ccc',
            fontWeight: 'normal',
            fontSize: '12'
          },
          interval: 0
        },
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '',
            minInterval: 1,
            axisLabel: {
              show: true,
              textStyle: {
                color:  '#ccc'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#4196ff',
                opacity: 0.2
              }
            },
            splitLine: {
              lineStyle: {
                color:  '#e0e0e0' 
              }
            }
          }
        ],
        series: [
        ]
      },)
const vChartRef = ref()


const getData = () => {
  let params:any = {
    signal_ids:signal_ids.length?signal_ids.split(','):[],
    alarmConfirmStatus,
    alarmRecoveryStatus,
    level
  }
  tab.value===0?params['before_day'] =  30:params['before_month'] =  12
  publicInterface('/dcim/dems/devie_history_alarm', 'trend_chart', params).then((response:any) => {
    let res  = response?.data
    console.log(res,'res');

    
    if (res && res['series']) {
          chartOption.value.xAxis[0]['data'] = res['legend']
          chartOption.value.legend.data = []
          chartOption.value.series = []
          for (let i = 0; i < res['series'].length; i++) {
            chartOption.value.series.push(
              {
                name: res['series'][i]['name'],
                type: 'line',
                smooth: true,
                showSymbol: true,
                symbol: 'circle',
                data: res['series'][i]['data']
              }
            )
            chartOption.value.legend.data.push({ name: res['series'][i]['name'] })
          }
        console.log(chartOption.value,'chartOption');
        
        }
      })
}



let timer:unknown
watch(() => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'), v => {
  if(!isPreview()) return
  if(props.chartConfig.request.requestInterval) {
    if(timer) clearInterval(timer as number)
    const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
    const unit = obj.unit
    const number = unit * props.chartConfig.request.requestInterval
    timer = setInterval(() => {
    }, number)
  }
})

onMounted(() => {
  getData()
  if(!isPreview()) return
  const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
  const unit = obj.unit
  const number = unit * props.chartConfig.request.requestInterval!
  timer = setInterval(() => {
  }, number)
})

onUnmounted(() => {
  if(timer) clearInterval(timer as number)
})

</script>

<style lang="scss" scoped>
.tab-item {
      position: absolute;
      top: 0;
      right: 10px;
      padding-right: 10px;
      color: #fff;
      height: 40px;
      line-height: 40px;
      .change_tab {
        display: inline-block;
        margin: 0 4px;
        cursor: pointer;
        font-size: 14px;
        color: themed('dynamicComponentTabColor');
        font-family: 'PingFang-SC-Regular';
        &--active {
          border-bottom: 1px solid #4196ff;
          color: #4196ff;
          font-family: 'PingFang-SC-Bold';
        }
      }
    }
.box{
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
  .radio{
    position: absolute;
    right: 0;
    top: -40px;
  }
}
</style>