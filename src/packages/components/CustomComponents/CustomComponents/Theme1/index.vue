<template>
  <div :style="getStyle(borderRadius)" class="Theme1">
    <div class="full-screen-btn" @click="toggleFullscreen">
      <i class="iconfont icon-quanping full-screen" :title="showMoreMenuBts ? '全屏' : '退出全屏'"></i>
      {{ showMoreMenuBts ? '全屏' : '退出全屏' }}
    </div>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1920 60" style="enable-background:new 0 0 1920 60;" xml:space="preserve">
          <g id="顶栏">
            <g>
              <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="960" y1="60" x2="960" y2="0">
                <stop offset="0" style="stop-color:#0D2952;stop-opacity:0.1" />
                <stop offset="1" style="stop-color:#0D2952;stop-opacity:0.8" />
              </linearGradient>
              <rect style="fill:url(#SVGID_1_);" width="1920" height="60" />
              <g id="系统抬头">
                <!-- <image v-if="systemConfig.system_logo_url" width="240" height="40" :xlink:href="systemConfig.system_logo_url" /> -->
              </g>
              <g>
                <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="960" y1="-729.2512" x2="960" y2="-789.2512" gradientTransform="matrix(1 0 0 -1 0 -729.2512)">
                  <stop offset="0" style="stop-color:#4196FF;stop-opacity:0" />
                  <stop offset="1" style="stop-color:#4196FF;stop-opacity:0.5" />
                </linearGradient>
                <path style="fill:url(#SVGID_2_);" d="M600,0l54.3,54.3c3.1,3.1,9.3,5.7,13.7,5.7h584c4.4,0,10.5-2.5,13.7-5.7L1320,0" />
              </g>
              <g>
                <text transform="matrix(1 0 0 1 697.4991 43)" style="fill:#FFFFFF; font-family:'PingFang-SC-Bold'; font-size:30px;"></text>
              </g>
              <g>
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="770" y1="58" x2="1150" y2="58">
                  <stop offset="0" style="stop-color:#4196FF;stop-opacity:0" />
                  <stop offset="0.5" style="stop-color:#4196FF" />
                  <stop offset="1" style="stop-color:#4196FF;stop-opacity:0" />
                </linearGradient>
                <path style="fill:url(#SVGID_3_);" d="M770,56c0,0,0.9,0.9,2,2s3.8,2,6,2h364c2.2,0,4.9-0.9,6-2s2-2,2-2" />
              </g>
              <g>
                <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="3591" y1="5" x2="4188.75" y2="5" gradientTransform="matrix(1 0 0 1 -3584 0)">
                  <stop offset="0" style="stop-color:#4196FF;stop-opacity:0" />
                  <stop offset="1" style="stop-color:#4196FF;stop-opacity:0.5" />
                </linearGradient>
                <polygon style="opacity:0.4;fill:url(#SVGID_4_);" points="604.8,8 7,8 13,2 598.8,2" />

                <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="-6698.249" y1="4" x2="-6592.999" y2="4" gradientTransform="matrix(-1 0 0 1 -6094.999 0)">
                  <stop offset="0" style="stop-color:#00FFFF" />
                  <stop offset="1" style="stop-color:#00FFFF;stop-opacity:0" />
                </linearGradient>
                <path style="fill:url(#SVGID_5_);" d="M563,0l8.3,8h2L565,0H563z M553,0l8.3,8h2L555,0H553z M568,0l8.3,8h2L570,0H568z M548,0 l8.3,8h2L550,0H548z M558,0l8.3,8h2L560,0H558z M588,0l8.3,8h2L590,0H588z M593,0l8.3,8h2L595,0H593z M578,0l8.3,8h2L580,0H578z M573,0l8.3,8h2L575,0H573z M583,0l8.3,8h2L585,0H583z M528,0l8.3,8h2L530,0H528z M508,0l8.3,8h2L510,0H508z M503,0l8.3,8h2 L505,0H503z M498,0l8.3,8h2L500,0H498z M543,0l8.3,8h2L545,0H543z M513,0l8.3,8h2L515,0H513z M533,0l8.3,8h2L535,0H533z M538,0 l8.3,8h2L540,0H538z M518,0l8.3,8h2L520,0H518z M523,0l8.3,8h2L525,0H523z" />
              </g>
              <g>
                <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="-4423.999" y1="5" x2="-3826.2493" y2="5" gradientTransform="matrix(-1 0 0 1 -2510.9993 0)">
                  <stop offset="0" style="stop-color:#4196FF;stop-opacity:0" />
                  <stop offset="1" style="stop-color:#4196FF;stop-opacity:0.5" />
                </linearGradient>
                <polygon style="opacity:0.4;fill:url(#SVGID_6_);" points="1315.3,8 1913,8 1907,2 1321.3,2 			" />
                <linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="1316.75" y1="4" x2="1422" y2="4">
                  <stop offset="0" style="stop-color:#00FFFF" />
                  <stop offset="1" style="stop-color:#00FFFF;stop-opacity:0" />
                </linearGradient>
                <path style="fill:url(#SVGID_7_);" d="M1355,0l-8.3,8h2l8.3-8H1355z M1365,0l-8.3,8h2l8.3-8H1365z M1350,0l-8.3,8h2l8.3-8H1350z M1370,0l-8.3,8h2l8.3-8H1370z M1360,0l-8.3,8h2l8.3-8H1360z M1330,0l-8.3,8h2l8.3-8H1330z M1325,0l-8.3,8h2l8.3-8H1325z M1340,0 l-8.3,8h2l8.3-8H1340z M1345,0l-8.3,8h2l8.3-8H1345z M1335,0l-8.3,8h2l8.3-8H1335z M1390,0l-8.3,8h2l8.3-8H1390z M1410,0l-8.3,8 h2l8.3-8H1410z M1415,0l-8.3,8h2l8.3-8H1415z M1420,0l-8.3,8h2l8.3-8H1420z M1375,0l-8.3,8h2l8.3-8H1375z M1405,0l-8.3,8h2l8.3-8 H1405z M1385,0l-8.3,8h2l8.3-8H1385z M1380,0l-8.3,8h2l8.3-8H1380z M1400,0l-8.3,8h2l8.3-8H1400z M1395,0l-8.3,8h2l8.3-8H1395z" />
              </g>
              <linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="760.5" y1="59" x2="1159.5" y2="59">
                <stop offset="0" style="stop-color:#FFFFFF;stop-opacity:0" />
                <stop offset="0.5" style="stop-color:#FFFFFF" />
                <stop offset="1" style="stop-color:#FFFFFF;stop-opacity:0" />
              </linearGradient>
              <rect x="760.5" y="58" style="fill:url(#SVGID_8_);" width="399" height="2" />
              <rect x="1760" style="opacity:0;fill:#091C38;" width="160" height="60" />
              <g>
                <text transform="matrix(1 0 0 1 1808.9991 45)" style="fill:#FFFFFF; font-family:'PingFang-SC-Bold'; font-size:14px;">{{ time }}</text>
              </g>
              <g>
                <text transform="matrix(1 0 0 1 1808.9991 27)" style="fill:#9CA4AF; font-family:'PingFang-SC-Regular'; font-size:14px;">{{ date }}</text>
              </g>
              <g>
                <g>
                  <g>
                    <path style="fill:#234B9B;" d="M1780,17c7.2,0,13,5.8,13,13s-5.8,13-13,13s-13-5.8-13-13S1772.8,17,1780,17 M1780,16 c-7.7,0-14,6.3-14,14s6.3,14,14,14s14-6.3,14-14S1787.7,16,1780,16L1780,16z" />
                  </g>
                  <polyline style="fill:none;stroke:#234B9B;stroke-miterlimit:10;" points="1780,21 1780,31 1785,36" />
                </g>
              </g>
              <g>
                <linearGradient id="SVGID_9_" gradientUnits="userSpaceOnUse" x1="-3831.3499" y1="-785.323" x2="-3110.6487" y2="-785.323" gradientTransform="matrix(-1 0 0 -1 -2510.9993 -755.2512)">
                  <stop offset="0" style="stop-color:#4196FF;stop-opacity:0.8" />
                  <stop offset="0.4462" style="stop-color:#4196FF;stop-opacity:0" />
                  <stop offset="1" style="stop-color:#4196FF;stop-opacity:0.8" />
                </linearGradient>
                <path style="fill:none;stroke:url(#SVGID_9_);stroke-miterlimit:10;" d="M1320,0.5l-54.3,53.4c-3.1,3.1-9.3,5.6-13.7,5.6H668 c-4.4,0-10.6-2.5-13.7-5.6L600,0.5" />
              </g>
            </g>
        </g>
        </svg>
    <n-image
      :object-fit="fit"
      preview-disabled
      :src="option.dataset"
      :fallback-src="requireErrorImg()"
      :width="w"
      :height="h"
      lazy
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, shallowReactive, watch, toRefs, onMounted, onUnmounted, ref } from 'vue'
import { requireErrorImg } from '@/utils'
import { useChartDataFetch } from '@/hooks'
import { CreateComponentType } from '@/packages/index.d'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import moment from 'moment'

const props = defineProps({
  chartConfig: {
    type: Object as PropType<CreateComponentType>,
    required: true
  }
})

props.chartConfig.attr.w = 1920
props.chartConfig.attr.h = 1080
Object.assign(props.chartConfig.attr, {w: 1920, h: 1080, x: 0, y: 0})
console.log(props.chartConfig)

const { w, h } = toRefs(props.chartConfig.attr)
const { dataset, fit, borderRadius } = toRefs(props.chartConfig.option)

let date = ref(moment().format('yyyy-MM-DD'))
const weeks = ['周一', '周二', '周三', '周四', '周五', '周六', '周天']
let time = ref(moment().format('HH:mm:ss ') + weeks[Number(moment().format('e'))])
let timer: unknown
onMounted(() => {
  timer = setInterval(() => {
    date.value = moment().format('yyyy-MM-DD')
    time.value = moment().format('HH:mm:ss ') + weeks[Number(moment().format('e'))]
  }, 1000)
})
onUnmounted(() => {
  clearInterval(timer as number)
})

const showMoreMenuBts = ref(true)
// 切换全屏函数
function toggleFullscreen() {
  showMoreMenuBts.value = !showMoreMenuBts.value
  if (document.fullscreenElement) {
    // 如果当前已经是全屏状态，则退出全屏
    document.exitFullscreen();
  } else {
    // 否则，进入全屏
    document.documentElement.requestFullscreen()
      .catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
  }
}

const option = shallowReactive({
  dataset: ''
})

const getStyle = (radius: number) => {
  return {
    borderRadius: `${radius}px`,
    overflow: 'hidden'
  }
}

// 编辑更新
watch(
  () => props.chartConfig.option.dataset,
  (newData: any) => {
    option.dataset = newData
  },
  {
    immediate: true
  }
)

// 预览更新
useChartDataFetch(props.chartConfig, useChartEditStore, (newData: any) => {
  option.dataset = newData
})
</script>

<style lang="scss" scoped>
.Theme1{
  position: relative;
  .full-screen-btn {
    border: #4396fd 1px solid;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px 10px;
    cursor: pointer;
    position: absolute;
    top: 16px;
    right: 9.6%;
    color: #4396fd;
    font-size: 14px;
    .full-screen {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
</style>
