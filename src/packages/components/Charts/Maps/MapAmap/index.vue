<template>
  <div ref="vChartRef"></div>
</template>

<script setup lang="ts">
import { ref, PropType, toRefs, watch } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'
import { CreateComponentType } from '@/packages/index.d'
import { useChartDataFetch } from '@/hooks'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { MarkerEnum } from './config'
import { isArray } from '@/utils'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})
let {
  amapKey,
  amapStyleKey,
  amapLon,
  amapLat,
  amapZindex,
  mapMarkerType,
  lang,
  amapStyleKeyCustom,
  features,
  viewMode,
  pitch,
  skyColor,
  marker
} = toRefs(props.chartConfig.option.mapOptions)

let color = [
    "#95f204", // 荧色
    "#bfbf00", // 黄色01
    "#f59a23", // 淡黄色
    "#ec808d", // 小红色
    "#facd91",
    "#ffff80",
    "#caf982",
    "#80ffff",
    "#81d3f8",
    "#c280ff",
    "#0000ff",
    "#02a7f0",
    "#8400ff"
];

let mapIns: any = null
let markers: any = []
let polygons: any = []
let AMapIns: any = null
const vChartRef = ref<HTMLElement>()

const initMap = (newData: any) => {
  // 初始化
  AMapLoader.load({
    key: amapKey.value, //api服务key--另外需要在public中使用安全密钥！！！
    version: '1.4.8', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ['AMap.PlaceSearch', 'AMap.AutoComplete'] // 需要使用的的插件列表
  })
    .then(AMap => {
      AMapIns = AMap
      mapIns = new AMap.Map(vChartRef.value, {
        resizeEnable: true,
        zoom: amapZindex.value, // 地图显示的缩放级别
        center: [amapLon.value, amapLat.value],
        mapStyle: `amap://styles/${amapStyleKeyCustom.value !== '' ? amapStyleKeyCustom.value : amapStyleKey.value}`, //自定义地图的显示样式
        lang: lang.value,
        features: features.value,
        pitch: pitch.value, // 地图俯仰角度，有效范围 0 度- 83 度
        skyColor: skyColor.value,
        viewMode: viewMode.value, // 地图模式
        willReadFrequently: true
      })
      dataHandle(props.chartConfig.option.dataset)
    })
    .catch(e => {})
}

const dataHandle = (newData: any) => {
  if (!mapIns && !AMapIns) {
    initMap(props.chartConfig.option)
    return
  }

  if (isArray(newData.markers)) {
    // 先清除旧标记
    mapIns.remove(markers)
    markers = []
    // 记录新标记
    if (mapMarkerType.value === MarkerEnum.MARKER) {
      newData.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.Marker({
          position: [markerItem.position[0], markerItem.position[1]],
          offset: new AMapIns.Pixel(-13, -30)
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    } else if (mapMarkerType.value === MarkerEnum.CIRCLE_MARKER) {
      newData.markers.forEach((markerItem: any) => {
        const markerInstance = new AMapIns.CircleMarker({
          center: [markerItem.position[0], markerItem.position[1]],
          radius: markerItem.value,
          ...marker.value
        })
        markers.push(markerInstance)
        markerInstance.setMap(mapIns)
      })
    }
  }

  if (isArray(newData.polygons)) {
    // 先清除旧标记
    mapIns.remove(markers)
    markers = []

    // 先清除旧多边形图层
    mapIns.remove(polygons)
    polygons = []
    // 绘制新的多边形图层
    var index = 0
    newData.polygons.forEach((polygonItem: any) => {
        var path = [];
        for (let i = 0; i < polygonItem.position_list.length; i++) {
            var pos = polygonItem.position_list[i]
            path.push(new AMapIns.LngLat(pos[0], pos[1]))
        }

        let fillColor = color[index] || color[index - color.length] || color[parseInt(String(Math.random() * color.length))]
        const polygonInstance = new AMapIns.Polygon({
            bubble: true,
            fillColor,
            fillOpacity: 0.4,
            strokeWeight: 1,
            strokeColor: "#0074ff",
            path: path
        });

        polygons.push(polygonInstance)
        polygonInstance.setMap(mapIns)

        const markerInstance = new AMapIns.Marker({
                zooms: [11, 20],
                position: [polygonItem.position[0], polygonItem.position[1]],
                content: `<div class='mapMarker gridCenterMarker'>
                    <span class='village-name'>${polygonItem.name}</span>
                    <div class='highlight-body'>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    </div>
                </div>`,
                zIndex: 1000,
            });

        markers.push(markerInstance)
        markerInstance.setMap(mapIns)

        index++
      })
  }
}

const stopWatch = watch(
  () => props.chartConfig.option.mapOptions,
  option => {
    initMap(option)
  },
  {
    immediate: true,
    deep: true
  }
)

watch(
  () => props.chartConfig.option.dataset,
  newData => {
    try {
      dataHandle(newData)
    } catch (error) {
      console.log(error)
    }
  },
  {
    deep: false
  }
)

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  stopWatch()
  dataHandle(newData)
})
</script>

<style lang="scss">
$primaryColor: #0074ff;
// 格子中心label
.mapMarker.gridCenterMarker {
    pointer-events: none;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: youshe, pingfang;
    transform: translateX(-50%);
    padding: 0 20px;
    background: linear-gradient(90deg, transparent, #0080ff66 30%, #00daff, #0080ff66 70%, transparent) no-repeat,
        linear-gradient(
                90deg,
                transparent,
                rgba($primaryColor, 0.3) 10%,
                rgba($primaryColor, 0.8) 30%,
                $primaryColor,
                rgba($primaryColor, 0.8) 70%,
                rgba($primaryColor, 0.3) 90%,
                transparent
            )
            no-repeat;
    background-size: 100% 2px, 100% 100%;
    border-radius: 4px;
    .village-name {
        // background: linear-gradient(180deg, #e4e6eb, #007eff);
        // background-clip: text;
        // -webkit-background-clip: text;
        color: #fff;
        white-space: nowrap;
        &::before {
            content: "";
            position: absolute;
            top: calc(100% - 4px);
            left: 50%;
            transform: translateX(-50%) rotate(90deg);
            width: 14px;
            height: 20px;
            background-color: $primaryColor;
            background: linear-gradient(0deg, rgba($primaryColor, 0.8), $primaryColor, rgba($primaryColor, 0.8));
            clip-path: polygon(0 0, 100% 50%, 0 100%);
            z-index: 1;
        }
        &::after {
            content: "";
            position: absolute;
            top: calc(100% + 10px);
            left: 50%;
            transform: translate(-50%, -10px);
            border-radius: 50%;
            width: 12px;
            height: 6px;
            background: radial-gradient(black, #393636, transparent);
            animation: fadeDown1 300ms ease-in-out forwards;
            animation-delay: 300ms;
        }
    }
}
</style>
