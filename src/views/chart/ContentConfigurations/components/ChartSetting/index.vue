<template>
  <div class="go-chart-configurations-setting" v-if="targetData">
    <div v-if="isTricysBusinessComponent" class="tricys-binding-hint">
      <div class="hint-badge">TRICYS BUSINESS</div>
      <div class="hint-copy">
        当前组件已内置项目级业务数据绑定。优先在本页调整业务字段和展示方式，无需手动配置通用 HTTP 数据源。
      </div>
    </div>
    <!-- 名称 -->
    <name-setting :chartConfig="targetData.chartConfig"></name-setting>
    <!-- 尺寸 -->
    <size-setting :isGroup="targetData.isGroup" :chartAttr="targetData.attr"></size-setting>
    <!-- 位置 -->
    <position-setting :chartAttr="targetData.attr" :canvasConfig="chartEditStore.getEditCanvasConfig" />
    <!-- 滤镜 -->
    <styles-setting :isGroup="targetData.isGroup" :chartStyles="targetData.styles"></styles-setting>
    <!-- 自定义配置项 -->
    <component :is="targetData.chartConfig.conKey" :optionData="targetData.option"></component>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { NameSetting, PositionSetting, SizeSetting, StylesSetting } from '@/components/Pages/ChartItemSetting'
import { useTargetData } from '../hooks/useTargetData.hook'
const { targetData, chartEditStore } = useTargetData()

const isTricysBusinessComponent = computed(() => {
  return targetData.value?.chartConfig?.package === PackagesCategoryEnum.TRICYS
})
</script>

<style lang="scss" scoped>
@include go('chart-configurations-setting') {
  .tricys-binding-hint {
    margin-bottom: 12px;
    padding: 12px;
    border: 1px solid #2d3640;
    border-radius: 14px;
    background: linear-gradient(180deg, rgba(13, 17, 23, 0.96), rgba(9, 13, 18, 0.94));

    .hint-badge {
      display: inline-flex;
      margin-bottom: 8px;
      padding: 4px 8px;
      border: 1px solid rgba(0, 210, 255, 0.24);
      border-radius: 999px;
      color: #7dd3fc;
      font-size: 11px;
      letter-spacing: 1.2px;
    }

    .hint-copy {
      color: #aeb8c4;
      font-size: 12px;
      line-height: 1.6;
    }
  }
}
</style>
