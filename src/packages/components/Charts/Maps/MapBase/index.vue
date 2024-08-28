<template>
  <div ref="box" :style="{scale}" style="position: absolute">
    <div class="back-icon" v-if="(enter && levelHistory.length !== 0) || (enter && !isPreview())" @click="backLevel">
      <n-icon :color="backColor" :size="backSize * 1.1">
        <ArrowBackIcon />
      </n-icon>
      <span
        :style="{
          'font-weight': 200,
          color: backColor,
          'font-size': `${backSize}px`
        }"
      >
        返回上级
      </span>
    </div>
    <v-chart
      ref="vChartRef"
      :init-options="initOptions"
      :theme="themeColor"
      :option="option.value"
      :manual-update="isPreview()"
      autoresize
      @click="chartPEvents"
    >
    </v-chart>
  </div>
</template>

<script setup lang="ts">
import { PropType, reactive, watch, ref, nextTick, toRefs, computed, Ref, onMounted, onUnmounted } from 'vue'
import config, { includes } from './config'
import VChart from 'vue-echarts'
import { icon } from '@/plugins'
import { useCanvasInitOptions } from '@/hooks/useCanvasInitOptions.hook'
import { use, registerMap } from 'echarts/core'
import { EffectScatterChart, MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { useChartDataFetch } from '@/hooks'
import { mergeTheme, setOption } from '@/packages/public/chart'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import {  useChartCommonData } from '@/hooks'

import {isPreview, postMessageToParent} from '@/utils'
import mapJsonWithoutHainanIsLands from './mapWithoutHainanIsLands.json'
import mapChinaJson from './mapGeojson/china.json'
import { DatasetComponent, GridComponent, TooltipComponent, GeoComponent, VisualMapComponent } from 'echarts/components'
import { customData as customDataConfig } from './config'
import { publicInterface } from '@/api/path/business.api'
import {useOriginStore} from "@/store/modules/originStore/originStore";
import {selectTimeOptions} from "@/views/chart/ContentConfigurations/components/ChartData/index.d";
import { debounce } from 'lodash'

const props = defineProps({
  themeSetting: {
    type: Object,
    required: true
  },
  themeColor: {
    type: Object,
    required: true
  },
  chartConfig: {
    type: Object as PropType<config>,
    required: true
  }
})

const customData: Ref<typeof customDataConfig> = computed(() => {
  return props.chartConfig.customData as typeof customDataConfig
})

const { ArrowBackIcon } = icon.ionicons5
let levelHistory: any = ref([])

const { backColor, backSize, enter } = toRefs(props.chartConfig.option.mapRegion)
const initOptions = useCanvasInitOptions(props.chartConfig.option, props.themeSetting)

use([
  MapChart,
  DatasetComponent,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  GeoComponent,
  EffectScatterChart,
  VisualMapComponent
])

const option = reactive({
  value: mergeTheme(props.chartConfig.option, props.themeSetting, includes)
})

const originStore = useOriginStore()
const systemConfig = originStore.getOriginStore.user.systemConfig

const activeAlarmData = computed(() => {
  let obj:any = {levels: [], confirm_statuses: []}
  if (systemConfig['active_alarm_level']) {
    for (let i = 0; i < Number(systemConfig['active_alarm_level']); i++) {
      obj.levels.push(i + 1)
    }
  }
  if (systemConfig['active_alarm_confirm_status']) {
    obj.confirm_statuses = [...JSON.parse(systemConfig['active_alarm_confirm_status'])]
  }
  return obj
})

const dataMap = computed(() => {
  let obj = {}
  try {
    obj = JSON.parse(customData.value.dataMap)
  } catch (e) {
    console.log(e)
  }
  return obj
})

let getData = () => {
  let obj = dataMap.value as any
  if(JSON.stringify(obj) !== '{}') {
    let ids = []
    for(let k in obj) {
      if(obj[k].roomId) ids.push(obj[k].roomId)
    }
    const param = {
      ids,
      ...activeAlarmData.value
    }
    publicInterface('/dcim/dems/device', 'get_space_tree_with_status_v3', param).then((res: any) => {
      if(res.data) {
        colorMap.value = {}
        res.data = res.data.filter((_: any) => _.node_status !== 0)
        res.data.forEach((_: any) => {
          colorMap.value[_.id] = '#f43b42'
        })
        vEchartsSetOption()
      }
    })
  }
  else {
    vEchartsSetOption()
  }
}
getData = debounce(getData, 200)

const vChartRef = ref<typeof VChart>()
const currentMap: Ref<any> = ref(null)
let colorMap: Ref<any> = ref({})
const updateMapFn = (data: any) => {
  if(!data) return
  props.chartConfig.option.series[0].data = data.features.map((it: any) => {
    let obj = (dataMap.value as any)[it.properties.name] || {}
    return {
      name: it.properties.name,
      adcode: it.properties.adcode,
      
      value: it.properties.center ? it.properties.center.concat(50) : [],
      itemStyle: {
        color: colorMap.value[obj.roomId] || '#4dca59',
      }
    }
  })
}

//动态获取json注册地图
const getGeojson = (regionId: string) => {
  return new Promise<boolean>(resolve => {
    console.log(regionId,'regionId')
    if(regionId==='440600'){
      get_area_dev_count()
    }
    import(`./mapGeojson/${regionId}.json`).then(data => {
      currentMap.value = data.default
      registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} })
      updateMapFn(data.default)
      resolve(true)
    })
  })
}
const get_area_dev_count =async ()=>{
  const res  = await publicInterface('/dcim/dems/device','get_area_dev_count', {space_type:'county'})
  customData.value.devList = res?.data
}
//异步时先注册空的 保证初始化不报错
if(props.chartConfig.option.mapRegion.province){
  registerMap(`${props.chartConfig.option.mapRegion.province}`, { geoJSON: {} as any, specialAreas: {} })

}else{
  registerMap(`${props.chartConfig.option.mapRegion.adcode}`, { geoJSON: {} as any, specialAreas: {} })

}

// 进行更换初始化地图 如果为china 单独处理
const registerMapInitAsync = async () => {
  await nextTick()
  const adCode = `${props.chartConfig.option.mapRegion.adcode}`
  const province = `${props.chartConfig.option.mapRegion.province}`
  if (adCode !== 'china') {

    await getGeojson(province?province:adCode)
  } else {
    await hainanLandsHandle(props.chartConfig.option.mapRegion.showHainanIsLands)
  }
  vEchartsSetOption()
}
registerMapInitAsync()

const handleClickMap = (e: any) => {
  let obj = dataMap.value as any
  if(obj && JSON.stringify(obj) !== '{}') {
    let path = obj[e.name]?.skipPath
    if(path) openWeb(path)
  }
}

onMounted(() => {
  if(vChartRef.value) {
    vChartRef.value.chart.on('click', 'series.map', handleClickMap)
  }
})

onUnmounted(() => {
  if(vChartRef.value) vChartRef.value.chart.off('click', 'series.map', handleClickMap)
})

const openWeb = (url: string) => {
  postMessageToParent({
    type: 'changeRouterV1',
    url
  })
}

// 手动触发渲染
const vEchartsSetOption = () => {
  updateMapFn(currentMap.value)
  option.value = props.chartConfig.option
  setOption(vChartRef.value, props.chartConfig.option)
}


// 处理海南群岛
const hainanLandsHandle = async (newData: boolean) => {
  if (newData) {
    await getGeojson('china')
  } else {
    registerMap('china', { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} })
  }
}

// 点击区域
const chartPEvents = (e: any) => {
  console.log(e,'e')
  console.log(props.chartConfig.option,'props.chartConfig.option.series[1]')
  if(props.chartConfig.option.mapRegion.province===440600){
   const county  =  currentMap.value.features.find((item:any)=>item.properties.name===e.name)
if(county){
 const space_complete:any = customData.value.devList.find((item:any)=>{
    if(item.space.extend_column_string.length){

     return JSON.parse(item.space.extend_column_string).county_code===`${county.properties.adcode}`
    }
  })

  const chartEditStore = useChartEditStore()
  chartEditStore.getComponentList.forEach(component=>{
    if(component.commonData.currentSource==='areaDevCount'){
      component.commonData['areaDevCount'].space_complete_id = space_complete?space_complete?.space.complete_id:null 
        //  useChartCommonData(component, useChartEditStore)
    }

  })
}
    console.log(county,'county')
    }
  if (e.seriesType !== 'map') return
  if (!props.chartConfig.option.mapRegion.enter) {
    return
  }
  mapChinaJson.features.forEach(item => {
    var pattern = new RegExp(e.name)
    if (pattern.test(item.properties.name)) {
      let code = String(item.properties.adcode)
      levelHistory.value.push(code)
      checkOrMap(code)
    }
  })
}

// 返回上一级
const backLevel = () => {
  levelHistory.value = []
  if (levelHistory.value.length > 1) {
    levelHistory.value.pop()
    const code = levelHistory[levelHistory.value.length - 1]
    checkOrMap(code)
  } else {
    checkOrMap('china')
  }
}

// 切换地图
const checkOrMap = async (newData: string) => {
  await getGeojson(newData)
  props.chartConfig.option.geo.map = newData
  props.chartConfig.option.series.forEach((item: any) => {
    if (item.type === 'map') item.map = newData
  })
  vEchartsSetOption()
}

onMounted(() => {
  nextTick(() => {
    getData()
  })
})

watch(() => customData.value.dataMap, () => {
  let obj = dataMap.value as any
  props.chartConfig.option.series[1].tooltip.formatter = (v: any) => {
    // if(props.chartConfig.option.mapRegion.province===440600){
    //   let str = `<div style="display: flex;align-items: center"><span style="margin-right: 20px;">${v.name}</span><span>${1111}</span></div>`
    //   return str
    // }
    let value: any
    if(JSON.stringify(obj) !== '{}') value = obj[v.name]?.value || '-'
    else value = !isNaN(v.value) ? v.value : '-'
    let str = `<div style="display: flex;align-items: center"><span style="margin-right: 20px;">${v.name}</span><span>${value}</span></div>`
    return str
  }
  getData()
}, {
  immediate: true
})

let scale = ref(1)
const handleWheel = (event: any) => {
  // 阻止默认行为（例如页面滚动）
  event.preventDefault();
  if(!option.value.canScroll) return
  // 检查滚动方向
  if (event.deltaY < 0) {
    scale.value = Math.min(3, scale.value + 0.1)
  }
  else {
    scale.value = Math.max(0.1, scale.value - 0.1)
  }
}

// 查找父元素，确保父元素的类名为 .go-preview-scale
function findParentWithClass(element: any, className: string) {
  // 当前元素的父元素
  let parent = element.parentElement;
  // 遍历父元素链，直到找到匹配的类名或到达文档根元素
  while (parent && !parent.classList.contains(className)) {
    parent = parent.parentElement;
  }
  // 返回找到的父元素，或者 null 如果没有匹配的父元素
  return parent;
}

const getScaleXY = (v: string) => {
  // 定义正则表达式来匹配 scale 函数中的两个数字
  const regex = /scale\((\d*\.?\d+),\s*(\d*\.?\d+)\)/;

  // 使用正则表达式匹配并提取数字
  const matches = v.match(regex);

  if (matches) {
    const scaleX = parseFloat(matches[1]);
    const scaleY = parseFloat(matches[2]);
    return [scaleX, scaleY]
  } else {
    return [1, 1]
  }
}

let offsetX:number, offsetY:number
let left:number, top:number
let isDragging = ref(false)
const box = ref()
const handleMousedown = (event: any) => {
  if(box.value) {
    let el = box.value
    isDragging.value = true;

    offsetX = event.clientX
    offsetY = event.clientY
    left = el.style.left.replace('px', '') * 1 || 0
    top = el.style.top.replace('px', '') * 1 || 0

    // 添加鼠标移动和松开事件监听器
    document.addEventListener('mousemove', handleMousemove)
    document.addEventListener('mouseup', handleMouseup)
  }
}

// 当鼠标移动时触发
const handleMousemove = (event: any) => {
  if(!option.value.canDrag) return
  if (!isDragging.value) return;
  if(box.value){
    let parent = findParentWithClass(box.value, 'go-preview-scale')
    let [scaleX, scaleY] = getScaleXY(parent.style.transform)
    let el = box.value


    // 计算元素的新位置
    const x = left + (event.clientX - offsetX) / scaleX
    const y = top + (event.clientY - offsetY) / scaleY
    // 更新元素的位置
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }
}

// 当鼠标松开时触发
const handleMouseup = (event: any) => {
  if(!option.value.canDrag) return
  isDragging.value = false;

  // 移除鼠标移动和松开事件监听器
  document.removeEventListener('mousemove', handleMousemove);
  document.removeEventListener('mouseup', handleMouseup);
}

onMounted(() => {
  nextTick(() => {
    if(vChartRef.value) {
      vChartRef.value.$el.addEventListener('wheel', handleWheel, { passive: false })
    }
    if(box.value) {
      box.value.addEventListener('mousedown', handleMousedown)
    }
  })
})

onUnmounted(() => {
  vChartRef?.value?.$el?.removeEventListener('wheel', handleWheel, { passive: false })
  box?.value?.removeEventListener('mousedown', handleMousedown)
})



//监听是否显示南海群岛
if (!isPreview()) {
  watch(
    () => props.chartConfig.option.mapRegion.showHainanIsLands,
    async newData => {
      try {
        await hainanLandsHandle(newData)
        vEchartsSetOption()
      } catch (error) {
        console.log(error)
      }
    },
    {
      deep: false
    }
  )
}
//监听地图展示区域发生变化
watch(
  () => `${props.chartConfig.option.mapRegion.adcode}`,
  newData => {
    try {
      checkOrMap(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)
//监听地图展示区域发生变化
watch(
  () => `${props.chartConfig.option.mapRegion.province}`,
  newData => {
    try {
      checkOrMap(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)


let timer:unknown
watch(() => [props.chartConfig.request.requestInterval, props.chartConfig.request.requestIntervalUnit].join('&&'), () => {
  if(!isPreview()) return
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

onMounted(() => {
  getData()
  if(!isPreview()) return
  const obj = selectTimeOptions.find(_ => _.value === props.chartConfig.request.requestIntervalUnit) || {unit: 0}
  const unit = obj.unit
  const number = unit * props.chartConfig.request.requestInterval!
  timer = setInterval(() => {
    getData()
  }, number)
})

onUnmounted(() => {
  if(timer) clearInterval(timer as number)
})

</script>

<style scope lang="scss">
.back-icon {
  z-index: 50;
  cursor: pointer;
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  gap: 2px;
}
</style>
