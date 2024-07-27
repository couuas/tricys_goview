<template>
  <div class="go-sketch-rule">
    <sketch-rule v-if="sketchRuleReDraw" v-model:scale="innerScale" :thick="thick" :width="rectWidth"
      :height="rectHeight" :canvasWidth="width" :canvasHeight="height" :lines="lines" :palette="paletteStyle">
      <slot></slot>
    </sketch-rule>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, toRefs, watch, computed } from 'vue';
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d';
import { useDesignStore } from '@/store/modules/designStore/designStore';
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore';
import { useChartLayoutStore } from '@/store/modules/chartLayoutStore/chartLayoutStore';
const chartEditStore = useChartEditStore();
const { getLayers, getCharts, getDetails } = toRefs(useChartLayoutStore());
const designStore = useDesignStore();

const thick = 20;
const rectWidth = computed(() => {
  return window.innerWidth - 70 - (getCharts.value ? 265 : 0) - (getLayers.value ? 200 : 0) - (getDetails.value ? 0:350);
});
const rectHeight = ref(window.innerHeight - 60);

const sketchRuleReDraw = ref(true);

const isPressSpace = ref(false);
const cursorStyle = ref('auto');
const { width, height } = toRefs(chartEditStore.getEditCanvasConfig);

const lines = reactive({ h: [], v: [] });

const innerScale = computed({
  get() {
    return chartEditStore.gettCanvasScale
  },
  set(value) {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SCALE, value);
  }
});

// 处理主题变化
watch(
  () => chartEditStore.gettCanvasScale,
  () => {
   console.log('innerScale', chartEditStore.gettCanvasScale);
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.SCALE, chartEditStore.gettCanvasScale);
  }
);

// 主题
const paletteStyle = computed(() => {
  const isDarkTheme = designStore.getDarkTheme;
  return isDarkTheme
    ? {
      bgColor: 'transparent',
      longfgColor: '#4d4d4d',
      shortfgColor: '#4d4d4d',
      fontColor: '#4d4d4d',
      shadowColor: '#18181c',
      borderColor: '#18181c',
      cornerActiveColor: '#18181c',
      lineColor: '#51d6a9',
      lineType: 'dashed'
    }
    : {
      bgColor: 'transparent',
    };
});


// 重绘标尺
const reDraw = () => {
  sketchRuleReDraw.value = false;
  setTimeout(() => {
    sketchRuleReDraw.value = true;
  }, 10);
};

// 处理主题变化
watch(
  () => designStore.getDarkTheme,
  () => {
    reDraw();
  }
);


// 处理鼠标样式
watch(
  () => isPressSpace.value,
  newValue => {
    cursorStyle.value = newValue ? 'grab' : 'auto';
  }
);

window.onKeySpacePressHold = (isHold: boolean) => {
  isPressSpace.value = isHold;
};
</script>

<style lang="scss" scoped>
@include go('sketch-rule') {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .edit-screens {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
    user-select: none;
    padding-bottom: 0px;

    /* firefox */
    scrollbar-color: rgba(144, 146, 152, 0.3) transparent;
    scrollbar-width: thin;

    /* chrome */
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }

    &::-webkit-scrollbar {
      width: 7px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: rgba(144, 146, 152, 0.3);
    }

    // 修复右下角白点用的
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }

  .fix-edit-screens-block {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: $--color-dark-bg-1;
  }
}
</style>
